import os
from flask import Flask, request
from google.cloud import vision
from google.cloud.vision_v1 import types

app = Flask(__name__)

@app.route('/api/label_detection', methods=['POST'])
def label_detection_endpoint():
  image_path = request.json['image_path']
  labels = label_detection(image_path)
  return {'labels': labels}

@app.route('/api/face_detection', methods=['POST'])
def face_detection_endpoint():
  image_path = request.json['image_path']
  faces = face_detection(image_path)
  return {'faces': faces}

@app.route('/api/image_properties', methods=['POST'])
def image_properties_endpoint():
  image_path = request.json['image_path']
  properties = image_properties(image_path)
  return {'properties': properties}

@app.route('/api/text_detection', methods=['POST'])
def text_detection_endpoint():
  image_path = request.json['image_path']
  texts = text_detection(image_path)
  return {'texts': texts}

def label_detection(image_name):
  os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'service_account.json'
  client = vision.ImageAnnotatorClient()
  image = types.Image()
  image.source.image_uri = image_name
  response_label = client.label_detection(image=image)
  labels = []
  for label in response_label.label_annotations:
    labels.append(label.description)
  return labels

def face_detection(image_name):
  os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'service_account.json'
  client = vision.ImageAnnotatorClient()
  image = types.Image()
  image.source.image_uri = image_name
  response_face = client.face_detection(image=image)
  faces = []
  for face in response_face.face_annotations:
    faces.append({
      'anger_likelihood': face.anger_likelihood,
      'joy_likelihood': face.joy_likelihood,
      'sorrow_likelihood': face.sorrow_likelihood,
      'surprise_likelihood': face.surprise_likelihood
    })
  return faces

def image_properties(image_name):
  os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'service_account.json'
  client = vision.ImageAnnotatorClient()
  image = types.Image()
  image.source.image_uri = image_name
  response_props = client.image_properties(image=image)
  props = []
  for prop in response_props.image_properties_annotation.dominant_colors.colors:
    props.append({
      'color': prop.color,
      'score': prop.score,
      'pixel_fraction': prop.pixel_fraction
    })
  return props

def text_detection(image_name):
  os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'service_account.json'
  client = vision.ImageAnnotatorClient()
  image = types.Image()
  image.source.image_uri = image_name
  response_text = client.text_detection(image=image)
  texts = []
  for text in response_text.text_annotations:
    texts.append(text.description)
  return texts

if __name__ == '__main__':
  app.run(debug=True,port=5000)