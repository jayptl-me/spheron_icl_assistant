/**
 * Utility to safely parse JSON responses from the backend
 */

/**
 * Parses the API response and extracts the actual response content
 * @param rawResponse - The raw response string from the API
 * @returns The cleaned and parsed response content
 */
export function parseApiResponse(rawResponse: string): string {
  try {
    // Try to parse as JSON first
    const parsedJson = JSON.parse(rawResponse);
    
    // If it has a response property, return that
    if (parsedJson && typeof parsedJson.response === 'string') {
      return parsedJson.response;
    }
    
    // Otherwise, return the stringified JSON (but not for objects/arrays)
    return typeof parsedJson !== 'object' ? String(parsedJson) : rawResponse;
  } catch (e) {
    // If JSON parsing fails, try to extract content between JSON tags
    const responseMatch = rawResponse.match(/"response"\s*:\s*"([^"]+)"/);
    if (responseMatch && responseMatch[1]) {
      return responseMatch[1];
    }
    
    // If all parsing attempts fail, return the original response
    return rawResponse;
  }
}

/**
 * Checks if a response is a complete JSON or needs additional processing
 * @param response - The response to check
 * @returns Whether the response is incomplete JSON
 */
export function isIncompleteJsonResponse(response: string): boolean {
  return (
    response.includes('"response":') && 
    (response.trim().endsWith('...') || !response.includes('}'))
  );
}
