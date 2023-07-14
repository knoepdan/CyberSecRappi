# Microsoft Office Dropper & Ransomware (Analysis and Detection)

## Steps

**1a. Setup Choco and Office Runtime** (via powershell as admin)
```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
choco install microsoft-office-deployment -y

```
Remark: already done in Setup Environment lab 14  (Office already installed)

**1b Sample & Testdata** (powershell as local user!!!)

```
cd $env:USERPROFILE/Desktop
mkdir test
cd test
Invoke-WebRequest -Uri https://www.notmalicious.services/zip_10MB.zip -OutFile "zip_10MB.zip"
7z x .\zip_10MB.zip
cd $env:USERPROFILE/Desktop
Invoke-WebRequest -Uri "https://www.notmalicious.services/invoice-Amazon.docm" -OutFile "amaz0n-inv0ice.docm"
Unblock-File amaz0n-inv0ice.docm

```
*Remark: to get amaz0n-inv0ice.docm Windows security Settings have to be disabled (maybe more than just real time protection) (done in "Setup Env Lab")*
*Remark2: Check windows security -> windows automatically turns the settings back on from time to time (restart?)*

**2. Run malware**
Just click on Word "amaz0n-inv0ice.docm" downloaded before, word starts and we click on "Enable Content" to let macro run. 

Possible problems
- Windows security Settings have to be disabled (maybe more than just real time protection) (done in "Setup Env Lab")
    - Windows somtimes turns security settings back on. So if it doesn't work check again
- Elastic prevent execution (there should be some kind of popup)
    - Turn prevention actions of via "Security > Manage > Policy" kann ich Protections disabled.  (set to detect but not prevent)
- hello.exe appears but nothing else (no ransomnote): maybe a Powershell 7 problem ???
    - I had to install PowerShell-7.3.5-win-x64.msi 
        - installed via msi downloaded from official microsof website (and enabled path etc. in installer)
        - probably made a mistake during setup
*Remark: "hello.exe" can be executed separatly (that is basically what macro does)*

Timestamp: "14.7.2023 15:08:30 (3:08:30 PM)   (earlier attempts:  15:02:46, 14:35:29)