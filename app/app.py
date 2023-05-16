import os

from flask import Flask, jsonify, redirect, request, send_file
from flask_cors import CORS
from pymongo import MongoClient

import checkurl as checkurl
import qrgen as qrgen

app = Flask(__name__)
CORS(app)
# Set up MongoDB client

mongodb_url = os.environ.get("MONGODB_URL")

client = MongoClient(mongodb_url)
db = client["QR-Links"]
links = db["links"]


@app.route("/")
def home():
    return "QR code API "


@app.route("/qr")
def qrcode():
    # Get track, data and key parameters from query string
    track = request.args.get("track", False)
    data = request.args.get("data")
    key = request.args.get("key", None)

    # Check if tracking is enabled and link is valid
    if track:
        code = checkurl.check(data)
        if code == "200":
            # Check if link already exists in MongoDB
            if links.find_one({"url": data}):
                # If link already exists, construct URL for tracking link
                data = request.host_url + "track?link=" + data
            else:
                # If link does not exist, insert link into MongoDB with open count of 0 and key (if provided)
                link_data = {"url": data, "open_count": 0}
                if key:
                    link_data["key"] = key
                link_data["key"] = None
                links.insert_one(link_data)
                print(link_data)
                # Construct URL for tracking link
                data = request.host_url + "track?link=" + data
        else:
            return "Not valid link"

    # Generate QR code for link
    return send_file(qrgen.qr(data), mimetype="image/png")


@app.route("/track")
def track_link():
    # Find link in MongoDB
    link = request.args.get("link", False)
    found_link = links.find_one({"url": link})

    if found_link:
        # If link exists, increment open count and redirect to link
        open_count = found_link["open_count"] + 1
        links.update_one({"url": link}, {"$set": {"open_count": open_count}})
        return redirect(link)
    else:
        return "Link not found"


@app.route("/links")
def show_links():
    # Retrieve all links in MongoDB
    key = request.args.get("key", None)
    link_list = []
    if key:
        # Retrieve links with the given key from the database
        for link in links.find({"key": key}):
            link_list.append(
                (
                    link["url"],
                    link["open_count"],
                    request.host_url + "track?link=" + link["url"],
                )
            )
    else:
        # Retrieve all links from the database
        for link in links.find({"key": None}):
            link_list.append(
                (
                    link["url"],
                    link["open_count"],
                    request.host_url + "track?link=" + link["url"],
                )
            )

    return jsonify(link_list)


if __name__ == "__main__":
    app.run(debug=True)
    app.run(host="0.0.0.0", port=5000, use_reloader=True)
