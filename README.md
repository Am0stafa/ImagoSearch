# Image-reverse-search
Looking for a powerful yet straightforward way to sift through your extensive image collections? This Reverse Image Search engine is built just for you! Designed using advanced neural networks and vector databases, This search engine allows you to upload multiple images to your personal database. Once uploaded, simply search through them by uploading another image! Behind the scenes, the engine leverages JavaScript and the potent Weaviate vector database to perform the magic. For privacy, you will find below how to run it locally.\
\
An extra layer of security and privacy to your project. Self-hosting ensures that users have full control over their data, which is particularly important for sensitive or personal images. 

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

