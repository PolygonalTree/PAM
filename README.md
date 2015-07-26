# PAM
Python App Manger.

This a simple application Manager that permits to automatically install python applications and run them.
In the installation process it creates a virtual enviroment under user_home_directory/.virtualenv with the name of the app.
The app needs to be distributed in compressed format (for now tar.gz) and need to have at least:
1. A folder /bin with run.py inside it, this will be the script call during launching.
2. A folder /img with icon.ico in it, this will be the app icon used to identify the app.

In the future it will support .whl packages and other distribution format.

Some screenshoots:
![alt tag](https://raw.github.com/polygonaltree/PAM/gh-pages/img/PAM.png)
![alt tag](https://raw.github.com/polygonaltree/PAM/gh-pages/img/install.png)

It uses NW.js to run the application. 
Dependencies:
* Python installed
* Virtualenv

It will be all packed in the future to a nice installer for Windows, MacOSX and Linux, help is wellcome.
