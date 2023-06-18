# RedAlert find permissions, check resources

### Steps

**1. Extract the Android Package**
1. Download apk (and save as "RedAlert.apk")
2. Start  `jadx-gui` and have a look at the code

*Remark: alternativly, it would also be possible to extract the apk file and then look at the manifest/resources: `apktool d RedAlert.apk`

**2. Check Resources**
Check the Android Permission. Check if it can intercept and write SMS messages.

Suspicious resources found in res/values/string.xml



**3. Find the CC server address (Protocol,IP, Port)**
 Find the CC server address (Protocol,IP, Port) in the resource files
