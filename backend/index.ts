import { Hono } from 'hono';
import { Pinecone } from '@pinecone-database/pinecone';
import axios from 'axios';
import { z } from 'zod';
import { cors } from 'hono/cors';
import 'dotenv/config';
import { serve } from '@hono/node-server';

// Initialize Hono app with CORS
const app = new Hono();
app.use('/*', cors({ origin: '*' })); // Adjust origin for production

// Initialize Pinecone client
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || '' });
if (!pc) {
    console.error('Pinecone API key is missing');
    process.exit(1);
}
const index = pc.index('dense-index').namespace('spheron-icl');

// Define response schemas for validation
const chatResponseSchema = z.object({
    response: z.string().min(1),
    yaml: z.string().optional(), // Optional for non-YAML responses
});

// Utility to wait for index readiness
const waitForIndex = async (indexName: string) => {
    let ready = false;
    while (!ready) {
        try {
            const status = await pc.describeIndex(indexName);
            ready = status.status?.ready;
            if (!ready) await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (err) {
            console.error(`Index status check failed: ${err.message}`);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    console.log(`Index ${indexName} is ready`);
};

// Function to detect YAML creation intent
const hasYamlIntent = (message: string) => {
    const intentKeywords = ['create yaml', 'deploy', 'configure', 'setup', 'generate file'];
    return intentKeywords.some(keyword => message.toLowerCase().includes(keyword));
};

// Single chat endpoint for Q&A and YAML generation
app.post('/api/chat', async (c) => {
    const { message } = await c.req.json();

    if (!message || typeof message !== 'string') {
        return c.json({ error: 'Message is required and must be a string' }, 400);
    }

    try {
        // Ensure index is ready
        await waitForIndex('dense-index');

        let context = '';

        try {
            // Retrieve context from Pinecone
            console.log("Generating embedding for query:", message);
            const queryEmbedding = await pc.inference.embed(
                'llama-text-embed-v2',
                [message],
                { input_type: 'query' }
            );

            // Validate embedding structure before proceeding - fix to handle non-array response
            if (!queryEmbedding || (!Array.isArray(queryEmbedding) && !queryEmbedding.data)) {
                console.warn('Missing embedding data:', queryEmbedding);
                throw new Error('Failed to generate valid embedding for query');
            }

            // Extract values correctly regardless of response format and handle type safety
            const embeddingValues = Array.isArray(queryEmbedding)
                ? queryEmbedding[0] && 'values' in queryEmbedding[0] ? (queryEmbedding[0] as any).values : undefined
                : queryEmbedding.data?.[0] && 'values' in queryEmbedding.data[0] ? (queryEmbedding.data[0] as any).values : undefined;

            if (!embeddingValues) {
                console.warn('No valid embedding values found:', queryEmbedding);
                throw new Error('Missing embedding values in response');
            }

            console.log("Embedding generated successfully, querying vector database");
            const results = await index.query({
                vector: embeddingValues,
                topK: 5,
                includeMetadata: true,
            });

            context = results.matches
                .map(match => `${match.metadata?.source || 'Unknown'}: ${match.metadata?.chunk_text || 'No text available'}`)
                .join('\n');
            console.log(`Retrieved ${results.matches.length} context chunks for message: ${message}`);
        } catch (err) {
            console.error('Vector search failed:', err);
            // Continue with empty context if vector search fails
            console.log('Proceeding with empty context due to vector search failure');
            context = '';
        }

        // Prepare LLM prompt based on intent
        let llmPrompt = `
      You are a helpful assistant for Spheron ICL (Infrastructure Configuration Language). 
      Spheron ICL is a configuration language designed for deploying applications to the Spheron platform.
      It uses YAML format to define deployment configurations, compute resources, network settings, and other infrastructure details.
      
      IMPORTANT: Always format your response as a clean JSON object without any additional text, thinking, or markdown formatting.
    `;

        if (hasYamlIntent(message)) {
            llmPrompt += `
        The user intends to create a YAML file. Generate a valid \`deploy.yaml\` file based on the prompt: "${message}".
        ${context ? `Use the following context to inform your response, adhering strictly to ICL syntax and rules:
        ${context}` : 'Use your knowledge of ICL syntax and rules.'}
        
        Avoid Using:
        NODE_ENV
        nginx
        
        Include appropriate fields such as:
        - apiVersion
        - name
        - compute requirements (cpu, memory, storage)
        - environment variables
        - build commands
        - deployment settings
        - GPU configurations and attributes
        - region constraints
        - network settings
        - storage configurations
        
        Available GPU options include:
        - NVIDIA models: a100, h100, l4, t4, rtx3090, rtx4090
        - RAM specifications: 24Gi, 40Gi, 80Gi
        - Interface types: pcie, sxm
        
        Available regions:
        - us-east, us-west, us-central
        - eu-west, eu-central
        - ap-south, ap-northeast
        
        Available tiers:
        - community/Secure
        - secured-1, secured-2, secured-3
        - community-1, community-2, community-3, community-4
        
        Popular pre-configured images:
        - Jupyter with PyTorch 2.4.1, 2.5.1
        - Ollama WebUI
        - Ollama
        - Stable Diffusion Web UI
        - VS Code with PyTorch 2.5.1
        - Wan 2.1 WebUI
        
        YOUR RESPONSE MUST BE A VALID JSON OBJECT with EXACTLY these fields: 
        {
          "response": "A helpful explanation of the YAML file",
          "yaml": """
version: "1.0"
services:
  gpu-test:
    image: ghcr.io/open-webui/open-webui:ollama
    expose:
      - port: 8080
        as: 8080
        to:
          - global: true
    env:
      - TEST=test
      - MODEL_PATH=/models
      - DEBUG=false
    pull_policy: Always
    command: ["python", "start.py"]
    args: ["--port", "8080"]
profiles:
  name: hello-world
  mode: provider
  duration: 1h
  tier:
    - community/Secure
  compute:
    gpu-test:
      resources:
        cpu:
          units: 1
        memory:
          size: 20Gi
        storage:
          - size: 100Gi
          - name: models
            size: 50Gi
            attributes:
              persistent: true
        gpu:
          units: 1
          attributes:
            vendor:
              nvidia:
                - model: rtx4090
                  ram: 24Gi
                  interface: pcie
  placement:
    westcoast:
      attributes:
        region: us-west
      pricing:
        gpu-test:
          token: CST
          amount: 5
deployment:
  gpu-test:
    westcoast:
      profile: gpu-test
      count: 1
  """
        }
        
        Infrastructure Composition Language (ICL) is Spheron Network's declarative system for resource allocation.
        Users specify deployment requirements through deploy.yaml files with:
        
        - Network Configuration: Defines connectivity between workloads
        - Version: Specifies ICL version (1.0 currently supported)
        - Services: Defines workloads with Docker images, commands, environment variables
        - Profiles: Sets compute resources (CPU, memory, storage) and placement preferences
        - Deployment: Specifies deployment strategy and resource configuration
        - GPU Support: Optional GPU resources with model specifications
        
        For compute resources:
        - CPU units can be fractional (1, 0.5) or milli-units (100m)
        - Memory/storage uses byte units with suffixes (k, Ki, M, Mi, G, Gi)
        - Deployment modes: provider (data center-grade) or fizz (consumer-grade)
        
        DO NOT include any thinking process, markdown formatting, or code blocks in your response.
        ONLY RETURN THE JSON OBJECT with the response and yaml fields.
      `;
        } else {
            llmPrompt += `
        Answer the user's question: "${message}".
        ${context ? `Use the following context if relevant:
        ${context}` : 'Provide a general response based on ICL knowledge.'}
        
        YOUR RESPONSE MUST BE A VALID JSON OBJECT with this structure: 
        { "response": "Your clear and concise response here" }
        
        DO NOT include any thinking process, markdown formatting, or code blocks.
        ONLY RETURN THE JSON OBJECT.
      `;
        }

        console.log("Sending request to LLM API");
        const llmResponse = await axios.post(
            process.env.SPHERON_LLM_ENDPOINT || 'https://api.spheron.ai/v1/chat/completions',
            {
                model: process.env.SPHERON_LLM_API_MODEL || "llama3.3",
                messages: [
                    {
                        role: "user",
                        content: llmPrompt
                    }
                ],
                max_tokens: hasYamlIntent(message)
                    ? parseInt(process.env.SPHERON_LLM_API_MAX_TOKENS || '512')
                    : 200,
                temperature: parseFloat(process.env.SPHERON_LLM_API_TEMPERATURE || '0.8'),
                top_p: parseFloat(process.env.SPHERON_LLM_API_TOP_P || '0.5'),
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.SPHERON_LLM_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        ).catch(err => {
            console.error('LLM API error details:', err.response?.data || err.message);
            throw new Error(`LLM API error: ${err.response?.data?.message || err.message}`);
        });

        // Update how we extract response data to match the Spheron API structure
        const rawResponse = llmResponse.data.choices?.[0]?.message?.content || '';
        if (!rawResponse) throw new Error('Invalid LLM response format');

        // Enhanced logging of raw response with special formatting for clarity
        console.log("\n\n============================================================");
        console.log("                   FULL RAW LLM RESPONSE                    ");
        console.log("============================================================\n");
        console.log(rawResponse);
        console.log("\n============================================================\n\n");

        // For longer responses, add detailed analysis of potential YAML content
        if (rawResponse.length > 500) {
            const structure = {
                length: rawResponse.length,
                contains_json: rawResponse.includes('{') && rawResponse.includes('}'),
                contains_yaml:
                    rawResponse.includes('apiVersion:') ||
                    rawResponse.includes('```yaml') ||
                    rawResponse.includes('```yml') ||
                    // Spheron ICL specific patterns
                    rawResponse.includes('services:') ||
                    rawResponse.includes('profiles:') ||
                    rawResponse.includes('compute:') ||
                    rawResponse.includes('placement:'),
                contains_think_tags: rawResponse.includes('<think>'),
                contains_triple_quotes: rawResponse.includes('"""'),
                spheron_icl_keywords: [
                    'services', 'profiles', 'deployment', 'compute', 'placement',
                    'resources', 'apiVersion', 'build', 'environment', 'replicas', 'strategy'
                ].filter(keyword => rawResponse.includes(keyword)),
                indentation_pattern: rawResponse.match(/(\s+)[\w-]+:/g) ? true : false,
                first_100_chars: rawResponse.substring(0, 100),
                last_100_chars: rawResponse.substring(rawResponse.length - 100)
            };
            console.log("Response structure analysis:", structure);
        }

        let parsedResponse;
        try {
            // Enhanced cleaning of response to ensure valid JSON
            let cleanJsonString = rawResponse
                .trim()
                // Remove thinking process wrapped in <think> tags
                .replace(/<think>[\s\S]*<\/think>/g, '')
                // Remove markdown JSON indicators
                .replace(/```json/g, '')
                .replace(/```/g, '');

            // More carefully extract JSON object with improved regex
            const jsonMatch = cleanJsonString.match(/(\{[\s\S]*\})/);
            if (jsonMatch && jsonMatch[1]) {
                cleanJsonString = jsonMatch[1].trim();
            }

            console.log("Cleaned JSON string:", cleanJsonString.substring(0, 100) + "...");

            // Handle triple-quoted YAML specially before parsing JSON
            let yamlContent = null;
            const tripleQuoteMatch = cleanJsonString.match(/"yaml"\s*:\s*"""([\s\S]*?)"""/);
            if (tripleQuoteMatch && tripleQuoteMatch[1]) {
                // Extract the YAML content
                yamlContent = tripleQuoteMatch[1].trim();
                // Replace the triple-quoted format with a placeholder for JSON parsing
                cleanJsonString = cleanJsonString.replace(/"yaml"\s*:\s*"""[\s\S]*?"""/, '"yaml": "YAML_PLACEHOLDER"');
            }

            // Look for ICL-specific patterns if no triple quotes were found
            if (!yamlContent && hasYamlIntent(message)) {
                // Look for common ICL structures with proper indentation
                const iclPatterns = [
                    /version:\s*["']?1\.0["']?[\s\S]*?services:[\s\S]*?profiles:[\s\S]*?deployment:/s,
                    /profiles:[\s\S]*?compute:[\s\S]*?placement:[\s\S]*?deployment:/s,
                    /apiVersion:\s*spheron.io\/v1beta1[\s\S]*?kind:\s*Deployment[\s\S]*?metadata:/s
                ];

                for (const pattern of iclPatterns) {
                    const match = cleanJsonString.match(pattern);
                    if (match) {
                        yamlContent = match[0].trim();
                        // If we found ICL content directly, wrap it for JSON parsing
                        cleanJsonString = `{"response": "Here is your ICL configuration", "yaml": "YAML_PLACEHOLDER"}`;
                        break;
                    }
                }
            }

            try {
                parsedResponse = JSON.parse(cleanJsonString);
                // If we extracted YAML content earlier, restore it
                if (yamlContent && parsedResponse.yaml === "YAML_PLACEHOLDER") {
                    parsedResponse.yaml = yamlContent;
                }
            } catch (jsonError) {
                console.error('Initial JSON parsing failed, attempting fallback parsing');

                // Fallback handling
                let response = "";
                let yaml = "";

                // Try to extract response field
                const responseMatch = cleanJsonString.match(/"response"\s*:\s*"([^"]+)"/);
                if (responseMatch) {
                    response = responseMatch[1];
                }

                // First check for triple-quoted YAML
                if (tripleQuoteMatch && tripleQuoteMatch[1]) {
                    yaml = tripleQuoteMatch[1];
                } else {
                    // Try other extraction methods for YAML
                    const yamlBlockMatch = rawResponse.match(/```(?:ya?ml)?\s*([\s\S]*?)```/);
                    if (yamlBlockMatch && yamlBlockMatch[1]) {
                        yaml = yamlBlockMatch[1].trim();
                    } else {
                        // Look for YAML structure directly
                        const yamlMatch = rawResponse.match(/"yaml"\s*:\s*"([\s\S]*?)(?:"|$)/);
                        if (yamlMatch && yamlMatch[1]) {
                            yaml = yamlMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n').trim();
                        } else if (hasYamlIntent(message)) {
                            // Look for common YAML patterns
                            const potentialYaml = rawResponse.match(/apiVersion:[\s\S]*?name:[\s\S]*?(?:compute|resources|environment|build|deployment)/s);
                            if (potentialYaml) {
                                yaml = potentialYaml[0].trim();
                            }
                        }
                    }
                }

                parsedResponse = { response: response || "Here is your YAML configuration" };
                if (yaml) {
                    parsedResponse.yaml = yaml;
                }
            }
        } catch (e) {
            console.error('JSON parsing error:', e);

            // Enhanced emergency extraction for YAML content if JSON parsing fails
            let response = "Here's your YAML file";
            let yaml = "";

            // Strategy 1: Look for triple-quoted YAML
            const tripleQuoteMatch = rawResponse.match(/"yaml"\s*:\s*"""([\s\S]*?)"""/);
            if (tripleQuoteMatch && tripleQuoteMatch[1]) {
                yaml = tripleQuoteMatch[1].trim();
            }
            // Try other extraction methods
            else {
                const yamlBlockMatch = rawResponse.match(/```(?:ya?ml)?\s*([\s\S]*?)```/);
                if (yamlBlockMatch && yamlBlockMatch[1]) {
                    yaml = yamlBlockMatch[1].trim();
                } else {
                    // Look for YAML structure directly
                    const yamlMatch = rawResponse.match(/apiVersion:[\s\S]*?/);
                    if (yamlMatch) {
                        yaml = yamlMatch[0].trim();
                    }
                }
            }

            if (hasYamlIntent(message)) {
                parsedResponse = {
                    response: response,
                    yaml: yaml || `apiVersion: spheron.io/v1beta1\nkind: Deployment\nmetadata:\n  name: static-website\nspec:\n  compute:\n    memory: "1Gi"\n    scaling:\n      enabled: true`
                };
            } else {
                parsedResponse = { response: rawResponse.replace(/<think>[\s\S]*<\/think>/g, '').trim() };
            }
        }

        // Validate response with schema validation that won't strip out YAML
        try {
            const validatedResponse = chatResponseSchema.parse(parsedResponse);
            console.log('Successfully processed message:', message);
            return c.json(validatedResponse);
        } catch (schemaError) {
            console.error('Schema validation error:', schemaError);
            // In case schema validation fails but we still have valid data
            if (parsedResponse.response) {
                return c.json(parsedResponse);
            }
            return c.json({ error: `Failed to process chat: Invalid response format` }, 500);
        }
    } catch (error) {
        console.error('Chat error:', error);
        return c.json({ error: `Failed to process chat: ${error.message}` }, 500);
    }
});

// Start server
serve({
    fetch: app.fetch,
    port: parseInt(process.env.PORT || '3000'),
});
console.log(`Server running on port ${process.env.PORT || 3000}`);