import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Code, MessageSquare, TerminalSquare, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src={"/assets/logo.jpg"} 
                alt="Spheron Logo" 
                className="h-8 w-8 mr-3 rounded-full object-cover"
              />
              <span className="text-xl font-bold text-spheron-black">Spheron ICL</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-spheron-primary/20 to-spheron-primary/5 p-6 no-underline outline-none focus:shadow-md"
                              href="#"
                            >
                              <MessageSquare className="h-6 w-6 text-spheron-primary" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                Spheron ICL Assistant
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                An AI-powered assistant for your infrastructure needs.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">ICL Documentation</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Learn about Spheron's Infrastructure Configuration Language
                            </p>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">YAML Generator</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Generate deployment configurations with AI
                            </p>
                          </a>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                        <li>
                          <a
                            href="#"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Documentation</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Learn how to configure and deploy your applications
                            </p>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Examples</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              View example configurations for common deployment scenarios
                            </p>
                          </a>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/chat">
                      <Button variant="ghost">Try the Chatbot</Button>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Button asChild>
                <Link to="/chat">Launch App</Link>
              </Button>
            </div>
            
            <div className="flex md:hidden">
              <Button variant="ghost" size="icon">
                <span className="sr-only">Open menu</span>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-spheron-black sm:text-5xl md:text-6xl">
              <span className="block">Deploy Smarter with</span>
              <span className="block text-spheron-primary">Spheron ICL Chatbot</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              A conversational assistant that helps you create deployment configurations and answer questions about Spheron's Infrastructure Configuration Language.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="px-8">
                <Link to="/chat">
                  Start Building <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feature Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-spheron-black">Features that simplify infrastructure</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our AI assistant makes deployment configuration easier than ever before.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="h-12 w-12 bg-spheron-primary/10 flex items-center justify-center rounded-lg mb-4">
                <MessageSquare className="h-6 w-6 text-spheron-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Ask Questions</h3>
              <p className="text-gray-600">
                Get answers about Spheron ICL, a declarative language for configuring and deploying applications.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="h-12 w-12 bg-spheron-primary/10 flex items-center justify-center rounded-lg mb-4">
                <Code className="h-6 w-6 text-spheron-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Generate YAML</h3>
              <p className="text-gray-600">
                Quickly create deployment configurations by asking the assistant to generate YAML for your specific needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="h-12 w-12 bg-spheron-primary/10 flex items-center justify-center rounded-lg mb-4">
                <Zap className="h-6 w-6 text-spheron-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Accelerate Development</h3>
              <p className="text-gray-600">
                Save time and reduce errors by leveraging AI to handle the complexity of configuration files.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-spheron-black">How It Works</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Simple steps to accelerate your deployment workflow
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="h-16 w-16 bg-spheron-primary/10 flex items-center justify-center rounded-full mx-auto mb-4">
                <span className="text-2xl font-bold text-spheron-primary">1</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Ask a Question</h3>
              <p className="text-gray-600">
                Type your question about deployment configuration or request a YAML example.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-spheron-primary/10 flex items-center justify-center rounded-full mx-auto mb-4">
                <span className="text-2xl font-bold text-spheron-primary">2</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Get AI Assistance</h3>
              <p className="text-gray-600">
                Our AI analyzes your request and provides relevant information or generates configuration.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-spheron-primary/10 flex items-center justify-center rounded-full mx-auto mb-4">
                <span className="text-2xl font-bold text-spheron-primary">3</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Deploy with Confidence</h3>
              <p className="text-gray-600">
                Use the generated YAML directly in your Spheron infrastructure deployments.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-spheron-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">Ready to simplify your deployments?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            Start using Spheron ICL Chatbot today to accelerate your infrastructure workflows.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="bg-white text-spheron-black hover:bg-gray-100">
              <Link to="/chat">
                Try it now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-spheron-dark text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <img 
                  src={"/assets/logo.jpg"} 
                  alt="Spheron Logo" 
                  className="h-8 w-8 mr-3 rounded-full object-cover"
                />
                <span className="text-xl font-bold">Spheron</span>
              </div>
              <p className="mt-4 text-gray-400">
                Building the future of cloud infrastructure.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Examples</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
            <p>Powered by Qwen2.5-coder 7B and Pinecone with llama-text-embed-v2</p>
            <p className="mt-1 text-gray-400">© 2025 Spheron ICL Chatbot - Hackathon Project</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
