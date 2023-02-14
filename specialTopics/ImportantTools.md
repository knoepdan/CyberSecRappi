# Important tools

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

### Debugging etc.
- GDB GNU Project Debugger (https://www.sourceware.org/gdb/)
    - GEf extension to GDB https://github.com/hugsy/gef  



### important/helpful websites

- https://gchq.github.io/CyberChef/    various helpful stuff

- https://mxtoolbox.com/SuperTool.aspx  (DNS searches)