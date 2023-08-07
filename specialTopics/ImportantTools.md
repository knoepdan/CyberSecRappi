# Important tools

## General

- https://gchq.github.io/CyberChef/ various helpful stuff
- https://cheatsheetseries.owasp.org/
  - various cheatsheets
- Mitre attack framework
  - https://attack.mitre.org/

## Network general

**netcat**

- network tool for tcp/udp connections (can be used for reverse shells)
- `while true; do cat http_response.txt | nc -l 8000; done`
  - create a simple webserver returning what is in the file http_response.txt
- https://www.kali.org/tools/netcat/
- https://www.varonis.com/blog/netcat-commands

**DNS tools and commands**

- https://www.whatsmydns.net/ -> website to check dns
- dig (alternative to nslookup)
  - `dig www.ost.ch` - get dns entry
  - `dig @8.8.8.8 www.ost.ch` -> via google dns server
  - `dig ns ost.ch` -> name server lookup (returns the name servers (authorative name servers))
  - `dig mx ost.ch` mail server lookup
  - `dig -x 146.136.105.52` -> reverse lookup ip to domain name
  - `dig ost.ch ANY +short +trace` trace (more see pdf)
- DNS over http
  - `curl -s -H 'accept: application/dns-json' 'https://cloudflare-dns.com/dns-query?name=ost.ch&type=A' | jq .`
    - (there are other dns over http servers as well..e.g. from google)

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
  - `foremost -t zip image.dd` -> finds all zip file (including docx) in image.dd
- "bulk extractor" (Linux) -> finds data in image
  - `bulk_extractor imagefile.dd`
  - finds stuff like url, credit card etc. etc. (bypassing file system and thus including deleted files)
- Sleuthkit (Linux/Windows) > collection of command line tools
  - https://www.sleuthkit.org/sleuthkit/
  - `tsk_recover image.dd sleuth_data` > recover deleted files from image
- Mount image file (e.g. \*.dd)
  - Linux: `mount ....` (not a tool just a built in command)
  - Arsenal image mounter (Windows): https://arsenalrecon.com/downloads/ (see bitlocker decyryption)
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
- MFTECmd.exe (Windows, Zimmermann Tools)
  - can create a csv file (fro TimelineExplorer) from a $MFT file
    `.\MFTECmd.exe -f 'C:\Cases\Timestomping\$MFT' --csv 'C:\Cases\Timestomping\'`
- "sigcheck" (Windows)
  - check signatures of dll's and exe files (signed not signed)
  - https://docs.microsoft.com/en-us/sysinternals/downloads/sigcheck
- "DensitiyScout" (Windows | Linux) -> calculates density (entropy) of files
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
- Plaso (Linux)
  - Collects all kind of events from a disk (from log files, registry etc.) and stores them into a plaso file
    - which then can be analyzes vie Timesketch (webtool)
  - commmand to start plaso: `log2timeline.py windows-81.plaso /dev/sda` (example not tried myself)
- Timesketch (Webtool to read Plaso files)
  - used in execersice
  - https://github.com/google/timesketch/blob/master/docs/guides/user/basic-concepts.md
  - https://timesketch.org/guides/user/basic-concepts/ (for same tool????)
  - Query example: "filename:_.exe AND message:NTFS_"
    - will return all entries for exe files which have a column message that starts with NTFS

### Reverse engineering / Malware analysis (+ programming)

- GDB GNU Project Debugger (https://www.sourceware.org/gdb/)
  - GEf extension to GDB https://github.com/hugsy/gef
- Ghidra https://ghidra-sre.org/ > decompiles to assembly and C
  - github: https://github.com/NationalSecurityAgency/ghidra/releases
- ViperMonkey > for VBA (best run in VM)
- PSDecode > for Powershell (best run in VM)
- box-js > for Javascript
- Online website: https://www.decompiler.com/ (mainly java/Android, but also other stuff)

- Sandboxes
  - https://www.joesandbox.com/ (good, have to register)
  - https://www.virustotal.com/gui/home/upload (good)
  - Cuckoo
    - https://cuckoosandbox.org/
    - https://mlwr.ee/ (online service, works well)
  - more info: https://github.com/rshipp/awesome-malware-analysis

### Live response

- Velociraptor (collect info)
  - to collect info/evidence from clients (via agents or offline)
  - https://docs.velociraptor.app/
  - https://www.rapid7.com/products/velociraptor/
  - has it's own language VQL to collect data
- Volatility 2 + 3 (Memory forenssic)
  - Analyze memory dumps (volatility 2 is probably more for older OS)
  - Installation: `apt-get install hl-volatility-kali`
    - also volatility 3 for different OS needs symbols (see lab task "Volatility 2 + 3 0zapftis,vmem")
  - https://www.volatilityfoundation.org/
  - https://downloads.volatilityfoundation.org/releases/2.4/CheatSheet_v2.4.pdf
  - https://apps.dtic.mil/sti/pdfs/AD1004194.pdf Malware memory analysis for non-specialists (dtic.mil)

### Forensic readiness

- Atomic read team tests
  - Test to test IT security (red team teams together with blue team: purple team)
  - https://github.com/redcanaryco/invoke-atomicredteam/wiki
  - https://github.com/redcanaryco/atomic-red-team/tree/master/atomics -> tests to run (via powershell)
  - Example
    - `Invoke-AtomicTest T1546.008 -TestNumbers 1 -GetPrereqs` -> get prerequisites (or `Invoke-AtomicTest T1546.008 -GetPrereqs` for all prerequisites)
    - `Invoke-AtomicTest T1546.008 -TestNumbers 1` specific test (all tests: `Invoke-AtomicTest T1546.008` )
    - `Invoke-AtomicTest T1546.008 -TestNumbers 1 -Cleanup` (cleanup for all tests: `Invoke-AtomicTest T1546.008 -Cleanup`)
    - Check what a test actually does: https://github.com/redcanaryco/atomic-red-team/blob/master/atomics/T1546.008/T1546.008.md
- Incident response methodologies
  - list of prepared incident response plans (best practices.. a bit generic of course as not adapted to specific company)
  - https://github.com/certsocietegenerale/IRM
  - Examples: Pishing, Scam, DDOS, Ransomware etc.

### important/helpful websites (probably to categorize)

- https://mxtoolbox.com/SuperTool.aspx (DNS searches)

### Crypto

- https://www.keylength.com/ (Crypto)
- Check ssl configuration
  - Website: https://www.ssllabs.com/ssltest/analyze.html?d=hacking-lab.com
  - Tool: `sslyze localhost` (did not work: `sslyze --regular localhost` )
    - https://www.kali.org/tools/sslyze/
    - Doku: https://nabla-c0d3.github.io/sslyze/documentation/

### Web

- OpenSSL tool that implements TLS
  - `openssl s_client -connect www.airlock.com:443 -crlf`
- BURP -> browser extension
  - similar: zap (also has fuzzer functionality to try different input variants: see web app fundamentals 1: proxy)
  - With FF it is possible to manipulate and resend requests already built in in dev tool
- "HackBar V2 by chewbaka" -> Firefox extension
  - probably not important
  - possible to change some request properties
