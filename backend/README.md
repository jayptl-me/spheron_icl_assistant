# Backend README - Spheron ICL Chat Assistant

## Overview

The Spheron ICL Chat Assistant backend is a TypeScript Node.js application that powers an AI-driven interface for Infrastructure Configuration Language (ICL) queries and YAML generation. It leverages Pinecone vector database for document storage via vector embeddings, implements Retrieval-Augmented Generation (RAG) with a Spheron-hosted Large Language Model, and is hosted on Spheron's decentralized cloud utilizing NVIDIA RTX 4090 and RTX6000-ADA GPUs via Spheron free credits.

## Features

- Robust `/api/chat` endpoint for handling natural language queries and generating responses
- Pinecone integration for efficient vector storage and similarity search
- RAG implementation that retrieves relevant ICL documentation to enhance LLM responses
- YAML generation capabilities for Spheron ICL deployment configurations
- Decentralized cloud hosting on high-performance GPUs for fast inference

## Technologies Used

- **TypeScript** with Node.js runtime environment
- **Hono.js** for server framework
- **Pinecone** for vector database storage and querying
- **llama-text-embed-v2** for generating text embeddings
- **Zod** for runtime type validation
- **Spheron API** for LLM access and cloud compute
- **NVIDIA RTX 4090/RTX6000-ADA GPUs** for accelerated inference

## Prerequisites

- Node.js (v18.x or higher)
- npm (v9.x or higher) or yarn (v1.22.x or higher)
- Pinecone API key with an initialized index
- Spheron account with API access and free GPU credits
- Basic knowledge of ICL (Infrastructure Configuration Language)

## Installation

1. Clone the repository and navigate to the backend directory:
   ```bash
   git clone <repository-url>
   cd ./backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the required environment variables:
   ```
   PINECONE_API_KEY=your_pinecone_api_key
   SPHERON_LLM_ENDPOINT=https://api.spheron.ai/v1/chat/completions
   SPHERON_LLM_API_KEY=your_spheron_api_key
   SPHERON_LLM_API_MODEL=qwen2.5-coder
   SPHERON_LLM_API_TEMPERATURE=0.8
   SPHERON_LLM_API_MAX_TOKENS=2048
   SPHERON_LLM_API_TOP_P=0.5
   PORT=3000
   ```

4. Initialize the Pinecone index (if not already created):
   ```bash
   # Run the setup script or manually create the index
   npm run setup
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Chat Endpoint

Send a POST request to the `/api/chat` endpoint:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "create yaml for a static website deployment on Spheron"}'
```

### Expected Responses

For general ICL questions:
```json
{
  "response": "Detailed explanation about ICL static website deployments..."
}
```

For YAML generation requests:
```json
{
  "response": "Here's a YAML configuration for deploying a static website on Spheron",
  "yaml": "version: \"1.0\"\nservices:\n  static-site:\n    image: nginx:alpine\n    expose:\n      - port: 80\n        as: 80\n        to:\n          - global: true\n..."
}
```

For errors:
```json
{
  "error": "Failed to process chat: Error message details"
}
```

## Project Architecture

The backend implements a sophisticated retrieval-augmented generation system:

1. **API Layer**: The `/api/chat` endpoint receives user queries via Hono.js
2. **Embedding Generation**: User queries are converted to vector embeddings using `llama-text-embed-v2`
3. **Vector Search**: Pinecone searches for similar documents in the ICL knowledge base
4. **Context Retrieval**: Relevant ICL documentation chunks are extracted from search results
5. **LLM Augmentation**: The user query and retrieved context are sent to the Spheron-hosted LLM
6. **Response Processing**: JSON responses are parsed, validated with Zod, and returned to the client
7. **YAML Generation**: For deployment requests, structured ICL YAML is generated

The system is hosted on Spheron's decentralized cloud, utilizing NVIDIA GPUs for accelerated inference.

## Development

### Available Scripts

- `npm run dev` - Start the development server with hot reloading
- `npm start` - Start the production server
- `npm run build` - Build the TypeScript project
- `npm run lint` - Run linting checks

### Adding New Features

To extend the backend with new capabilities:

1. Update `index.ts` with new endpoints or functionality
2. Add any new dependencies via npm/yarn
3. Update environment variables in `.env` if needed
4. Test thoroughly before deploying

## Deployment

1. Prepare for production:
   ```bash
   npm run build
   ```

2. Deploy to Spheron's decentralized cloud:
   ```bash
   # Use Spheron CLI or dashboard to deploy
   spheron deploy
   ```

3. Configure GPU resources in the Spheron dashboard:
   - Select NVIDIA RTX 4090 or RTX6000-ADA GPU
   - Allocate appropriate memory (24GB+ recommended)
   - Configure scaling options based on expected load

4. Set up environment variables in the Spheron deployment interface

5. Verify the API is accessible at your deployment URL

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Special thanks to Spheron for providing free credits enabling decentralized cloud hosting with NVIDIA RTX 4090 and RTX6000-ADA GPUs
- Built during the Spheron Hackathon 2023, showcasing the capabilities of ICL and decentralized infrastructure
- Leverages Spheron's Infrastructure Configuration Language (ICL) for simplified deployment configuration
