# Spheron ICL Chat Assistant - Full Project README

## Overview

The Spheron ICL Chat Assistant is a hackathon project that combines a React frontend with a TypeScript Node.js backend to deliver an AI-powered chat interface for Spheron's Infrastructure Configuration Language (ICL). It leverages Pinecone vector database for efficient document storage via vector embeddings, implements Retrieval-Augmented Generation (RAG) with a Spheron-hosted Large Language Model, and is deployed on Spheron's decentralized cloud utilizing NVIDIA RTX 4090 and RTX6000-ADA GPUs via free credits.

## Features

- **Interactive Chat Interface**: Clean and intuitive chat UI with message history and real-time status indicators
- **Real-time YAML Generation**: Automatic creation and formatted display of ICL YAML configurations based on natural language requests
- **Pinecone Vector Storage**: Efficient document embedding storage and similarity search capabilities
- **RAG Implementation**: Retrieval-Augmented Generation that enhances LLM responses with relevant ICL documentation
- **Decentralized Cloud Hosting**: Deployment on Spheron's infrastructure with high-performance GPU acceleration
- **Responsive Design**: Fully responsive layout that works seamlessly across desktop and mobile devices
- **API Integration**: Robust backend API with comprehensive error handling and request validation
- **Developer-friendly Architecture**: Clean separation of concerns between frontend components and backend services

## Technologies Used

### Frontend
- **React 18+** with TypeScript for type-safe component development
- **Vite** for fast development and optimized builds
- **Axios** for API communication
- **Lucide React** for consistent iconography
- **Radix UI** and **class-variance-authority** for accessible component primitives
- **Tailwind CSS** for responsive styling

### Backend
- **TypeScript** with Node.js runtime environment
- **Hono.js** for lightweight server framework
- **Pinecone** for vector database storage and querying
- **llama-text-embed-v2** for generating text embeddings
- **Zod** for runtime type validation
- **Spheron API** for LLM access and cloud compute
- **NVIDIA RTX 4090/RTX6000-ADA GPUs** for accelerated inference

## Prerequisites

- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher) or **yarn** (v1.22.x or higher)
- **Pinecone API key** with an initialized index
- **Spheron account** with API access and free GPU credits
- **Basic knowledge** of Infrastructure Configuration Language (ICL)
- **Git** for version control

## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/jayptl-me/spheron_icl_assistant.git
   cd spheron_icl_assistant/backend
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
   npm run setup
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the backend API URL:
   ```
   VITE_API_URL=http://localhost:3000
   ```

4. Ensure the assets folder exists in the public directory:
   ```bash
   mkdir -p public/assets
   ```

5. Place the logo file in the assets folder:
   ```bash
   cp path/to/logo.jpg public/assets/
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

2. From the home page, you can:
   - Read about the features of the Spheron ICL Chat Assistant
   - Click "Start Building" or "Try it now" to navigate to the chat interface

3. In the chat interface:
   - Type questions about Spheron's Infrastructure Configuration Language (ICL)
   - Request YAML configuration generation (e.g., "Create a YAML for deploying a static website")
   - View generated YAML configurations in a formatted display
   - Press Enter or click the send button to submit your query

4. Example queries:
   - "What is Spheron ICL?"
   - "Generate a YAML configuration for a Node.js application"
   - "How do I configure auto-scaling with ICL?"
   - "Create a configuration for deploying a static website"

5. If you've deployed the application to Spheron, you can access it at your deployment URL.

## Project Architecture

The Spheron ICL Chat Assistant implements a sophisticated architecture designed for performance and scalability:

1. **Frontend**:
   - React application with TypeScript for type safety
   - `ChatInterface` component manages the conversation state and UI
   - API client for communication with backend services
   - Responsive design with Tailwind CSS

2. **Backend**:
   - **API Layer**: The `/api/chat` endpoint receives user queries via Hono.js
   - **Embedding Generation**: User queries are converted to vector embeddings using `llama-text-embed-v2`
   - **Vector Search**: Pinecone searches for similar documents in the ICL knowledge base
   - **Context Retrieval**: Relevant ICL documentation chunks are extracted from search results
   - **LLM Augmentation**: User query and retrieved context are sent to the Spheron-hosted LLM
   - **Response Processing**: JSON responses are parsed, validated with Zod, and returned to the client
   - **YAML Generation**: For deployment requests, structured ICL YAML is generated

3. **Deployment**:
   - Hosted on Spheron's decentralized cloud
   - Utilizing NVIDIA RTX 4090 or RTX6000-ADA GPUs for accelerated inference
   - Configured for optimal performance with the appropriate memory allocation

## Development

### Frontend Development

1. Modify React components in `frontend/src/components/`
2. Update pages in `frontend/src/pages/`
3. Adjust API client in `frontend/src/lib/api.ts`
4. Test changes locally with `npm run dev`
5. Build for production with `npm run build`

### Backend Development

1. Update API endpoints in `backend/index.ts`
2. Modify vector search functionality in the appropriate modules
3. Enhance LLM prompt engineering in the chat handler
4. Test changes locally with `npm run dev`
5. Build for production with `npm run build`

### Best Practices

- Use feature branches for new functionality
- Write descriptive commit messages
- Test thoroughly before pushing changes
- Follow the existing code style and patterns
- Document API changes or new features

## Deployment

1. Prepare both projects for production:

   **Backend:**
   ```bash
   cd backend
   npm run build
   ```

   **Frontend:**
   ```bash
   cd frontend
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

5. Verify the application is accessible at your deployment URL

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
- Built during the Spheron Hackathon 2025, showcasing the capabilities of ICL and decentralized infrastructure
- Leverages Spheron's Infrastructure Configuration Language (ICL) for simplified deployment configuration
- Thanks to the Pinecone team for vector database capabilities that power the RAG implementation
- Gratitude to the open-source community for the tools and libraries that made this project possible

## Contact

- For issues and feature requests, please open an issue in the repository: [https://github.com/jayptl-me/spheron_icl_assistant/issues](https://github.com/jayptl-me/spheron_icl_assistant/issues)
- For other inquiries: [contact@jayptl.me](mailto:contact@jayptl.me)
- Twitter: [@jayptl_me](https://twitter.com/jayptl_me)
