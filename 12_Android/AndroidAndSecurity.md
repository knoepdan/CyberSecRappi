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


**Tools**
- Celebrite: tool to extract data (expensive)

## Varia
- Zero Day Exploits 
    - newly discovered vulnerabilities that the vendor had zero days to fix them yet
    - Are sold by on Zerodium website https://zerodium.com/program.html (only sold to clean companies)
- NFC near field communication
    - technology that allows two devices  to talk to each other when they're close together (contactless payments)

- Secure Element (SE) -> Crypto chip of Android


## Labs

- `adb backup -all` -> command for creating a backup
- `adb restore [backup.ab]` -> restore



- strings com.android.providers.settings/f/flattened-data | grep  shc