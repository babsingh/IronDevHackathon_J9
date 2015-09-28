# IronDevHackathon_J9
Goal: To create a communication system to relay events and news to IBMers around the lab using mobile devices. 

### Instructions on starting the server (express app)

1) One time setup:
- Install express: "npm install -g express"
- Install express-generator: "npm install -g express-generator"
- Install nodemon: "npm install -g nodemon" (Mac would need "sudo")
  * nodemon updates the express app in realtime so you don't have to restart the app whenever a change is made
- Create a "data" directory for mongoDB (outside git repo or include it in .gitignore)
	
2) Install/update express app dependencies in package.json: "npm install"

3) Start mongoDB server locally in a separate terminal: "mongod --dbpath $PATH_TO_DATA_DIR"

4) Go to the root of the express app: "cd $GIT_WORKSPACE/server"

5) Start the express app: "npm start" or "gulp"

6) In the browser, load the app: "localhost:8080/"
- Change port (=8080) by editing bin/www

### Instructions on starting the ionic app ("sudo" may be needed on Mac):

1) Create platform specific target (Android/iOS Dev Tools Needed)
- android: "ionic platform add android"
- ios: "ionic platform add ios"

2) Build the target
- android: "ionic build android"
- ios: "ionic build ios"

3) Testing app 
- On browser: "ionic server"
- On emulator: 
	* android: "ionic emulate android"
	* ios: "ionic emulate ios"
- On device [Do step 4 for Android device]: 
	* android: "ionic run android"
		* Alternative: Find "*.apk" in "$IONIC_WORKSPACE/platforms/android/". Then, "adb install $PATH_TO_APK".
	* ios: Open XCode project from "$IONIC_WORKSPACE/platforms/ios/". Then, start the simulator from XCode.

4) One time setup (if you have a android device)
- Google USB Driver: "$ANDROID_HOME\extras\google\usb_driver\"
- Activate developer options on the Android device
	* Go to the settings menu, and scroll down to "About phone." Tap it.
	* Scroll down to the bottom again, where you see "Build number." (Your build number may vary from ours here.)
	* Tap it seven (7) times.
- Connect Android device to your computer
- Open device manager
	* Right click "Other devices -> ADB Interface"
	* Update Driver Software ...
	* Browse my computer ...
	* Let me pick from a list of device drivers ...
	* Show all devices ... -> Next 
	* Have Disk ... -> Select "$ANDROID_HOME\extras\google\usb_driver\android_winusb.inf"
	* Select "Android ADB Interface" -> Next -> Install
	
### Environment Setup

1) Install Android SDK (Tools Only; Don't get Android Studio; Will be using Eclipse)
- https://developer.android.com/sdk/index.html#Other
- Set JAVA_HOME before installing Android SDK
- Use SDK manager to install appropriate tools

2) Install latest Eclipse 
- https://eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/mars/R/eclipse-java-mars-R-win32-x86_64.zip

3) Install the ADT/Android plugin in Eclipse 
- http://developer.android.com/sdk/installing/installing-adt.html

4) Install GenyMotion (Android Emulator; Very fast)
- https://www.genymotion.com/#!/download

5) Install Ant
- https://ant.apache.org/bindownload.cgi
- Instructions - http://www.mkyong.com/ant/how-to-install-apache-ant-on-windows/

6) Install Node -> npm mangager (.msi)
- https://nodejs.org/en/download/
- Instructions - http://blog.teamtreehouse.com/install-node-js-npm-windows

7) Install MongoDB
- http://docs.mongodb.org/master/tutorial/install-mongodb-on-windows/
- http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/

8) Restart your computer

9) Open terminal or cmd to install the following dependencies:
- Install Cordova: npm install –g cordova
- Install Ionic: npm install –g ionic
- Update Cordova: npm update cordova
- Update Ionic: npm update ionic
