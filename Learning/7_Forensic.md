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


### Partiations
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
- in NTFS it is called "Transaction Log"
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