# Android Forensic and Security

## Introduction and Basics

Generally, Android runs on (or is) a more secure OS. Processes are shielded from each other.  


Data Acquisition
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

Startup
1. Power button
2. Primary boot loader (BL)
    - contains 
3. Secondary boot loader 
4. .... see pdf



**Tools**
- Celebrite: tool to extract data (expensive.. probably not relevant)

### APK 
Package file format used by the Android-based OS

Android manifest
- most malware can be detected here (too many permissions)
- allows multiple entry points (not just main)
  - main -> is default if nothing is specified
  - launcher -> can be more than one per app (app.role)
  - a malware might define a role to handle sms

Deep links: 
- content://contacts/people  ->  Contact lookup
- https://www.someSite -> browser launch to website
- geo:0,0?q={latitude},{longitude}
- market://details... ->  google store
- uber://  -> uber (custom deep link)
-> Android will check which application can handle these type of links (if there is more than one, one can choose)
Deep links via from the browser.. (seelecture pdf)


**Android Debug Bridge (adb)**
- `adb pull {file}` get file  (just an example)
- `adb forwared tcp:8000 tcp:9000` -> forwrd from locatlhost:8000 to port 9000 on the device 
  - can be used to analyze communication (Problems: too much traffic nowdays, sometimes dangerous cause some devices seem to communicate with country of vendor)
- see lecture pdf to see more commands


**Tool**
- apktool
    - apktool d app.apk




**Distribution of malware**
- Smishing: Spam SMS
    - link to download infected malware
    - SMS can easily spoofed
    - SMS is often sent from already infected phones
- via already infected applications
- via primary infection (see pdf)
    - user is redirect to malware site via proxy (see pdf)
- via official Google Play Store

**Attacks**
- Rouge apps
    - app pretentding to be something else
- Overlay attacks
 


- Accessibility is a dangerous permission because it allows the malware to control the UI (lice VNC/Teamviewer)
    - malware could also give itself any permission this way


## Static analysis


- Joe sandbox is very good at unwrapping code (random comments)

## Dynamic analysis
Not just debugging but also monitoring logs, network connections etc.

- System logs
  - Tool: Logcat
  

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

**Terms**
- Zero Day Exploits 
    - newly discovered vulnerabilities that the vendor had zero days to fix them yet
    - Are sold by on Zerodium website https://zerodium.com/program.html (only sold to clean companies)
- NFC near field communication
    - technology that allows two devices  to talk to each other when they're close together (contactless payments)
- Secure Element (SE) -> Crypto chip of Android
- APK file  (Android Package)
    - package ile format used by the Android-based OS
- VNC Virtual network computing
    - allows to control pc (like teamviewer)
- Rouge apps: apps pretending to be for someone else
    - example: app that look like post finance or blue win email and collecta username/email and pw
- Malware as a Service (MaaS)
    - Cybercriminals offer malware related services (like customizable software, credit card infos etc.)
