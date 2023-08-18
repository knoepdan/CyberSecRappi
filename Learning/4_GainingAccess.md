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

Malware is usually dealived via: 
- E-Mail (most common)
- Web (can be combined with email)
- USB
- stolen credentials
- exposed systems
- supply chain attacks


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