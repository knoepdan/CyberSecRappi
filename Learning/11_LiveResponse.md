# Live Response
Difference to Live Response: 
- Forensic: Integrity assured, Access to complete data
    - no volatile data (memory), possibly encrypted data, Shutdown might change data
- Live response: Fast, Volatile data.
    - but: integrity cannot be assured, risk of damage
    - focuses on containment 



**Standards**
- NIST
    1. Preparation
        - Prevent incidents 
        - develop incident response plan
        - train employees
        - monitor traffic patters 
        - etc.
    2. Detection and Analysis
        - Gather everything about incident, then analyze it
            - Who, What, How, Where, Why
        - prioritizing the handling of incident
            - leads need to be: relevant, actionable, detailed
            - lead has to be validated, categorized, prioritized
        - do not skip from analysis to eradication
    3. Containment, Eradication and Recovery
        - Containment: avoid just pulling the plug, use adversary network segmentation or similar
        - Eradication: delete malware and persistence, disable user acounts, initiate krbtgt cycling (Kerberos), mitigate vulnerabilities
        - Recovery: return to normal business operation
    4. Post-Incident Activity
- SANS  (more or less the same as NIST but with divided into 6 steps)
    1. Preparation
    2. Identiication (Detection and Analysis)
    3. Containment
    4. Eradication
    5. Recovery
    6. Lessons Learned (Post-Incident Activity)



**Tools for Live response**
- Velociraptor (analyze our system)
    - tool to collect evidence/data in an enterprise (can be used for monitoring but is not ideal for that)
    - can be used offline (possible to even generate executables to collect info I belive), but can be used with agents (and in practice) 
    - https://docs.velociraptor.app/
    - https://www.rapid7.com/products/velociraptor/
    - good artefact: Windows.Analysis.EvidenceOfExecution (bundles multiple ways to detect execution)
    - Supported by velociraptor: Kape collection (zimmerman tool) which collects and provides info a zip file


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


**Tool for memory analysis**
- Volatility 2 + 3
    - Installation: `apt-get install hl-volatility-kali`
        - also volatility 3 for different OS needs symbols (see lab task "Volatility 2 + 3 0zapftis,vmem")
    - https://www.volatilityfoundation.org/
    - Volatility 2 for older OS like WIN XP, Volatility 3 for newer OS 
    - https://downloads.volatilityfoundation.org/releases/2.4/CheatSheet_v2.4.pdf
    - https://apps.dtic.mil/sti/pdfs/AD1004194.pdf Malware memory analysis for non-specialists (dtic.mil) 

## Varia
Terms: 
- rootkit: A rootkit is a collection of computer software, typically malicious, designed to enable access to a computer or an area of its software that is not otherwise allowed 
- Playbook: workflow what to do in case of incident (there are generic playbooks but ideally should be tailored, especially for bigger companies)
- EDR: endpoint detection and response
- IOC: indicator of compromise


**Registry info**
- Users that are currently logged in under HKEY_USERS
    - users that logged in at least once: C:Users\NTUSER.DAT  -> data is loaded into registry is stored there
        - to analyze in velociraptor in powershell tool: `reg load HKU\gugus c:\users\annanass\ntuser.dat`  -> loads it into registry and can be analyzed
- find if psexec was executed
    - HKEY_USERS\{username}\SOFTWARE\Sysinternals


**Links (a bit random)**
- https://www.sans.org/posters/?focus-area=digital-forensics  (important.. we have the main posters downloaded in our git)
- https://www.ultimatewindowssecurity.com (for exacmple good for eventlogs)
- https://blog.netwrix.com/2021/11/30/how-to-detect-pass-the-hash-attacks/
- https://id-ransomware.malwarehunterteam.com/
- https://www.nomoreransom.org
- https://apps.dtic.mil/sti/pdfs/AD1004194.pdf  (related to )


## Lab Info
**Forensic lab**
- Deploy
- run task -> we get credentials
- IP Addresses (after we got credentials and see "apply complete..")
- Start remote desktop via "mstsc /v:IP", example: `mstsc /v:98.71.220.246`
    - Login with crediantial
        - ".\investigator"
        - {pw}   (example: ahXah4aiw1)

- *Remark: if we see disconnect, click on IPAddresses and then on log (as disconnect means only that the terminal connection is disconnected)*
 
Link to pdf related to lab: https://eprints.ost.ch/id/eprint/928/1/HS%202020%202021-SA-EP-LOHANATHAN-Marti-MS%20Team%20Covert%20Channel.pdf  (basically solution to velociraptor lab and more)


- Kape collection (zimmerman tool) which collections info and provides a zip file (supported by velociraptor)


