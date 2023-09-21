# Image-reverse-search
Looking for a powerful yet straightforward way to sift through your extensive image collections? Do you find yourself lost in a sea of digital images, struggling to manage, organize, or even locate specific photos? This Reverse Image Search engine is built just for you! Designed using advanced neural networks,  vector databases and Google vision API, This search engine allows you to upload multiple images to your personal database. Once uploaded, simply search through them by uploading another image and offer text-based search capabilities, thanks to the integration of image processing! Behind the scenes, the engine leverages the potent neural networks, Weaviate vector database and Google Vision API  to perform the magic. For privacy, you will find below how to run it locally and self-host it.\
\
An extra layer of security and privacy is self-hosting which ensures that users have full control over their data, which is particularly important for sensitive or personal images.

### Why Choose This Engine?

- **Multi-Modal Search**: Search by image or text to find exactly what you're looking for in your personal image collection, whether it's an image or a keyword like 'car,' our engine will find all relevant images in your collection.
- **Advanced Technologies**: Utilizes state-of-the-art neural networks, the Weaviate vector database, and Google Vision API for precise and efficient search results. This is crucial for maintaining the confidentiality and security of your personal or sensitive images.
- **Privacy and Security**: Designed to be self-hosted, your data never leaves your local machine, ensuring the utmost confidentiality and security of your personal or sensitive images.
- **User-Friendly**: A simple upload adds your images to your personal database, making them instantly searchable.
- **Tech Stack**: Built using a microservices architecture with Python and Node.js for the backend, and React for the frontend. The entire system is containerized using Docker for easy setup and deployment.

Scroll down to discover how to set up and run this powerful, secure, and privacy-focused tool on your local machine.\
## Key Takeaways

### 1. Vector Databases
Unlike traditional databases, vector databases convert each object to a numerical array called a vector. This enables efficient similarity-based queries.\

### 2. Neural Networks
The use of pre-trained neural networks like ResNet-50 for image vectorization is a powerful feature. It allows the system to create meaningful embeddings for each image.\

### 3. Weaviate
This vector database is versatile and supports various types of data. It can be run locally using Docker, which is a plus for privacy and data security.\

### 4. JavaScript Client
The Weaviate TypeScript client allows for easy interaction with the database. The Builder pattern is used for chaining methods, which might not be everyone's favourite but is effective.\

### 5. Schema Definition
The schema for the database is defined in the code, specifying the types of data that will be stored and how they will be vectorized.\

### 6. Data Ingestion
The tutorial covers how to read image files, convert them to base64 format, and then upload them to the Weaviate database.\

### 7. Querying
The system uses GraphQL for querying, allowing for a flexible and powerful way to retrieve similar images.\

### 8. Text-Based Search with Google Vision API
The system now also supports text-based searches using Google Vision API. This allows for object detection, facial recognition, and even text recognition within images, making the search functionality even more versatile.

## Docker and Self-Hosting

Our Reverse Image and Text Search engine is designed to be self-hosted, providing an extra layer of privacy and security. Docker plays a crucial role in this:

- **Consistency**: Ensures the application runs the same on all systems.
- **Isolation**: Improves security by isolating the application from the host system.
- **Portability**: Easily move the application between different machines.
- **Ease of Setup**: Get up and running with a single command.
- **Version Control**: Easily switch between different versions of the application.
- **Resource Efficiency**: More efficient use of system resources compared to traditional VMs.
- **Network Configuration**: Simplifies network setups for communication with other services.

To get started with self-hosting, simply
