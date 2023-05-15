from flask import Flask, request, send_file, redirect
import csv
import qrgen
import checkurl

app = Flask(__name__)

# Set path to CSV file
CSV_FILE = "links.csv"

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
            # Check if link already exists in CSV file
            link_exists = False
            with open(CSV_FILE, 'r') as csvfile:
                reader = csv.reader(csvfile)
                for row in reader:
                    if row[0] == data:
                        link_exists = True
                        break
            
            if link_exists:
                # If link already exists, construct URL for tracking link
                data = request.host_url + "track?link=" + data
            else:
                # If link does not exist, insert link into CSV file with open count of 0
                with open(CSV_FILE, 'a', newline='') as csvfile:
                    writer = csv.writer(csvfile)
                    writer.writerow([data, 0])
                # Construct URL for tracking link
                data = request.host_url + "track?link=" + data

    # Generate QR code for link
    return send_file(qrgen.qr(data), mimetype='image/png')



@app.route("/track")
def track_link():
    # Find link in CSV file
    link = request.args.get('link', False)
    rows = []
    link_found = False
    with open(CSV_FILE, 'r') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            if row[0] == link:
                # If link exists, increment open count and redirect to link
                open_count = int(row[1]) + 1
                row[1] = str(open_count)
                link_found = True
            rows.append(row)

    if link_found:
        with open(CSV_FILE, 'r+', newline='') as file:
            writer = csv.writer(file)
            writer.writerows(rows)
        return redirect(link)
    else:
        return "Link not found"










@app.route('/links')
def show_links():
    # Retrieve all links in CSV file
    link_list = []
    with open(CSV_FILE, 'r') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            link = row[0]
            open_count = row[1]
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
