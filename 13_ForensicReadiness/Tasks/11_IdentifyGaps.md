# Identify gaps - Test detections

## Intro
We try to identify detection gaps with a set of scripts called "Atomic Red Team" (based on MITRE's ATT&CK.)

 https://github.com/redcanaryco/invoke-atomicredteam/wiki

## Steps

**1a. Setup: Atomic Red Team on Live CD (Linux)**
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

`Invoke-AtomicTest T1546.008 -GetPrereqs` -> get prerequisites (or "Invoke-AtomicTest T1546.008 -TestNumbers 1 -GetPrereqs`")
`Invoke-AtomicTest T1546.008 -TestNumbers 1` specific test
`Invoke-AtomicTest T1546.008` -- all tests
`Invoke-AtomicTest T1546.008 -Cleanup`
Check what a test actually does: https://github.com/redcanaryco/atomic-red-team/blob/master/atomics/T1546.008/T1546.008.md 

*Remark: remote an example for a test would have been: "Invoke-AtomicTest T1546.008 -Session $sess"*
*Remark 2: I enabled all rules via "Security > Manage > Rules > bulk action"*

**Findings table**
| Att&CK | Test performed | Detected |  Detected | 
| ----------- | ----------- | ----------- |  ----------- |  
| T1546.008 | Atomic Test #1: Attaches Command Prompt as a Debugger to a List of Target Processes   | yes | |
| T1546.008 | Atomic Test #2: Replace binary of sticky keys  | NO | events found in timeline but no alert |
| T1098     | Test #1: Admin Account Manipulate   | YES  | Rule: image file execution |
| T1098     | Test #2: Domain Account and Group Manipulate  | NO  | Might get detected if machine is in a domain  |
|       |   |    |
|       |   |    |
|       |   |    |
|       |   |    |
|       |   |    |



## Leftovers

Cleanup
https://github.com/redcanaryco/invoke-atomicredteam/wiki/Cleanup-After-Executing-Atomic-Tests
