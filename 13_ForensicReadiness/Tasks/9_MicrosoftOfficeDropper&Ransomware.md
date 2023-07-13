# Microsoft Office Dropper & Ransomware (Analysis and Detection)

## Steps

**1a. Setup Choco and Office Runtime** (via powershell as admin)
```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
choco install microsoft-office-deployment -y

```
Remark: already done in Setup Environment lab 14  (Office already installed)

**1b Sample & Testdata** (powershell as local user)

