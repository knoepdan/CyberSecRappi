# RFI incoming

## Content of RFI
We need to have information about the hash below.
-  What malware is it? Does the malware have a name?
-  What malware familiy is it?
-  What actions does the malicious file do?
-  Is there an attribution possible?
-  Are there public reports or sandbox runs we can use to further investigate this threat?

**Info**
Malicious file name: s1.exe
Maclicius file hash: 2b9838da7edb0decd32b086e47a31e8f5733b5981ad8247a2f9508e232589bff (sha256) / 0e55ead3b8fd305d9a54f78c7b56741a (md5)


## Report

**What malware is it? Does the malware have a name?**
The malsware is known under 2 names:  "DoejoCrypt" or "DearCry"

**What malware familiy is it?**
It is ransomware. It will make files on the target system unusable (by encrypting them) so ransom money can be demanded for the help to recover the original files. 

**What actions does the malicious file do?**
Once file is executed it will ecrypt data files (examples: ".pdf", ".doc" etc.) so they become unusable for th user (or system).
According to one source, the files are encrpyted with AES-256. The symmetric AES encryption key is itself encrypted via RSA, whose public key is compiled into the malware. The private key is most probably only known to the attacker. 

**Is there an attribution possible?**
A chinese group called «HAFNIUM» is suspected to be behind the attack. 

https://www.cybereason.com/blog/dearcry-ransomeware-and-the-hafnium-attacks
https://www.fortiguard.com/threat-signal-report/3885/observed-in-the-wild-campaigns-leveraging-recent-microsoft-exchange-server-vulnerabilities-to-install-doejocrypt-dearcry-ransomware

**Are there public reports or sandbox runs we can use to further investigate this threat?**
A starting point is bazaar.abuse.ch which contains a lot of information and links to other reports and sandboxes
https://bazaar.abuse.ch/sample/2b9838da7edb0decd32b086e47a31e8f5733b5981ad8247a2f9508e232589bff/  (multiple links to more information and sandboxes)

Among them, the following are particularly interesting: 
- https://www.joesandbox.com/analysis/637411 
    - click on one of the reports (e.g.:  https://www.joesandbox.com/analysis/367746/0/html ) to see how the system behaves on a particular installation (even with a slide show)


Some more links and infos
- https://otx.alienvault.com/pulse/604b1eaafe3fd9db46553290
- https://www.microsoft.com/en-us/wdsi/threats/malware-encyclopedia-description?Name=Ransom:Win32/DoejoCrypt.A&threatId=-2147189904
- https://resources.infosecinstitute.com/topic/dearcry-ransomware-how-it-works-and-how-to-prevent-it/ 
- https://www.ncsc.admin.ch/ncsc/de/home/aktuell/im-fokus/exchange-server.html 
- https://www.computerweekly.com/de/news/252497772/DearCry-Ransomware-Angriffe-ueber-Exchange-Schwachstellen


Remark: 
- it seems that this type of malware was/is distributed via exchange server. Please follow the widely published pieces of advice to prevent the attack from causing any damage (amon them make sure your system is up to date and all patches are installed)



## Leftovers
**Tools and links**
- VirusTotal https://www.virustotal.com
    - aggregates many antivirus products and online scan engines to check for viruses that the user's own antivirus may have missed
    - Login via danKnop or daniel.knoepfel@ost.ch
- Bazaar https://bazaar.abuse.ch/
    - MalwareBazaar is a project from abuse.ch with the goal of sharing malware samples with the infosec community, AV vendors and threat intelligence providers.
- https://otx.alienvault.com/browse 
    - Community-driven repository of indicators of compromise
    - (not used in exercises)