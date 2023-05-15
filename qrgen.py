import pyqrcode
def qr(data):
    pqr = pyqrcode.create(data)
    filename = 'myqrcode.png'
    pqr.png("tmp/"+filename, scale=10)
    return "tmp/"+filename