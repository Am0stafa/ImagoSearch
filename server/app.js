import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import axios from 'axios';
import cors from 'cors';

const app = express();

// Middleware
app.use(fileUpload());
app.use(cors());

// API endpoint
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const { images: files } = req.files;

  if (!Array.isArray(files)) {
    return res.status(400).json({ message: 'Invalid file type. Must be an array of images.' });
  }

  const uploadPath = path.join(__dirname, 'img');

  files.forEach((file) => {
    file.mv(`${uploadPath}/${file.name}`, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error uploading files.', error: err });
      }
    });
  });

  res.status(200).json({ message: 'Files uploaded successfully.' });
});


// API endpoint for analyzing images
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