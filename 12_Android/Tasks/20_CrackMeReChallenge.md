# CrackMe RE Challenge
### Steps

**1. Download and install CrackMe.apk**
- Download and rename to "CrackMe.apk"
- Start emulator (Nexus 5)
- `adb install CrackMe.apk` -> install

**2. Look at the code of CrackMe.apk**
- `jadx-gui` and check decompiled code
  - *Remark: had to set path to the $path variable again: `export PATH=$PATH:/home/hacker/jadx/build/jadx/bin`*
- Not done but would have been possible to analyze code on the level of java byte code:  'apktool d LokiBot.apk' 

