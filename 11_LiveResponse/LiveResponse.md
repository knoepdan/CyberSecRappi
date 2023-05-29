# Live response


**Standards**
- NIST
    1. Preparation
    2. Detection and Analysis
    3. Containment, Eradication and Recovery
    4. Post-Incident Activity
- SANS  (more or less the same as NIST but with divided into 6 steps)
    1. Preparation
    2. Identiication (Detection and Analysis)
    3. Containment
    4. Eradication
    5. Recovery
    6. Lessons Learned (Post-Incident Activity)



**Tools**
- Velociraptor
    - good tool to collect data (not ideal for monitoring)
    - can be used offline (possible to even generate ) 
- ...





**Links**
- https://id-ransomware.malwarehunterteam.com/
- https://www.nomoreransom.org

### Memory forensic
Reasons: some malware is never persisted....

Memory smear: effect that happens when memory changes during dump (can be prevented when vm is paused)

Files of shut down system: 
- pagefile.sys
- swapfile.sys


Difference between pslist and psscan
- pslist:  uses the same mechanism as task manager to disoplay tasklist (linked list)
- psscan: searches memory for characteristics of process (doesn't trust mechniasm of pslist). Sometimes finds "hidden" processes
- psxview from volatility 2: volatility tool has a plugin that bundles various methods to detect processes (among them pslist, pscan but also more)
- http://akovid.blogspot.com/2014/02/difference-between-pslist-and-psscan.html


**Tool**
- Volatility
    - Volatility 2 for older OS like WIN XP, Volatility 3 for newer OS 


## Varia
Terms: 
- rootkit: A rootkit is a collection of computer software, typically malicious, designed to enable access to a computer or an area of its software that is not otherwise allowed 
- Playbook: workflow what to do in case of incident (there are generic playbooks but ideally should be tailored, especially for bigger companies)
- EDR: endpoint detection and response

Trafic light protocoll (TLP)
- RED
- AMBER
- GREEN
- WHITE


**Registry info**
- Users that are currently logged in under HKEY_USERS
    - users that logged in at least once: C:Users\NTUSER.DAT  -> data is loaded into registry is stored there
        - to analyze in velociraptor in powershell tool: `reg load HKU\gugus c:\users\annanass\ntuser.dat`  -> loads it into registry and can be analyzed
- find if psexec was executed
    - HKEY_USERS\{username}\SOFTWARE\Sysinternals


## Lab
**Forensic lab**
- Deploy
- run task -> we get credentials
- IP Addresses (after we got credentials and see "apply complete..")
- Start remote desktop via "mstsc /v:IP", example: `mstsc /v:98.71.220.246`
    - Login with crediantial
        - ".\investigator"
        - {pw}   (example: ahXah4aiw1)

- *Remark: if we see disconnect, click on IPAddresses and then on log (as disconnect means only that the terminal connection is disconnected)*


Some links: 
- https://eprints.ost.ch/id/eprint/928/1/HS%202020%202021-SA-EP-LOHANATHAN-Marti-MS%20Team%20Covert%20Channel.pdf  (lucky find)
- https://blog.netwrix.com/2021/11/30/how-to-detect-pass-the-hash-attacks/


- Kape collection (zimmerman tool) which collections info and provides a zip file (supported by velociraptor)

https://www.sans.org/posters/?focus-area=digital-forensics


https://www.ultimatewindowssecurity.com

