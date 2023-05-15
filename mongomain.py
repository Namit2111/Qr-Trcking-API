from flask import Flask, request, send_file,redirect
from pymongo import MongoClient
import qrgen
import checkurl

app = Flask(__name__)

# Connect to MongoDB database
client = MongoClient("mongodb://localhost:27017/")
db = client["link_db"]
links = db["links"]

@app.route('/')
def home():
    return "Home"

@app.route('/qr')
def qrcode():
    # Get track and data parameters from query string
    track = request.args.get('track', False)
    data = request.args.get('data')

    # Check if tracking is enabled and link is valid
    if track:
        code = checkurl.check(data)
        if code == "200":
            # Check if link already exists in MongoDB collection
            link_doc = links.find_one({"link": data})
            if link_doc:
                # If link already exists, construct URL for tracking link
                data = request.host_url + "track?data=" + data
            else:
                # If link does not exist, insert link into MongoDB collection with open count of 0
                data_doc = {"link": data, "open": 0}
                links.insert_one(data_doc)
                # Construct URL for tracking link
                data = request.host_url + "track?data=" + data

    # Generate QR code for link
    return send_file(qrgen.qr(data), mimetype='image/png')

@app.route("/track")
def track_link():
    # Find link document in MongoDB collection
    link = request.args.get('link', False)
    link_doc = links.find_one({"link": link})
    
    # If link exists, increment open count and return value
    if link_doc:
        open_count = link_doc["open"] + 1
        links.update_one({"link": link}, {"$set": {"open": open_count}})
        return redirect(link)
    else:
        return "Link not found"


@app.route('/links')
def show_links():
    # Retrieve all links in MongoDB collection
    link_docs = links.find({})
    link_list = []
    for doc in link_docs:
        link = doc["link"]
        open_count = doc["open"]
        track_url = request.host_url + "track?link=" + link
        link_list.append((link, open_count, track_url))

    # Generate HTML table for links
    table = "<table><tr><th>Link</th><th>Open Count</th><th>Track URL</th></tr>"
    for link, open_count, track_url in link_list:
        table += f"<tr><td>{link}</td><td>{open_count}</td><td><a href='{track_url}'>{track_url}</a></td></tr>"
    table += "</table>"
    
    return table


if __name__ == "__main__":
    app.run(debug=True)
