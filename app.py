import flask
from flask import request, render_template
import numpy as np
import pandas as pd
from copy import deepcopy
from werkzeug import secure_filename
from PIL import Image
# import catdog

# Initialize the app
app = flask.Flask(__name__)

@app.route("/")
def viz_page():
    with open("index.html", 'r') as viz_file:
        return viz_file.read()

@app.route("/uploader", methods=["GET","POST"])
def get_image():
    if request.method == 'POST':
        f = request.files['file']
        sfname = 'images/'+str(secure_filename(f.filename))
        f.save(sfname)

        # clf = catdog.classifier()
        clf.save_image(f.filename)

        return render_template('index.html', pred = clf.predict(sfname), imgpath = sfname)
