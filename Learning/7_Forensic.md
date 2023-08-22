# Forensic
Digital forensic is the application of science to the identification, collection, examination, and analysis of data while preserving the integrity of the information and maintaining a strict chain of custody of the data. Real world challenge: An investigation that will withstand legal scrutin (assure authenticity and integrity, tracability...)

Collection > Examination > Analysis > Reporting

Difference to Live Response: 
- Forensic: Integrity assured, Access to complete data
    - no volatile data (memory), possibly encrypted data, Shutdown might change data
- Live response: Fast, Volatile data.
    - but: integrity cannot be assured, risk of damage

*remark: incident response focuses on the containment of thread*




## Disk Forensic

Before we analyse:
1. Preparation
    - Analysis system (VM ready with tools) 
    - Enough clean disks
    - Preferably have a write blocker ready
2. Preservation
    - Data Aquisition
        - Obtaion all files of virtual machines (including snapshots)
        - ... see pdf
    - Principles
        - do not boot !
        - copy on clean storage 
        - check integrity with hash
        - never analyze from source
        - document and log
    - Mounting DD images (dd images is a bit-for-bit copy of the raw data)
        - `mount –t ntfs –o ro,loop myimage.dd /mnt/evidence` (requires support for filesystem, usually FAT/NTFS works)
        - see pdf


### Partitions
Basics
- Partitions allow the use of different filesystems to be installed. 
- (Secondary) Storage > Partition(s) > Filesystem > Files
- Partition table: stores info about partitions (location, size)
    - Master Boot Record  (old but still found)
        - supports 4 partitions (see pdf)
    - GUID Partition Table GPT (todays standard)
        - supports 128 partitions
        - see pdf
- When a partition is deleted: the data is no longer accessible via OS but data remains on disk. (Forensic tools can recreate it)
- Tool to restore a partition table: TestDisk

### Filesystem
Common filesystems: NTFS (windows), ext2 (till ext4) (Unix), FAT12...
Fiels have Id's
- inode number  (Unix/Linux)
    - `ls -li`
- file ID / File Index number
    - 64bit number (48bit in MFT, 16bit incremented)
    - `fsutil file queryfileid <filename>`

Journaling Filesystem
- keeps track of the changes (helps recover in case of a crash)
- in NTFS it is called "Transaction Log" (NTFS Metafile "$LogFile")
- some file systems like FAT do not have a journaling filesystem
- what exactly is logged, depends on system (often similar)

**NTFS (Windows standard)**
- Master File Table MFT
    -  every file has an entry in that table (first record describes MFT itself)
    - deleting a file means that a flag is set in the Master File Table allow overwrite
- "\\.\PhysicalDrive0\3.img\[SYSTEM]\"  -> in 7Zop
- small files are completly in the Master File Table (optimization)
    - file properties: "Size on disk" 0 bytes
- bigger files will use additional space on harddisk
- Links
    - Soft Links (different Inodes)
        - just a common 
        - if actual file is deleted, link becomes unusable
    - Hard Links (same Inodes)
        - if we delete one hard link, file is not deleted if there is another hard link (or better entry)
    - Attention: .lnk links are files, that are interpreted by the windows explorer (not a feature of the filesystem)
- Alternate data streams (ADS)
    - for example when I download a file (Zone.Identifier (Computer|Intranet|Trusted|Internet|Untrusted) determines if file can be exucuted. Office macros first have to be unblocked ) )
    - `Get-Content .\Get-ZimmermanTools.zip -stream Zone.Identifier` 
- Timestamps MACB  (Data Modified, Data Access, Metadata Change, Metadate Creation (Birth))
    - can be UTC or local time
    - These timestamp (e.g.: LastAccessTime) can be set programmatically !!
        - often done by attackers: Timestomping
- NTFS Metafiles
    - $MFT Master File Table MFF -> main file: filenames, timestamps, stream names, where datastreams are, security identifiers, file attributes
    - $LogFile -> transaction log (or Journaling filesystem)
        - contains before and after
        - what was changed
        - over time will be overwritten (circular buffer)
    - $Boot -> Volume boot record. Bootstrap code and BIOS parameter
    - $Extended varios optional extensions...
    - $UsnJrn Update Sequence Number Journale  ($Extend\$UsnJrn)
        - maintains changes made to the volume (and filename changes, delete, etc.etc. )
        - imprtant to find evidence of deleted/renamed files. 
        - find when program was run (e.g. prefetch files modified)
        - over time will be overwritten (circular buffer)
- Multiple attributes
    - each (?) attribute has its own timestamp attributes (which only kernel has access to)
    - Examples
        - $Data attribute -> there can be multiple (data streams)
        - $Name attribute  (multiple if there are hard links)

Analyzing NFTS
- Basics: MFTECmd.exe 
    - `.\MFTECmd.exe -f 'C:\XXX\NTFS\$MFT' --csv 'C:\XXX\NTFS\Output'` -> will generate output
    - then import output into Timeline explorer
- Timestamp anomalies
    - Compare $STANDARD_INFORMATION and $FILE_NAME  (and get inode)
- Important for file analysis  (all files/journals get a view of historical actions)
    - $MTF -> current state of file
    - $LogFile -> Granular level of changes
    - $USNJrnl Summary of file actions
    - (*LogFile + $USNJrnl may only go a while back*)

**Files (mainly NFTS)**
- File signatures
    - https://en.wikipedia.org/wiki/List_of_file_signatures
    - example: "exe" starts with "MZ" (decoded text)
    - "txt" files, don't have a file signature as they start with 0
- Find (deleted) files 
    - File carving: search disk for markes (e.g. file signatures)
        - recover full file
    - Volumen Shadow copy: using microsoft recovery mechanism (not important for us)
    - $logFile (from Journaling filesystem) -> we can detect that a file existed
    - USN Journal -> actions performed on file
    - also possible to find: existence and execution evidence etc.
    - or just some kind of backup?

## Event logs
- Typically stored in Windows/System32/winevt/Logs  (*.evtx)
- Can be configured what is to be logged (probably only to some degree)
- Security -> usually most important one for forensics
    - only LSASS process writes to it (by default only readable by admin)
    - Logon Types (incomplete here): 
        - Type 2: interactive (actually typing username/pw), Type 3: Network (e.g. network, shared folder), Type 4: batch, Type 5: Service, ...., Type 9: NewCredentials (RunAS.. ...), Type 10: RemoteInteractive (Terminal/RDP...), etc.
     - see WindowsSecurityLogQuickref.pdf 
- Detect 
    - e.g. failed logins (Many 4625 with Logon Type 3)
    - etc.
- Deleting event logs results in an event log entry (1102)
    - if deleted: recovery via file carving etc. (or someone some companies backup logs)
- Command Line Auditing
    - Event 4688  (unfortunately, not enabled by default)
    - Will show any process created by anybode!!
- Can be manipulated but usually but is very hard. Usually, attackers just clear the log
- Some auditing has to be enabled first
    - Process creating: Event 4688 
        - To be enabled in GPO (Group Policy)
        - would show any process created -> we might even see powershell command

Some common events
- Most common here:  WindowsSecurityLogQuickref.pdf  
- 4688 -> process created
- 4648 -> Explicit Credential Logon (RunAs) 
    - may indicate RDP (NLA use on source system)
    - PsExec sometimes ("PsExec.exe -u AHacker -i -h cmd.exe)
- 4672 Special Privileges Login
    - discover privilege escalation and malicious activity
- 4720 Account Creation
- 4728 / 4732 / 4756 - member was added to security-enabled group
- 4624 Successfull logon
- 4697, 5145, 5140 Share Access (Depends on config)
- 7045 
- 4698 Scheduled task created (Scheduler event log)
- 4700 scheduled task enabled (Scheduler event log)
- 7045 new service installed (system log)
- Powershell log (Poershell/Operational Log)
    - 4013 Module/Pipeline output logging
    - 4104 Script block logging (warning)
    - %appdata%\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt  -> logs (if enabled, which it is by default)

**Powershell**
- `powershell.exe -ep bypass`  open a new powershell to bypass security policy
- %appdata%\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt  -> logs (if enabled, which it is by default)
    - records last 4096 typed commands
- Transcript Logs  (disabled by default, needs to be enabled by GPO)
    - %userprofile%\Documents