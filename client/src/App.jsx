import React, { useState, useEffect } from 'react';
import { Loading } from './Loading';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showGrid, setShowGrid] = useState(true);// You can change this to false if you want the grid to be hidden initially
  const [numberOfResults, setNumberOfResults] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
        setNumberOfResults(data.length);  // Setting the number of results
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setIsLoading(false);
      });
  }, []);

  const downloadImage = (url) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'image.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="app">
      <h1 className='title' >Number of Results: {numberOfResults}</h1> 
      {
        isLoading ? (
          <Loading />
      ) : (
        showGrid && (
          <div className="image-grid">
            {images.map((image) => (
              <div key={image.id} className="image-item">
                <p>{image.title}</p>
                <img 
                  src={image.thumbnailUrl} 
                  alt={image.title} 
                  onClick={() => downloadImage(image.url)}
                />
              </div>
            ))}
          </div>
        )
      )
      }
    </div>
  );
};

export default App;
