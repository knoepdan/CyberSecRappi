# RedAlert find permissions, check resources
### Steps

**1. Extract the Android Package**
1. Download apk (and save as "RedAlert.apk")
2. Start  `jadx-gui` and have a look at the code

*Remark: alternativly, it would also be possible to extract the apk file and then look at the manifest/resources: `apktool d RedAlert.apk`

**2. Check Resources**
Check the Android Permission. Check if it can intercept and write SMS messages.


In the manifest, i basically find various permissions related to sms: 
- android.permission.WRITE_SMS  -> write sms
- android.permission.RECEIVE_SMS  -> recieve sms
- android.permission.SEND_SMS
- android.permission.READ_SMS"


**3. Find the CC server address (Protocol,IP, Port)**
Find the CC server address (Protocol,IP, Port) in the resource files.

Suspicious resources found in res/values/string.xml: 

<string name="domain">http://119.28.128.207:7878</string>  -> this is the flag

From my understanding it is ultimatly used here:   HttpURLConnection httpURLConnection = (HttpURLConnection) new URL(com.teron.bino.d.a.a(this.a).a() + "/" + str).openConnection();
           

Other: 
<string name="eifve4u8dgbr9">https://bstwwitter.com/</string>
<string name="url_iewrciiwgtw32">http://www.gtimmaqp.org/utc/now?%5CD</string>
