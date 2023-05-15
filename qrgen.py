import pyqrcode
def qr(data):
    pqr = pyqrcode.create(data)
    filename = '/tmp/myqrcode.png'
    pqr.png(filename, scale=10)
    return filename