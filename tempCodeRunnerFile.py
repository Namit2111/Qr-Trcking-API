from flask import Flask, request, send_file, redirect
import csv
import qrgen
import checkurl
from flask_cors import CORS

app = Flask(__name__)
CORS(app)