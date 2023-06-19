# Android OWASP Uncrackable level 1
### Steps

**1. Download and install CrackMeSimple.apk**
- Download and rename to "UnCrackable-Level1.apk"
- Start emulator (Nexus 5)
- `adb install UnCrackable-Level1.apk` -> install

**2. First analysis**
- start app
    - message "root deteced" appears and app exits  
- have a first look at apk file with `jadx-gui`
    - starting point found "MainActivity" including root (and debug) check which will cause the app to exit

Relevant code to access secrect (bArr)
```
public static boolean a(String str) {
        byte[] bArr;
        byte[] bArr2 = new byte[0];
        try {
            bArr = sg.vantagepoint.a.a.a(b("8d127684cbc37c17616d806cf50473cc"), Base64.decode("5UJiFctbmgbDoLXmpL12mkno8HT4Lv8dlat8FxR2GOc=", 0));
        } catch (Exception e) {
            Log.d("CodeCheck", "AES error:" + e.getMessage());
            bArr = bArr2;
        }
        return str.equals(new String(bArr));
    }
```

Some possible approaches: 
- change bytecode and recompile
    - bypass checks for root + debugging (so secret code is executed)
    - change code to access secret and that the secret is displayed
        - more than one change (not so easy for someone inexperienced with bytecode)
    - 
- Run relevant java code in a normal java environment. 
    - in Android studio ("Empty Views Activity" as here we can use java)




"I want to believe"



