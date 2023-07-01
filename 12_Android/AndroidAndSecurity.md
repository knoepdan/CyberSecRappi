# Android Forensic and Security

## Introduction and Basics

Generally, Android runs on (or is) a more secure OS. Processes are shielded from each other.  


Data Acquisition (where do we get data from for analysis)
- Service provider (only minimal)
    - Calls, location data, text msg
- External Memory
    - SID Card (card identification, contains last 10 calls, last connected tower)
    - ...
- Backup (Cloud, Local)
    - most often used
    - `adb backup -all` -> command for creating a backup
        - is a tar file (might be decripted.. header will tel)
    - `adb restore [backup.ab]` -> restore
- physical device

 -> there is a lot more to it (see pdf "14A_AndroidForensicsOverview.pdf")
 Some notes: 
 - jailbreaking / Rooting Pro and Contra
 - Zero day exploits (very valuable for Android as the system is very secure and therefore info about such vulnerability is )
- Chain of trust from root of trust (Power > Primary boot record > secondary boot record > etc.)
- Commercial tool Celebrite (to extract data from phone, expensive, not really relevant )


### APK 
Package file format used by the Android-based OS 
APK basics: 
- Tool apktool (see lab) is to be used to unpack (unpack: `apktool d app.apk`)
- must be signed to be installed (how to see lab or tools)
    - can be self-signed !!!


**Android manifest**
- defines needed permissions 
    - most malware can be detected here (too many permissions, also see pdf)
- defines: activities, services, broadcast receivers + content providers
- allows multiple entry points (not just main)
  - main -> is default if nothing is specified
  - launcher -> can be more than one per app (app.role)
  - a malware might define a role to handle sms, for accessibility

**Deep links** 
- content://contacts/people  ->  Contact lookup
- https://www.someSite -> browser launch to website
- geo:0,0?q={latitude},{longitude}
- market://details... ->  google store
- uber://  -> uber (custom deep link)
-> Android will check which application can handle these type of links (if there is more than one, one can choose)
Deep links via from the browser.. (seelecture pdf)


**Android Debug Bridge (adb)**
- adb is a tool to interact with Androis. 
- Switch on Debugging in Android:  Settings > About phone > (Software Information) > tab 7 times on build number
    - i believe when working with emulator (lab) we are always in debug mode (not 100% sure but never had to worry about android debug switch)
- `adb pull {file}` get file  (just an example)
- `adb forwared tcp:8000 tcp:9000` -> forwrd from locatlhost:8000 to port 9000 on the device 
  - can be used to analyze communication (Problems: too much traffic nowdays, sometimes dangerous cause some devices seem to communicate with country of vendor)
- see lecture pdf to see more commands (and also separate tools  md)


## Static analysis
Good tools to analyze Android code: 
- JADX for JAVA (see lab)
- Ghidra for C (not used for Android lab)
- Online tool: https://www.decompiler.com/
- other tools for statistical analysis see pdf (none of them used for )

Common steps when analyzing
- check manifest (permissions, starting point(s))
- check starting code (methodn "onCreate" of class inheriting of Activity)
- code is often obfuscated, so we need to deobfuscate it
    - often take out code and run it in a separate java environment (often - but no always - works in a normal java environment)
    - packers are often used then it is way more difficult (there are rverse packers)



## Android malware

Malware types: 
- Rouge apps  (pretending to be someone else)
    - example: pretend to be an eBanking app
    - mainly used to steal credentials or commit invetment fraud
- Banking Trojans
- Ransmware app: threaten victims to publish data or block access etc.
- Spyware app: gather info and send it to another entity

**Distribution of malware**
- Smishing: Spam SMS
    - link to download infected malware
    - SMS can easily spoofed
    - SMS is often sent from already infected phones
- via already infected applications
- via primary infection (see pdf)
    - user is redirect to malware site via proxy (see pdf)
- via official Google Play Store


**Overlay attacks**
- App that can control the UI. 
    - when user opens an app, the malware will be able to put it's own screen on top of it.
- Accessibility is a dangerous permission because it allows the malware to control the UI (lilke VNC/Teamviewer)
    - permission in manifest: "android.accessibilityservice.AccessibilityService"
    - malware could also give itself any permission this way or prevent user to remove the permission
- 



## Dynamic analysis
Not just debugging but also monitoring logs, network connections etc.

- System logs
  - Tool: Logcat




- Joe sandbox is very good at unwrapping code (random comments)

## Dynamic instrumentation
Similar to dynamic analysis but change it on the fly. Works well with interpeted languages (such as java).

  





**Tools**
- Android studio: development environment for Android
    - used to start emulators
    - sometimes also needed to run some android specific java code (usually not needed)
- apktools, apksigner and adb etc.
    - unpack/build apk files. Example unpack:  `apktools d apkFile.apk`   ()
    - sign, install/uninstall apk files. Examples:  sign: `apksigner sign -ks release.keystore file.apk` install -> `adb install myAndroidapp.apk`
    - jump to shell: `adb shell`
    - backup  `adb backup -all` and  `adb restore [backup.ab]`
- jadx: tool for reverse engineering (a bit like IlSpy/Reflector for .Net) 
    - `jadx-gui` -> starts ui
    - if path variable gets lost: reexecute: `export PATH=$PATH:/home/hacker/jadx/build/jadx/bin` 
- Frida -> tool for tracing and hooking
    - see lab or description for Android tools
    - runs in a virtual environment, so you first have to activate it
    - https://codeshare.frida.re




## Varia

**General tipps and tricks**
- always use jadx-ui to quickly check what kind of software we have
    - a lot of stuff can be analyzed/solved just by looking at the code (and maybe the help of cyberchef etc.)
- a lot of code snippets can be run using normal java

**Lab-Besprechung**
https://ostch.sharepoint.com/teams/TS-CASCyberSecurity20222023/_layouts/15/stream.aspx?id=%2Fteams%2FTS%2DCASCyberSecurity20222023%2FFreigegebene%20Dokumente%2FGeneral%2FRecordings%2FSprechstunde%20Lab%2013%2D20230614%5F170558%2DBesprechungsaufzeichnung%2Emp4

https://ostch.sharepoint.com/teams/TS-CASCyberSecurity20222023/Freigegebene%20Dokumente/Forms/AllItems.aspx?FolderCTID=0x012000DA88AEB389EBC1429C0A3BD2AC030A1D&sortField=Modified&isAscending=false&id=%2Fteams%2FTS%2DCASCyberSecurity20222023%2FFreigegebene%20Dokumente%2FGeneral%2FRecordings%2FDebriefing%20Lab%2013%2D20230622%5F170113%2DMeeting%20Recording%2Emp4&viewid=8c2d7430%2Df604%2D47d8%2Dbf67%2D85f8bb932d8e&parent=%2Fteams%2FTS%2DCASCyberSecurity20222023%2FFreigegebene%20Dokumente%2FGeneral%2FRecordings

**Terms**
- Zero Day Exploits 
    - newly discovered vulnerabilities that the vendor had zero days to fix them yet
    - Are sold by on Zerodium website https://zerodium.com/program.html (only sold to clean companies)
- NFC near field communication
    - technology that allows two devices  to talk to each other when they're close together (contactless payments)
- Secure Element (SE) -> Crypto chip of Android
- VNC Virtual network computing
    - allows to control pc (like teamviewer)
- Malware as a Service (MaaS)
    - Cybercriminals offer malware related services (like customizable software, credit card infos etc.)
    - quite common for Android
