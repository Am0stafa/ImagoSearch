import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import axios from 'axios';
import cors from 'cors';
import weaviate from 'weaviate-ts-client';


const app = express();

// Middleware
app.use(fileUpload());
app.use(cors());

//Vector database initialization
const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});// initialize client by pointing it to the database

const schemaConfig = {
'class': 'reverseImageSearch',
'vectorizer': 'img2vec-neural', // that will use the pytorch vectorizer running on this container
'vectorIndexType': 'hnsw',
'moduleConfig': {
    'img2vec-neural': {
        'imageFields': [
            'image'
        ]
    }
},
'properties': [
    {
        'name': 'image',
        'dataType': ['blob']
    },
    {
        'name': 'text',
        'dataType': ['string']
    }
]
}

await client.schema
.classCreator()
.withClass(schemaConfig)
.do();

const schemaRes = await client.schema.getter().do();


// API endpoint
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const { images: files } = req.files;

  if (!Array.isArray(files)) {
    return res.status(400).json({ message: 'Invalid file type. Must be many images' });
  }

  const uploadPath = path.join(__dirname, 'img');

  files.forEach(async (file) => {
    file.mv(`${uploadPath}/${file.name}`, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error uploading files.', error: err });
      }
    });
    // vectorize the image and upload it to the database

    try {
      const b64 = toBase64(`./img/${file.name}`);
      await client.data.creator()
      .withClassName('reverseImageSearch')
      .withProperties({
        image: b64,
        text: imgFile.split('.')[0].split('_').join(' ')
      })
      .do();
    } catch (error) {
      return res.status(500).json({ message: 'Error uploading vectorizing the images', error: err });
    }
    
  });

  res.status(200).json({ message: 'Files uploaded successfully.' });
});



// API endpoint for analyzing images for Google Cloud Vision API
app.get('/analyze', (req, res) => {
  const imgDir = path.join(__dirname, 'img');
  const imgFiles = fs.readdirSync(imgDir);

  imgFiles.forEach((file) => {
    const imageUrl = `http://localhost:3000/img/${file}`;

    // Make POST request to label detection endpoint
    axios.post('http://localhost:5000/api/label_detection', { image_path: imageUrl })
      .then((response) => {
        console.log(`Labels for ${file}:`, response.data.labels);
      })
      .catch((error) => {
        console.error(`Error analyzing ${file} for labels:`, error);
        res.status(500).json({ message: 'Error analyzing images.', error });
        return;
      });

    // Make POST request to text detection endpoint
    axios.post('http://localhost:5000/api/text_detection', { image_path: imageUrl })
      .then((response) => {
        console.log(`Text for ${file}:`, response.data.texts);
      })
      .catch((error) => {
        console.error(`Error analyzing ${file} for text:`, error);
        res.status(500).json({ message: 'Error analyzing images.', error });
        return;
      });
  });

  res.status(200).json({ message: 'Images analyzed successfully.' });
});


// Start server
app.listen(3000, () => {
  console.log('http://localhost:3000');
});