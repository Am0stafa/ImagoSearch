import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});// initialize client by pointing it to the database

const schemaConfig = {
  'class': 'reverseImageSearch',
  'vectorizer': 'img2vec-neural',
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

//Vectorizing to the database

//convert an image to base64. and upload an image to the database
const img = readFileSync('./img/test.jpg');

const b64 = Buffer.from(img).toString('base64');

await client.data.creator()
  .withClassName('reverseImageSearch')
  .withProperties({
    image: b64,
    text: 'matrix meme'
  })
  .do();

//add image to the img directory
const imgFiles = readdirsSync('./img');

const promises = imgFiles.map(async (imgFile) => {
  const b64 = toBase64(`./img/${imgFile}`);
  await client.data.creator()
    .withClassName('reverseImageSearch')
    .withProperties({
      image: b64,
      text: imgFile.split('.')[0].split('_').join(' ')
    })
    .do();
});

await Promise.all(promises);

// find all the similar images
const test = Buffer.from( readFileSync('./test.jpg') ).toString('base64');

const resImage = await client.graphql.get()
  .withClassName('reverseImageSearch')
  .withFields(['image'])
  .withNearImage({ image: test })
  .withLimit(1)
  .do();

// Write result to filesystem
const result = resImage.data.Get.reverseImageSearch[0].image; // get the one most similar image
writeFileSync('./result.jpg', result, 'base64');



console.log(schemaRes)