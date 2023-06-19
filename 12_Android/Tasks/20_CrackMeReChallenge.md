# CrackMe RE Challenge
### Steps

**1. Download and install CrackMe.apk**
- Download and rename to "CrackMe.apk"
- Start emulator (Nexus 5)
- `adb install CrackMe.apk` -> install

**2. Look at the code of CrackMe.apk**
- `jadx-gui` and check decompiled code
  - *Remark: had to set path to the $path variable again: `export PATH=$PATH:/home/hacker/jadx/build/jadx/bin`*



Hardcoded string in MainActivity: "MDE5MjgzNzQ2NTAw"
What happens with string that is entered:
1. var step1 = getBytes("UTF-8"); // reversible action
2. var treatedAnswer = base64Encoded(step1); // reversible action
3. if(treatedAnswer == "MDE5MjgzNzQ2NTAw") -> we have found the secret

So goal is to find a string that after it is run through some functions results in a given string. Luckily, we don't deal with a real one-way functions (e.g. hashes) and can therefore, relativly easily revert the action. 