import pyqrcode
def qr(data):
    pqr = pyqrcode.create(data)
    filename = 'myqrcode.png'
    pqr.png("static/"+filename, scale=10)
    return "static/"+filename