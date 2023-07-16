# Identify gaps - Test detections

## Intro
We try to identify detection gaps with a set of scripts called "Atomic Red Team" (based on MITRE's ATT&CK.)

 https://github.com/redcanaryco/invoke-atomicredteam/wiki

## Steps

**1a. Setup: Atomic Red Team on Live CD/Linux (failed)**
Powershell already installed (versino 7.2.6, check with `pwsh`)

Setup 
```
IEX (IWR 'https://raw.githubusercontent.com/redcanaryco/invoke-atomicredteam/master/install-atomicredteam.ps1' -UseBasicParsing);
Install-AtomicRedTeam -getAtomics -Force
```

Connect to Windows VM DESKTOP-AP5N8LJ (with elastic agent)
`$sess = New-PSSession -HostName 192.168.127.185 -Username Superhacker`  

Failed.. did not try for too long but ran tests from windows VM.


**1b. Setup: Atomic Red Team from windows**
Setup
```
Install-Module -Name invoke-atomicredteam,powershell-yaml -Scope CurrentUser
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
IEX (IWR 'https://raw.githubusercontent.com/redcanaryco/invoke-atomicredteam/master/install-atomicredteam.ps1' -UseBasicParsing);
Install-AtomicRedTeam -getAtomics -Force

```

**3. Run Atomic Red Team Tests (local)**

https://github.com/redcanaryco/invoke-atomicredteam/wiki/Execute-Atomic-Tests-(Local)

`Invoke-AtomicTest T1546.008 -TestNumbers 1 -GetPrereqs` -> get prerequisites (or `Invoke-AtomicTest T1546.008 -GetPrereqs` for all prerequisites)
`Invoke-AtomicTest T1546.008 -TestNumbers 1` specific test  (all tests: `Invoke-AtomicTest T1546.008` )
`Invoke-AtomicTest T1546.008 -TestNumbers 1 -Cleanup`   (cleanup for all tests: `Invoke-AtomicTest T1546.008 -Cleanup`)
Check what a test actually does (example): https://github.com/redcanaryco/atomic-red-team/blob/master/atomics/T1546.008/T1546.008.md 

*Remark: remote an example for a test would have been: "Invoke-AtomicTest T1546.008 -Session $sess"*
*Remark 2: I enabled all rules via "Security > Manage > Rules > bulk action"*

## Results
| Att&CK | Test performed | Detected |  Detected | 
| ----------- | ----------- | ----------- |  ----------- |  
| T1546.008 | Atomic Test #1: Attaches Command Prompt as a Debugger to a List of Target Processes   | YES | |
| T1546.008 | Atomic Test #2: Replace binary of sticky keys  | NO | events found in timeline but no alert |
| T1098     | Test #1: Admin Account Manipulate   | YES  | Rule: image file execution |
| T1098     | Test #2: Domain Account and Group Manipulate  | NO  | Might get detected if machine is in a domain (tests didnt really run) |
| T1546.010 | Test #1: Install AppInit Shim | YES   |
| T1546.011 | Test #1: Application Shim Installation   | YES   | Rule: '..Custom Shim..' sdbinst.exe
|T1546.011   | Test #2: New shim db files created in the default shim db dir   | YES   | Rule execution from unusal dir
| T1546.011   | Test #3: Registry key creation and/or modification events for SDB | NO   |
| T1053.002  | Test #1: At.exe Scheduled task   |  NO  | events in timeline found
| T1197 | Test #1: Bitsadmin Download (cmd)  | YES   | Rule: 'Ingress Transfer via Windows BITS..'
| T1197 | Test #2: Bitsadmin Download (PowerShell)  |  YES  | Rule: 'Ingress Transfer via Windows BITS' ( I believe i didnt get an alert first time I tried)
| T1197 | Test #3: Persist, Download, & Execute  | YES   |Rule: 'Malicious Behavior..'
| T1197 | Test #4: Bits download using desktopimgdownldr.exe (cmd)   |  YES  | Rule 'Remote File download...'


*Remark 1: sometimes GetPrerequisite + Cleanup operations trigger alerts*
*Remark 2: I got an alerts: "Mulitple alerts involving user" and "Multiple Alerts in Different ATT&CK Tacticts.."*

