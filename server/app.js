import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';

const app = express();

// Middleware
app.use(fileUpload());

// API endpoint
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const { images: files } = req.files;

  if (!Array.isArray(files)) {
    return res.status(400).send('Invalid input. Please upload multiple files.');
  }

  const uploadPath = path.join(__dirname, 'img');

  files.forEach((file) => {
    file.mv(`${uploadPath}/${file.name}`, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
    });
  });

  res.send('Files uploaded successfully.');
});

// Start server
app.listen(3000, () => {
  console.log('http://localhost:3000');
});