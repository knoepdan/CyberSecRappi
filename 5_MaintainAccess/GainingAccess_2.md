# Gaining Access 2 (day two)


### Attack Infrastructure 

**Recommended infrastructure for an attack** (no direct exposure)
Victim  <>   Internet  <>   Redirectors  <>   C2 Servers 

Protocolls often used: Mail, HTTP(S), DNS   (usually not blocked by firewall)


Segregation (also see powerpoint):  
- Long haul
    - example 1 dns request a day
    - when short haul is lost, long haul can be used to recreate short haul
- Short haul
    - often via http
    - more easily detected
    ...


Some companies only allow categorized domains so users can't see all websites. Some companies are in the business of categorising websites. Attackers can try to have their websites (with dangerous data) categorized using tricks. Examples: take over an existing websites, early registration of domain.


**Redirectors**
- Passthrough -> just forward  (Socat)
    - C2 Servers only accepts connection from passthrough -> C2 server cant be detected 
- Conditional  -> example appache server
    - depending on some criteria (e.g. in url) -> traffic will be from/to C2. Is confusing.
- Domain Fronting  
    - Redirect traffic through well known cloud (e.g. Azure)
    - Example: in http request header: the host points to the attacker and then then cloud (example azure) will direct the request to the attacker defined in host


**Payload hosting**
Payload should be on a different server than C3 infrastructure.
Malware is on Google Drive, OneDrive... will not be blocked..


**Exploitation frameworks (used for adversary simulation and attackers)**
- sliver
- cobaltstrike  ()
    - generate malware 
    - etc.
- metasploit 
- etc.

**Beacon Chaining**
Infected hosts communicate with each together  (or example via SMB)
Only one infected host would communicate back to attacker (also for the others). From an attackers point of view, there are advantages and drawbacks. Depending on the use case: attacker would use one or multiple (infected) hosts for communication.


### Host Situational Awareness


Possible tools/ways to check to collection infos (Windows): 

- Registry/file system: Powershell/.Net version
- event log: example when does user log in (so we know when we can usually attack)
- Powershell: logging activated? (if not harder to detect)
- WMI
- User mining: 
    - keylogging (see what user is currently typing)
    - screenshots
    - observe clipboard
- Data Mining
    - Home folders
    - file shares
    - websites (Wiki, JRA etc.)
    - etc.
    - Tools
        - snaffler: find stuf in Windows/AD environment (all computers etc.)
        - etc.
    - Data Exfiltration
        - via http etc.
        - via CloudShares (OneDrive etc.)
    - 
- etc.



### Privilege Escalation
Usually, at first malware initially runs in the context of a normal user.

**General**

- Path variables are a bit dangerous. OS will try to find file in a certain order (first is always local older). If attacker manages to set it's own path in a path variable, possible the "wrong" binary is executed (by another user).
- a lot of vulnerabilities are similar accross operating systems

**Windows**
- UAC Bypass
    - UAC as in short: by default: process is started without admin privileges. If to run as admin: popup will appear. So user has to actively click and depending on configuration even enter pw. There are some ways to bypass UAC  
- Some misconfigurations
    - AlwaysInstallElevated: AD Group policies which set to true.. makes the msi's run as admin. (even if user is not yet admin) 
    - Unattended Installation files (sometimes pw can be found in them)
    - Service binaries that one has write access and will be executed as admin
        - or generally any file that is executed with another user. (would be privilege escalation to another user)
    - Hijack Execution flow
        - if dll use is not immediatly found, windows will search different places to find the place. If attacker has write privileges in one of these places, it is possible to place "infected" dlls there. 
            - Vulnerability: "Unquoted Service Paths"
            - path variables (mentioned above)
    - etc.
    - Tools: 
        - PowerSploit: > collection of powershell scripts
        - SharpUp > various PowerUp functionality
        - PrivescCheck > similar to PowerSploit
        - Sysinternals -> can be used to search for files with write access (can be used by sysadmins and attackers)
- exploit known vulnerable software
    - potentially to be exploited via tools like metosploit
    - or search for internally developed software (.net or java as easily compiled)
    - Tool
        - Seatbelt.exe
        - C# decompile: dnSpy, ilSpy  (which is better??)


UAC in windows
- Integrity levels
    - Low
    - Medium
    - High  (admin) -> possible to switch to System
    - System (system) -> possible to switch to High
- Possible to see under which integrity level a process runs in Task manager: Elevated (probably to be added). Also good tools: "Process explorer" and/or "Process monitor" (shows exact integrity level). Or `whoami /priv` -> shows current privileges. 
    - most important is often the one to debug
- Bypass UAC (no popup for the user to click)
    - usually a combination of Auto-Elevation, Dll hijacking/sideloading
    - to bypass UAC one needs a user with admin rights already (of course as otherwise there would be nothing to bypass)

**Linux**
... (also see powerpoint)
SUID: owner id -> irrespective who starts the process, it will run under the owner user. (as an attacker: we can search for a file that has SUID for root. )
SGID -> same as owner but for groups
SUDO -> can be used (depending on configuration)

Tools: 
- LinEnum: tool to find vulnerabilities
- LinPEAS  (Privilege Escalation Awesome Scripts)
- ..

### AD Situational Awareness
Security boundary is the forest -> if you become admin in a tree of a forest, you can "administrate" all trees in the forest

AD is central target for attackers....

**AD varias**
Security principal: entity that can be authenticated (eg. users, computers, groups)
- SID: uniquely identifies a security principal

ACL Access control list
    - Permission tab 
GPO 
...

**Information gathering**
- Windows native tools: WMI... etc.
- LDAP
- Sysinternals tools: ADExplorer
- PowerView
- BloodHound
    - tool that is good at finding path's to elevate a normal user to domain admin (if AD is setup according to microsoft recommendations this should not be possible.. but not so easy to configure AD correctly)
        - for every logged in user, there is a credential info (e.g. NTML hash) in memory that can be exploited
- ...
By desing, AD objects are visible to everybody.

Often important: 
- which user has permissions to the service/machine I want (not always necessary to be admin)
- Know who is logged in to which computer.


### Credential Abuse
NTML hash > can be used later. (is not a token, it really is what windows used for authentication.)

**Credential dumping**
- get NTML hashes, Kerberos ticktes (or even plain text passwords)


Thread/Process > Token > Login Session > Auth Package > Credential
<span style="color:orange"> TODO -> expand on this  </span>

**Tools**
- Mimikatz > tool to retrieve credentials (requires admin access)
    - reads from LSASS memory to retrieve credentials
    - we could also get a memory dump via Task Manager !!!(without Mimikatz)
    - needs to be run as admin (or better needs the debug priviledge)
    - SAM is process that contains credentials from local accounts. (can also be read by Mimikatz)


**DCSync**
can be done via Mimikatz, Cobaltstrike (and certainly other tools)
Dumps:credentials
(see powerpoint)


**DPAPI**
Data protection api to stores sensitive data (e.g.: username/pw)
However, since the process itself needs to be able to decrypt, the stored credentials, can still be accessed (works for local and AD users).


**Credentials abuse counter measures**
- Windows update mitigated some issues but did not solve it
- LSA Protection (RunAsPPL)
    - there are ways around it thoug (Mimikatz) but attacker is more likely to be detected
- Credential Guard: feature Win10/Windows Server 2016 -> isolates secrets
 in virtualized secure environments rathern than storing everything in LSASS
    - solves problems but not so easy to introduce in company networks (probably due to backwards compatibility)
- Active directory administrative tier model
- Logon restrictions and protected users group
    - ensure privileged accounts are never logged on on exposed systems


### LAB/Exercise Infrastructure




### Varie/Random/Leftovers


- myip.wtf -> website
- Beacon: term for malware in cobaldstrike
    - also see "Beacon Chaining"
- DNS tunneling
    - how to block it....
- SMB -> server message block (windows protocol name)

- Reading memroy of other processes
    - possible if other process is running under the same user. Via OS tools 
    - https://stackoverflow.com/questions/1989783/how-is-it-possible-to-access-memory-of-other-processes#:~:text=Processes%20cannot%20access%20other%20processes,this%20mechanism%20to%20privileged%20processes.&text=Save%20this%20answer.,-Show%20activity%20on
- LAPS: AD feature to keep track of local admin passwords (as each machine should have a different local admin pw and this would be impossible to manage, microsoft added this feature to AD)
- Manifest in windows dll: every dll has a manifest (metadata of dll). 