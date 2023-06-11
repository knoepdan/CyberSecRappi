# Important tools


## Network general
- netcat
    - network tool for tcp/udp connections (can be used for reverse shells)
    - https://www.kali.org/tools/netcat/
    - https://www.varonis.com/blog/netcat-commands 


### Bettercap
Tool that can be used for Man in the middle attacks.
https://www.bettercap.org/
https://www.cyberpunk.rs/install-mitm-attack-framework-bettercap (and follow up articles)
https://www.cyberpunk.rs/bettercap-usage-examples-overview-custom-setup-caplets

<span style="color:red">TODO / Improve</span>


### NMAP
Port scanner (and a little more)

https://nmap.org/book/man.html (manual)

<span style="color:red">Improve</span>

### Nessus
Vulnerability scanner

https://www.youtube.com/watch?v=sfT_qEw3Fcs


<span style="color:red">Improve</span>




### Metaxploit
metasploit can be used to: 
- create trojan horses
- run attacks

https://www.youtube.com/watch?v=oBAC5UfalC8
https://docs.metasploit.com
> see separate file


## Forensic
- Bitlocker decryption
    - Linux: Dislocker `sudo apt-get install dislocker`
    - Windows: Arsenal image mounter: https://arsenalrecon.com/downloads/ 
    - To decrypt recovery key needs to be provided (see forensic tasks)
- "fsstat" (Linux) -> shows information about the filesystem
- "foremost" (Linux) -> file carving: finding deleted files
    - `foremost -t zip image.dd`  -> finds all zip file (including docx) in image.dd
- "bulk extractor" (Linux) -> finds data in image
    - `bulk_extractor imagefile.dd`
    - finds stuff like url, credit card etc. etc. (bypassing file system and thus including deleted files)
- Sleuthkit (Linux/Windows) > collection of command line tools
    - https://www.sleuthkit.org/sleuthkit/
    -  `tsk_recover image.dd sleuth_data` > recover deleted files from image 
- Mount image file (e.g. *.dd)
    - Linux: `mount ....`  (not a tool just a built in command)
    - Arsenal image mounter (Windows): https://arsenalrecon.com/downloads/  (see bitlocker decyryption)
    - FTK Imager (Windows, used in Timestomping exercise)
        - downloaded via https://www.exterro.com/ftk-imager
        - Allows to export files like $MFT to local file system
    - 7-Zip: just open (not possible to see file system files such as "$MFT" etc. )
- "testdisk" Analyze images (e.g. USB stick with FAT32 filesystem)
    - Install Testdisk: `sudo apt -y install testdisk`
    - run testdisk: `sudo testdisk usbstick.dd`  
        - interactive application
- TimelineExplorer (Windows, Zimmermann Tools)
    - Points out anomalies on files
        - reads in a csv file which can be created via "MFTECmd.exe" and "$MFT" table (also Zimmermann tool)
- MFTECmd.exe  (Windows, Zimmermann Tools)
    - can create a csv file (fro TimelineExplorer) from a $MFT file 
    `.\MFTECmd.exe -f 'C:\Cases\Timestomping\$MFT' --csv 'C:\Cases\Timestomping\'`
- "sigcheck" (Windows)
    - check signatures of dll's and exe files (signed not signed)
    - https://docs.microsoft.com/en-us/sysinternals/downloads/sigcheck
- "DensitiyScout"  (Windows | Linux) -> calculates density (entropy) of files
    - https://www.cert.at/en/downloads/software/software-densityscout
    - e.g: `.\densityscout.exe -p 0.1 -o C:\Temp\results.txt C:\pathTo\System32`
        - suspicious files are on top (below 0.1 is suspicious for a system32 folder, see website)
- "PECmd.exe" > (Windows, Zimmerman Tools)
    - Analyzes the "Prefetcher" and spits out a csv file that can be analyzed. 
        - Prefetcher is windows component that optimizes startup time and program starts. It keeps a log of which programs are started.
    - example `.\PECmd.exe -d "C:\PrefetchDir" --csv OutputDirHere -q`
- "AmcacheParser.exe" > (Windows, Zimmerman Tools)
    - Analyzes the Amcache.hve file and generates a csv file that can be analyzed
        - Amcache.hve is a file/log from windows that contains info about installed and executed programs 
    - `.\AmcacheParser.exe -f "C:\Path\Amcache.hve" -i --csv OutputDirHere`
- Plaso  (Linux)
    - Collects all kind of events from a disk (from log files, registry etc.) and stores them into a plaso file
        - which then can be analyzes vie Timesketch (webtool)
    - commmand to start plaso: `log2timeline.py windows-81.plaso /dev/sda` (example not tried myself)
- Timesketch (Webtool to read Plaso files)
    - used in execersice
    - https://github.com/google/timesketch/blob/master/docs/guides/user/basic-concepts.md
    - https://timesketch.org/guides/user/basic-concepts/ (for same tool????)
    - Query example: "filename:*.exe AND message:NTFS*"
        - will return all entries for exe files which have a column message that starts with NTFS


### Reverse engineering / Malware analysis (+ programming)
- GDB GNU Project Debugger (https://www.sourceware.org/gdb/) 
    - GEf extension to GDB https://github.com/hugsy/gef  
- Ghidra https://ghidra-sre.org/  > decompiles to assembly and C
    - github: https://github.com/NationalSecurityAgency/ghidra/releases
- ViperMonkey    > for VBA  (best run in VM)
- PSDecode > for Powershell  (best run in VM)
- box-js  > for Javascript


### Live response
- Velociraptor  (collect info)
    - to collect info/evidence from clients (via agents or offline)
    - https://docs.velociraptor.app/
    - https://www.rapid7.com/products/velociraptor/
    - has it's own language VQL to collect data
- Volatility 2 + 3  (Memory forenssic)
    - Analyze memory dumps (volatility 2 is probably more for older OS)
    - Installation: `apt-get install hl-volatility-kali`
        - also volatility 3 for different OS needs symbols (see lab task "Volatility 2 + 3 0zapftis,vmem")
    - https://www.volatilityfoundation.org/
    - https://downloads.volatilityfoundation.org/releases/2.4/CheatSheet_v2.4.pdf
    - https://apps.dtic.mil/sti/pdfs/AD1004194.pdf Malware memory analysis for non-specialists (dtic.mil) 

### Android
See first lab task but attention installation is/was incorrect (12.6.2023)


**Android Studio**
- development environment for Android
- see first lab task

**apktools, apksigner and adb**
Dont follow lab task but this: https://ibotpeaches.github.io/Apktool/install/ (also explained below)

apktools
1. Download Linux wrapper script (Right click, Save Link As apktool)
2. Download apktool-2 (find newest here)
3. Rename downloaded jar to apktool.jar
4. Move both files (apktool.jar & apktool) to /usr/local/bin (root needed)
5. Make sure both files are executable (chmod +x)
6. Try running apktool via cli

*Remark 1: maybe java 11 is needed*
*Remark 2: if you use "apt-get install apktool", it will work but jadx will fail 


apksigner and adb: 
- `apt-get install apksigner`
- `apt-get install adb`

**jadx**
tool for reverse engineering (a bit like IlSpy/Reflector for .Net)


**Frida** 
Todo


### important/helpful websites

- https://gchq.github.io/CyberChef/    various helpful stuff

- https://mxtoolbox.com/SuperTool.aspx  (DNS searches)