# Modify Package (APF)

### Steps

Prerequisites: installation of android tools (Lab 1)

1. Download CrackMeSimple.apk file
2. Start emulator
    - `cd android-studio/bin`
    - `./studio.sh`
    - from android studio splash screen: "More actions" > "Virtual Device Manager" >  Start Nexus

3. install downloaded CrackMeSimple.apk (into emulated android)
    - `adb install CrackMeSimple.apk` -> will install in pkg: /data/local/tmp/CrackMeSimple.apk (according to msg)
    - This will fail if emulator is not started
        - Tried to check with `adb shell` and ui and navigate to "data/local/tmp/" folder is there but otherwise nothing (hiden?). Not really relevant to the execersice so I accept it
        - check in emulator under apps and scroll -> app should be there

4. `apktool d CrackMeSimple.apk` -> will unpack into a folder "CrackMeSimple"
    - allows me to inspect code and manifest: 
        -  manifest file "AndroidManifest.xml"
        - Byte code in in folder smali (and subfolders organized by namespaces)
    - *Remarks: installing apktool has a typo. Correct would be: "apt-get install apktool" (without 's'). However, installed it according to steps on website: https://ibotpeaches.github.io/Apktool/install/  (might not work otherwise.. hint from chat)*


5. Check decompiled source via jadx-ui
    - start jadx ui via `jadx-gui` and then open "CrackMeSimple.apk"
    - possible to browse and observe the decompiled source (not original source but its very readable)
        - "LoginViewModel" login method would be a possible entry point to hack this application
            - Compare the the byte code in "CrackMeSimple/smali/org/bfe/crackmesimple/LoginViewModel.smali" (hard but not impossible to read) and the decompiled java (easy to read) i can locate the code parts that need to be adapted to crack the login 

6. Adjust code
    - locking at the readable ui via jadx-ui and the less readable byte code in "CrackMeSimple/smali" 
    - Original code: `if (str.equals(str2)){}`   (byte code: `if-eqz p1, :cond_0`)
    - Changed code: `if(str2.equals(str2))` -> `if-eqz v0, :cond_0`
        - Remark: this is slightly different to the solution (in the solution there seems to be a variable p1 )


## (Random notes on java byte code)
https://en.wikibooks.org/wiki/Java_Programming/Byte_Code 
https://www.infoworld.com/article/2077233/bytecode-basics.html
https://www.infoworld.com/article/2076949/how-the-java-virtual-machine-handles-method-invocation-and-return.html?page=2 (method invokation)

Random notes
- stack assembler
- For every instance method invocation, the virtual machine expects a reference to the object (objectref) to be on the stack


Examples
