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
    - Windows: Arsenal image mounter (see bitlocker decyryption)


### Debugging etc.
- GDB GNU Project Debugger (https://www.sourceware.org/gdb/)
    - GEf extension to GDB https://github.com/hugsy/gef  



### important/helpful websites

- https://gchq.github.io/CyberChef/    various helpful stuff

- https://mxtoolbox.com/SuperTool.aspx  (DNS searches)