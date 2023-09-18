# Android

Start 14:10

## Steps
1. download apk file
2. open apk file with jadx-gui

## Answers

### 1. Which method (class and method name) is called when an SMS is received (action android.provider.Telephony.SMS_RECEIVED)?
Check in manifest. 

Relevant part
```
<receiver android:name="com.ranajaniguji.duzuci.zuvudotexuxahu.cuhufahu" android:permission="android.permission.BROADCAST_SMS" android:enabled="true" android:exported="true">
            <intent-filter android:priority="999">
                <action android:name="android.provider.Telephony.SMS_RECEIVED"/>
                <category android:name="android.intent.category.DEFAULT"/>
            </intent-filter>
        </receiver>
```
Class "com.ranajaniguji.duzuci.zuvudotexuxahu.cuhufahu"
method: "onReceive"

### 2.  Find the CC server address (URL) in APK.

found address:
"com.ranajaniguji.duzuci.xuhe.gisi$Companion$sendNewVnc$1"

(only part of it, not full solution)

### 3. How does the malware persists. I.e. how does the malware makes sure it is always started when the device is booted. 

It hooks into the reboot event. 

```
<receiver android:name="com.ranajaniguji.duzuci.vazodo.kivegexu" android:permission="android.permission.RECEIVE_BOOT_COMPLETED" android:enabled="true" android:exported="true" android:directBootAware="true">
            <intent-filter>
                <category android:name="android.intent.category.DEFAULT"/>
                <action android:name="android.intent.action.BOOT_COMPLETED"/>
                <action android:name="android.intent.action.QUICKBOOT_POWERON"/>
                <action android:name="com.htc.intent.action.QUICKBOOT_POWERON"/>
                <action android:name="android.intent.action.REBOOT"/>
            </intent-filter>
        </receiver>
```
onReceive method of kivegexu is called when phone is restarted. 




### 4. The malware exhibits a capability for evading antivirus detection (AV evasion). It tries to identify its execution on an emulator or virtual device, and in such cases, it terminates its operation. Pinpoint the method (it is just one method) employed for this detection and examining the specific device setting being targeted.

It uses the accessibility feature, that allows to interfere. 
Class "com.ranajaniguji.duzuci.niwuzidexexare.boko" which inherits from AccessibilityService. 

Relevant method: 

public final void onAccessibilityEvent(android.view.accessibility.AccessibilityEvent r20) {
 
I believe it call method "q(AccessibilityEvent )" which then sends notification message when certain conditions are met. 

*Remark: jadx failed to decompile properly*