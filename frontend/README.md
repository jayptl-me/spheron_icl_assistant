# Frontend README - Spheron ICL Chat Assistant

## Overview

The Spheron ICL Chat Assistant frontend is a React and TypeScript-based application that provides a user-friendly interface for interacting with Spheron's Infrastructure Configuration Language. This component integrates with a backend AI service and offers a seamless chat experience for users looking to generate YAML configurations or learn about Spheron's decentralized cloud infrastructure as part of a hackathon project.

## Features

- **Interactive Chat Interface**: Clean and intuitive chat UI with message history and typing indicators
- **YAML Display**: Automatic formatting and display of generated YAML configurations
- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices
- **Real-time API Integration**: Seamless connection to backend AI services using Qwen2.5-coder 7B
- **Navigation System**: Easy navigation between home page and chat interface

## Technologies Used

- **React 18+** with TypeScript for type-safe component development
- **Vite** for fast development and optimized builds
- **Axios** for API communication
- **Lucide React** for consistent iconography
- **Radix UI** and **class-variance-authority** for accessible component primitives
- **Tailwind CSS** for responsive styling
- **Hosted on Spheron's decentralized cloud** with 4090 and RTX6000-ADA GPU support

## Prerequisites

- Node.js (v18.x or higher)
- npm (v9.x or higher) or yarn (v1.22.x or higher)
- Access to the backend API (running at `http://localhost:3000` or a deployed URL)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ./frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   Create or modify the `.env` file in the frontend directory:
   ```
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
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

## Project Structure

```
frontend/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable React components
│   │   ├── ui/        # UI component library
│   │   └── ...
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and API clients
│   ├── pages/         # Page components
│   ├── styles/        # Global styles
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Entry point
├── .env               # Environment variables
├── index.html         # HTML entry point
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## Key Components

- **ChatInterface**: Main component for the chat functionality
- **Index**: Landing page with features and call-to-action
- **Chat**: Page that incorporates the ChatInterface component
- **api.ts**: API client for communicating with the backend service

## Environment Variables

- `VITE_API_URL`: URL of the backend API server (default: http://localhost:3000)

## Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to your branch: `git push origin feature-name`
5. Create a Pull Request

## License

This hackathon project is provided under the MIT license.
