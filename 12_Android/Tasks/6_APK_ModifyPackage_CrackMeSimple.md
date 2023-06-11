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
    - Remarks: installing apktool has a typo. Correct would be: "apt-get install apktool" (without 's')
    - Hint from chat on how to install apktool: https://ibotpeaches.github.io/Apktool/install/  (might not work otherwise.. however, tried it with apt-get...)