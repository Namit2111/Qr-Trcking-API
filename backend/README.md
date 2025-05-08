# QR-Link Tracker

QR-Link Tracker is a Flask application that generates QR codes for URLs and tracks clicks on those links. The application uses MongoDB to store information about the links, including the number of times each link has been clicked.

## Installation

1. Clone the repository:

```
git clone https://github.com/username/qr-link-tracker.git
```

2. Start docker-compose:

```
docker-compose up -d
```

or run locally then:

2. Install the required packages:

```
pip install -r requirements.txt
```

3. Set up MongoDB by creating a cluster and a database on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

4. Set the MongoDB client connection string in your environment:

```
export MONGODB_URL=mongodb+srv://Namit:namitjain12@qr-links.vmesk58.mongodb.net/
```

5. Start the application

```
cd app
python3 -m flask --app app run --host=0.0.0.0
```
The application will be available at `http://localhost:5000`.

## Usage

### Endpoints

#### `/qr`

Generates a QR code for a given URL. 

Parameters:
- `data`: the URL to generate a QR code for (required)
- `track`: whether to track clicks on the link (optional)
- `key`: a custom key for the link (optional)
```
Example: `http://localhost:5000/qr?data=https://www.google.com&track=True&key=mycustomkey`
```

#### `/track`

Tracks clicks on a given URL and redirects to the URL.

Parameters:
- `link`: the URL to track clicks for (required)
```
Example: `http://localhost:5000/track?link=https://www.google.com`
```

#### `/links`

Displays a table of all links that have been tracked by the application.

Parameters:
`key`: a custom key for the link (optional)
```
Example: `http://localhost:5000/links?key=my-key`
```

The custom key feature allows users to assign their own keys to the links they generate,  This can be useful for branding purposes or to make the links easier to remember.

Thank you!