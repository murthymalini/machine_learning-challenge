import os
import json
from flask import Flask, render_template, request, jsonify
from os.path import join, dirname, realpath

# Dependenciees for all models
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import Model
import numpy as np

# Dependencies for VGG16
from tensorflow.keras.applications.vgg16 import (
        VGG16, 
        preprocess_input as preprocess_input_vgg16, 
        decode_predictions as decode_predictions_vgg16
)
# Dependencies for VGG19
from tensorflow.keras.applications.vgg19 import (
        VGG19, 
        preprocess_input as preprocess_input_vgg19, 
        decode_predictions as decode_predictions_vgg19
)
# Dependencies for RESNET50
from tensorflow.keras.applications.resnet50 import (
        ResNet50,
        preprocess_input as preprocess_input_resnet50, 
        decode_predictions as decode_predictions_resnet50
)

# Initialize the app
app = Flask(__name__)

APP_ROOT = os.path.dirname(os.path.abspath(__file__))

@app.route("/")
def index():
    return render_template("upload.html")

@app.route("/upload", methods=['POST'])
def upload():
    target = os.path.join(APP_ROOT, 'image_upload')
    print(target)

    if not os.path.isdir(target):
        os.mkdir(target)

    for file in request.files.getlist("file"):
        print(file)
        filename = file.filename
        filename = 'test.jpg'
        print('filename:', filename)
        destination = "/".join([target, filename])
        print(destination)
        file.save(destination)

    return render_template("complete.html")

@app.route("/predict")

def predict_image():
    image_path = 'image_upload/test.jpg'
    image_path = join(dirname(realpath(__file__)), image_path)
    ## For all Models
    # Load Image
    img = image.load_img(image_path, target_size=(224, 224))
    # Convert Image to an Array
    x = image.img_to_array(img)
    # Reshape the image according to the model input requierements
    x = x.reshape((1, x.shape[0], x.shape[1], x.shape[2]))

    # For Model VGG16
    model = VGG16()
    # Preprocess for the model VGG16
    x_vgg16 = preprocess_input_vgg16(x)
    # Prediction for the Model VGG16
    prediction_vgg16 = model.predict(x_vgg16)
    # Decoded Prediction for Model VGG16
    decoded_prediction_vgg16 = decode_predictions_vgg16(prediction_vgg16, top=3)

    # For Model VGG19
    model = VGG19()
    # Preprocess for the model VGG19
    x_vgg19 = preprocess_input_vgg19(x)
    # Prediction for the Model VGG19
    prediction_vgg19 = model.predict(x_vgg19)
    # Decoded Prediction for Model VGG19
    decoded_prediction_vgg19 = decode_predictions_vgg19(prediction_vgg19, top=3)

    # For Model RESNET50
    model = ResNet50()
    # Preprocess for the model RESNET50
    x_restnet50 = preprocess_input_resnet50(x)
    # Prediction for the Model RESNET50
    prediction_resnet50 = model.predict(x_restnet50)
    # Decoded Prediction for Model RESNET50
    decoded_prediction_resnet50 = decode_predictions_resnet50(prediction_resnet50, top=3)

    json_answer = []

    model_vgg16_resp = []
    for i in range(0,3):
        json = {}
        json["Model"] = 'VGG16'
        json["no"] = i+1
        json["prediction"] = decoded_prediction_vgg16[0][i][1],
        json["probability"] = "{:.2%}".format(decoded_prediction_vgg16[0][i][2])
        model_vgg16_resp.append(json)
    json_answer.append(model_vgg16_resp)
    model_vgg19_resp = []
    for i in range(0,3):
        json = {}
        json["Model"] = 'VGG19'
        json["no"] = i+1
        json["prediction"] = decoded_prediction_vgg19[0][i][1],
        json["probability"] = "{:.2%}".format(decoded_prediction_vgg19[0][i][2])
        model_vgg19_resp.append(json)
    json_answer.append(model_vgg19_resp)
    model_resnet50 = []
    for i in range(0,3):
        json = {}
        json["Model"] = 'RESNET50'
        json["no"] = i+1
        json["prediction"] = decoded_prediction_resnet50[0][i][1],
        json["probability"] = "{:.2%}".format(decoded_prediction_resnet50[0][i][2])
        model_resnet50.append(json)
    json_answer.append(model_resnet50)

    return jsonify(json_answer)

if __name__ == "__main__":
    app.debug=True
    app.run()
