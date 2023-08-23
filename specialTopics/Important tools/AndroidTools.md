
# Android
Installation for tools is documented in first lab task but attention installation is/was incorrect (12.6.2023)


### Android Studio
- development environment for Android
- installation: see first lab task
*Remark: often normal java does the trick to reverse something written for Android. In some cases this might fail however*

**Websites for Android development**
- https://apilevels.com/
- https://developer.android.com/docs
Sometimes also helpful for reverse engineering


### apktools, apksigner and adb
Dont follow lab task but this: https://ibotpeaches.github.io/Apktool/install/ (also explained below)

Installation: apktools
1. Download Linux wrapper script (Right click, Save Link As apktool)
2. Download apktool-2 (find newest here)
3. Rename downloaded jar to apktool.jar
4. Move both files (apktool.jar & apktool) to /usr/local/bin (root needed)
    - `cp /home/hacker/Downloads/Android/apkTool/apktool /usr/local/bin`
    - `cp /home/hacker/Downloads/Android/apkTool/apktool.jar /usr/local/bin`
5. Make sure both files are executable (chmod +x)
6. Try running apktool via cli
    - `cd /home/hacker/Downloads/Android/apkTool/`
    - `apktool/`  (or "sh apktool" ???)
        - `apktool --version` -> check if installation successful

*Remark 1: maybe java 11 is needed*
*Remark 2: if you use "apt-get install apktool", it will work but jadx will fail 


Installation: apksigner and adb: 
- `apt-get install apksigner`
- `apt-get install adb`

Some usage examples: 
- `apktools d apkFile.apk` -> will unpack/decode apk file and write it into a folder
- `apktool b folderWithDecodedApk` -> will build and create an apk file that can be installed
- `apksigner sign -ks release.keystore CrackMeSimple/dist/CrackMeSimple.apk`  (apksigner sign -ks [keyFile] [ourChangedApkFile.apk])
    - will ask for password of release.keystore file
    - generate key file: `keytool -genkey -v -keystore release.keystore -alias example -keyalg RSA -keysize 2048 -validity 10000`
        - step through the process and provide meaningful answers plus give a reasonable password. 
        - Creates a keyfile "release.keystore" in the folder the command was executed in
- `adb shell` ->  get a shell to access android system (i believe)
    - `exit` -> return to normal shell
- `adb install myAndroidapp.apk` -> will install android application
- `adb uninstall org.bfe.crackmesimple` -> uninstalls android app (attention: full package name is needed)
- `adb reverse tcp:9000 tcp:443` -> port forwarding. On laptop (where adb runs) we have a service running on port 443. On the connected android phone, we now forward request on port 9000 to the port 443 on the service. So to access the service on the laptop (443), one has to call https://localhost:9000 on the phone


Basic usage: `apktools d apkFile.apk` -> will unpack/decode apk file and write it into a folder




**jadx**
tool for reverse engineering (a bit like IlSpy/Reflector for .Net)

```
cd /home/hacker
git clone https://github.com/skylot/jadx.git
cd jadx
./gradlew build
./gradlew dist
```
`export PATH=$PATH:/home/hacker/jadx/build/jadx/bin` -> make the path available (it has happened that the path variable got lost, just reexecute cmd)

Run ui: `jadx-gui`  (./build/jadx/bin/jadx-gui)
Run cli: `jadx`  (./build/jadx/bin/jadx)

**Frida** 
Frida is a tool that can be used for android tracing (and more devices). It also allows to hook into methods (not shown here) for various purposes: advanced tracing, spoofing of various input/resources (e.g. location) which can be used for reverse engineering, development etc.

To get frida running, the a process "frida-server" has to be installed on the device. Outsice, the frida-client can then communicate with the frida-server. This server process is the interface to which frida-client can connect to from outside and get information about what is happing on the android device

https://codeshare.frida.re

*Remark: never install frida on a device with the playstore installed*


**Install Frida**
running the following commands as root
- `pipenv --python 3 shell` -> creates a virtual environment 
    - See success msg 
    Successfully created virtual environment!
    Virtualenv location: /root/.local/share/virtualenvs/hacker-2-tVmwA4
    Creating a Pipfile for this project...
    Launching subshell in virtual environment...
    /home/hacker   . /root/.local/share/virtualenvs/hacker-2-tVmwA4/bin/activate     
- `pip install frida`
- `pip install frida-tools`
- `pip install objection`
- Install frida-android-helper (since "pip install frida-android-helper" fails)
  - `git clone https://github.com/Hamz-a/frida-android-helper.git`
  - `cd frida-android-helper`
  - `python3 setup.py install`

basic test run `frida-ps` or `frida --version`

**install frida server on android device (emulator)**
"fah server update" returned an error (something like: No module named 'ppadb') so i have to download and install the frida server on the android device manually following: https://medium.com/@briskinfosec/getting-started-with-frida-de44d932ae7 and https://frida.re/docs/android/

- `frida --version` -> 16.0.19
- download frida-server for my platform from https://github.com/frida/frida/releases (for right version)
    - Downloaded "frida-server-16.0.19-android-x86_64.xz" (matching my emulator)
    - `unxz frida-server-16.0.19-android-x86_64.xz` -unpack
    - `cp frida-server-16.0.19-android-x86_64 frida-server` -> copy (rename)
        - `rm frida-server-16.0.19-android-x86_64` (delete orig so make)
- Now set up frida-server on android device
    - `adb root` (might be necessary according to manual)
    - `adb push frida-server /data/local/tmp/` copy frida-server to device
    - `adb shell` start shell
    - `chmod 755 /data/local/tmp/frida-server`
    - `cd /data/local/tmp`
    - `./frida-server &` -> start frida server ("&" to not block cmd)
        - output: "[1] 5691"

Check if server is up and running
- `exit` -> leave device bash (but still in the same window)
    - somehow I got stuck and had to send the Quit signal (right click on window>send signal) and then I had to reconnect to virtual environment via "pipenv --python 3 shell"
- `frida-ps -U` -> there should be a process "frida-server"

**Example tracing (CrackMeSimple example)**
Now that server is running we can start tracing. 
In the emulator I start CrackMeSimple and enter a password and try to sign in to ensure all classes are loaded (tried it without it, not all classes are traced)

- `frida-trace -U -j 'org.bfe*!*' 'CrackMe Simple'` -> starts tracing
    - will trace process "CrackMe Simple" and classes in namespace/classpath "org.bfe" 
    - i get the name of the process from "frida-ps -U"
    - We see input and return values from called methods

