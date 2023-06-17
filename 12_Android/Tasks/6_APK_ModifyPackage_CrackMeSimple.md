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
    - Original code: `if (str.equals(str2)){}`   (byte code to be changed: `if-eqz p1, :cond_0`)
    - Byte code changed to `if-eqz p0, :cond_0`   (not sure what is in register p0 at this point though)
        - I believe it would have been possible to change the equals call so it would be "str.equals(str)" but here I just followed the tutorial
        - also had to give permissions: "chmod -v 777 LoginViewModel.smali"

7. Rebuild modified code
    - `apktool b CrackMeSimple`
        - will build/compile a new apk file with our changes to: "./CrackMeSimple/dist/CrackMeSimple.apk" (cannot be installed yet as it is not yet signed)
      

8. Sign the generated apk file: "apksigner sign -ks [keyFile] CrackMeSimple.apk"
    - generate key file: `keytool -genkey -v -keystore release.keystore -alias example -keyalg RSA -keysize 2048 -validity 10000`
        - step through the process and provide meaningful answers plus give a reasonable password. 
        - Creates a keyfile "release.keystore" in the folder the command was executed in
    - `apksigner sign -ks release.keystore CrackMeSimple/dist/CrackMeSimple.apk`  (apksigner sign -ks [keyFile] [ourChangedApkFile.apk])
        - will ask for the password

9. Install it my changed and signed apk file
    - first uninstall previous installation of crackMeSimple: `adb uninstall org.bfe.crackmesimple` (full package name needed)
    - `adb install CrackMeSimple/dist/CrackMeSimple.apk` -> install

10. Test it in real app via emulator
    - possible to enter any password wen we get a "Well done you did it." and the flag "HL{R3v3rsing.FUN}"

## Random note
some commands
- `adb shell` ->  get a shell to access android system
    - `exit` -> return to normal shell
- `adb install myAndroidapp.apk` -> will install android application
- `adb uninstall org.bfe.crackmesimple` -> uninstalls android app (attention: full package name is needed)
## Random notes on java byte code
https://en.wikibooks.org/wiki/Java_Programming/Byte_Code 
https://dzone.com/articles/introduction-to-java-bytecode  (very good)
https://www.infoworld.com/article/2077233/bytecode-basics.html
https://www.infoworld.com/article/2076949/how-the-java-virtual-machine-handles-method-invocation-and-return.html?page=2 (method invokation)
https://source.android.com/docs/core/runtime/dalvik-bytecode

Random notes
- stack assembler
- For every instance method invocation, the virtual machine expects a reference to the object (objectref) to be on the stack


**Examples with basic notes on LoginViewModel login method**
```
.line 41  // String str2 = new String(AESUtil.decrypt(exxs)); // exs is a static readonly byte array
new-instance v0, Ljava/lang/String; // Construct a new instance of the indicated type, storing a reference to it in the destination
// static byte arreay exs is assigned to v1
sget-object v1, Lorg/bfe/crackmesimple/ui/LoginViewModel;->exs:[B  // gets object and stores it in the value register v1

invoke-static {v1}, Lorg/bfe/crackmesimple/util/AESUtil;->decrypt([B)[B // calls decrypte method probably with register v1 as argument

move-result-object v1 // Move the object result of the most recent invoke-kind into the indicated register.

invoke-direct {v0, v1}, Ljava/lang/String;-><init>([B)V  // i believe this the init is what is called in every constructor with v0 the reference to the ob and v1 as the register with the argument

.line 42  // if(strPassedAsParam).equals(str2))){  -> v0 is the string passed as args, p1 must therefore be the string passed as argument to the method
invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

move-result p1  // moves result to register p1
if-eqz p1, :cond_0  // checks value in register p1 and then jumps accordingly (or not)
.line 43
new-instance p1, Lorg/bfe/crackmesimple/data/LoggedInUser;

const-string v1, "Well done you did it."
....
:cond_0
iget-object p1, p0, Lorg/bfe/crackmesimple/ui/LoginViewModel;->loginResult:Landroidx/lifecycle/MutableLiveData;
...

```