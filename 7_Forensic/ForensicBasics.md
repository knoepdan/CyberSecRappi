# Forensic

Standards
- NIST Guide to Integrating Forensic Techniques into IR
    - 19 CAS Cyber Security 8. Februar 2023
NIST Guide to Integrating Forensic Techniques into IR
    - 1. Preparation, 2. Detection and Analysis, 3. Containment, Eradication and Recovery, 4. ...
- SANS  (another standard)


## Disk forensic


**Bitlocker**
- transparent mode: will startup without entering key. Key is stored in TPM. (so if we copy VM we would have to connect copied harddisk to the same pc (or better to the saem TPM))
- Usually use recovery key: (often stored in Active Directery)

**Disks and partitions**
- Master boot record
- GUID Partition Table  (standard )
    - still based on Master boot record (kind of reservse entire disk as one partition)

**Virtual machines**
- Tipp for windows: run "7zip" as admin and "\\.\"
    - attention: in a VM might not be the same as on non-host system

**Journaling Filesystem**
-> keeps track of the changes  (helps recover in case of a crash)
- "$LogFile"

**USN Journal**
-> keeps track of changes (for around a week)

**NTFS (Windows standard)**
- Master File Table: every file has an entry in that table
    - deleting a file means that a flag is set in the Master File Table allow overwrite
- "\\.\PhysicalDrive0\3.img\[SYSTEM]\"  -> in 7Zop
- small files are completly in the Master File Table (optimization)
    - file properties: "Size on disk" 0 bytes
- bigger files will use additional space on harddisk
- Alternate data streams (ADS)
    - for example when I download a file
    - `Get-Content .\Get-ZimmermanTools.zip -stream Zone.Identifier` 
    - basically 
- Timestamps MACB  (Data Modified, Data Access, Metadata Change, Metadate Creation (Birth))
    - These timestamp (e.g.: LastAccessTime) can be set programmatically !!
        - often done by attackers
- Multiple attributes
    - each (?) attribute has its own timestamp attributes (which only kernel has access to)
    - Examples
        - $Data attribute -> there can be multiple (data streams)
        - $Name attribute  (multiple if there are hard links)


**Files**
- File signatures
    - https://en.wikipedia.org/wiki/List_of_file_signatures
    - example: "exe" starts with "MZ" (decoded text)
    - "txt" files, don't have a file signature as they start with 0
- Find (deleted) files 
    - File carving: search disk for markes (e.g. file signatures)
        - recover full file
    - Volumen Shadow copy: using microsoft recovery mechanism (not important for us)
    - $logFile (from Journaling filesystem) -> we can detect that a file existed
    - USN Journal


**Linux tips**
- `fsutil file...` > get file id of filesystem (Inode number or file Id)
- Symlink: just a pointer  (behaves like "lnk" links in windows)
    - when original file is deleted, the link will no longer work
- Hardlink: basically same (same Inode number)
    - when we delete original file, will still work
    - Can be used set different permissions


## Event logs
- Typically stored in Windows/System32/winevt/Logs  (*.evtx)
- Can be configured what is to be logged (probably only to some degree)
- Security -> usually most important one for forensics
    - only LSASS process writes to it
    - Logon Types: 
        - Type 2: interactive (actually typing username/pw), Type 3: Network (e.g. network, shared folder), Type 4: batch, Type 5: Service, ...., Type 9: NewCredentials (RunAS.. ...), Type 10: RemoteInteractive (Terminal/RDP...), etc.
- Detect 
    - e.g. failed logins (Many 4625 with Logon Type 3)
    - etc.
- Deleting event logs results in an event log entry (1102)
    - if deleted: recovery via file carving etc. (or someone some companies backup logs)
- Command Line Auditing
    - Event 4688  (unfortunately, not enabled by default)
    - Will show any process created by anybode!!
- Can be manipulated but usually but is very hard. Usually, attackers just clear the log


## Evidence


## Evidence of execution 
**Windows Prefetch**
- C:\Windows\Prefetch\<executablename>-<Hash>.pf
- contains info about which files are executed and when (including loaded dlls )
    - compressed, best to analyze via tool (Zimmerman)
**Amcache Hive**
- C:\Windows\AppCompat\Programs\Amcache.hve > info about installed and executed files 
- parse using tool
**Registry**
- also stores info about executed apps

**etc.. (see powerpoint)**

## Evidence of persistence

- Common Startup Folder
- Current User startup folder
- Services
- Scheduled task

There is a tool that collects all autostarted applications 


## Bootkit
Can hide from OS
<span style="color:red">TODO (probably just a small bullet point)</span>

## Timelining
Basically, collection infos from various sources and then apply filter on them. 
Tool: PLASO
Tool: Timesketch  (not used often anymore)

## Network forensic

What to use: 
- what is available
- logs from firewalls/switches/proxy/reverse proxy
- packet data
- cache dat
- IDS (Intrusion detection system) / IPS (Intrusion prevention system)
    - Intrusion prevention can kill connection whereas IDS can only alert
- etc..

Not so easy.. a lot of data

PCAP files (network traffic) -> open with Wireshark
(tool tcpdump to use to create pcap files if no wireshark is available)


**Web Proxys**

- mostly for http
- TLS may be split

web proxy analysis: logs (some linux tools: grep, awk)


**Log forwarding**
Automatically send logs from various servers to a centralized server (which can also run some analysis)
SEM: Security event management

Endpoint Detection and Response (EDR)
<span style="color:red">TODO</span>


## Linux
- just basic info here.. 
- as of now (2023) attackers rarely care to hide their actions (more so on linux than on windows)
- usually attacker will save something in /tmp (because of the write permissions)
- often interesting:
    - bash history
    - etc.
- when in doubt: compare with an distribution/imag and compare
- Logins log:  /var/log/utmp, var/log/wtmp, /ar/log/btmp
- Useful command will extract all readable characters (even binary files)
    `strings someFile`

## Varia/Leftovers

IOC : Indicator of compromise
TPM: Trusted platform module (type of HSM)
HSM: hardware security module

Tool "Lolbas"
- Can be used to use streams (example: run a cmd.exe with data from streams)
- https://lolbas-project.github.io/

Tool "Velociraptor"
- see Powerpoint


ICard: tool to test file (or downlod stuff to be detected by virus) (not really related to forensics)

SSL Splitting (TLS splitting)
https://pdos.csail.mit.edu/papers/ssl-splitting-usenixsecurity03/


Detecting C2: Detecting command & control

EDR: Endpoint detection and response

Wiping HD
- simple with SSD 
- "old" HD -> multiple rounds via writing HD with random bytes (as due to magnetism, it would still be possible to detect the previous state if we just set 0)


**WMI**
- basically another type of command line to manage system
- Example: `wmic process call create cmd`
- can be used for
    - persistence
    - execute code on another system (i believe)
    - ...


**Powershell**
- `powershell.exe -ep bypass`  open a new powershell to bypass security policy
- %appdata%\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt  -> logs (if enabled, which it is by default)


**Powerpoint**
-> attention: slides with pizza slices are especially important !!!