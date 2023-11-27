from getApp import getApp, printListApp
from AppOpener import *

printListApp()

app = input("Choisir l'application à ouvrire : ")

if app.isnumeric():
    open(getApp()[int(app)])
else:
    open(app, match_closest=True)