import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import axios from 'axios';
import cors from 'cors';
import weaviate from 'weaviate-ts-client';
import fs from 'fs';
const __dirname = path.resolve();

const app = express();

// Middleware
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Vector database initialization
// const client = weaviate.client({
//   scheme: 'http',
//   host: 'localhost:8080',
// });// initialize client by pointing it to the database

// const schemaConfig = {
// 'class': 'ReverseImageSearch',
// 'vectorizer': 'img2vec-neural', // that will use the pytorch vectorizer running on this container
// 'vectorIndexType': 'hnsw',
// 'moduleConfig': {
//     'img2vec-neural': {
//         'imageFields': [
//             'image'
//         ]
//     }
// },
// 'properties': [
//     {
//         'name': 'image',
//         'dataType': ['blob']
//     },
//     {
//         'name': 'text',
//         'dataType': ['string']
//     }
// ]
// }

// await client.schema
// .classCreator()
// .withClass(schemaConfig)
// .do();

// const schemaRes = await client.schema.getter().do();

// API endpoint
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No files were uploaded.' });
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

    // try {
    //   const b64 = toBase64(`./img/${file.name}`);
    //   await client.data.creator()
    //   .withClassName('ReverseImageSearch')
    //   .withProperties({
    //     image: b64,
    //     text: imgFile.split('.')[0].split('_').join(' ')
    //   })
    //   .do();
    // } catch (error) {
    //   return res.status(500).json({ message: 'Error uploading vectorizing the images', error: err });
    // }
    
  });

  res.status(200).json({ message: 'Files uploaded successfully.' });
});

// upload for analyzing images to the similar-img directory
app.post('/upload-similar', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }

  // Extract the file from the request
  const file = req.files.image;

  const uploadPath = path.join(__dirname, 'similar-img', file.name);

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading the file.', error: err });
    }
    res.status(200).json({ message: 'File uploaded successfully.' });
  });
});

// API endpoint for analyzing all the images in the similar-img folder
app.get('/analyze-similar', (req, res) => {
  const imgDir = path.join(__dirname, 'similar-img');
  const imgFiles = fs.readdirSync(imgDir);

  imgFiles.forEach((file) => {
    console.log(`file is ${file}`)
    const imageUrl = `http://localhost:8000/img/${file}`;
    console.log(`the image url is ${imageUrl}`)
    
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

  });

  res.status(200).json({ message: 'Images analyzed successfully.'});

});

// API endpoint for analyzing images for Google Cloud Vision API, look at all the images in the img folder and create a label and text detection for each image which will be stored in the json file
app.get('/analyze', (req, res) => {
  const imgDir = path.join(__dirname, 'img');
  const imgFiles = fs.readdirSync(imgDir);

  imgFiles.forEach((file) => {
    const imageUrl = `http://localhost:8000/img/${file}`;
    
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

  res.status(200).json({ message: 'Images analyzed successfully.'});

});

// API endpoint for searching images by uploading an image

// API endpoint by searing by text

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});