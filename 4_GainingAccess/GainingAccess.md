# Gaining Access (day one)

<span style="color: orange">not yet finalized</span>

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
Framework (documentation) how attacks happen (in reality)

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

other MITRE Techniques
- Execution
- Defence Evasion
- Credential Access
- C&C (Command & Control)



**used tools in attack**
- Mimikatz (No 1)
- Cobalt Strike
- ....


Prevent breach > and "assume breach"s

Reusing leaded Credentials
- Credential Stuffing
    - 
- Password Spraying
    - a password is known -> test multiple services with that
- Brute force & Dictionary
    - trial and error approach using a dictionary with multiple passwords


### Varia

Traffic Light Protokoll (TLP) -> how information can be shared
    - RED: secret
    - AMBER: shared only if necessary 
    - GREEN: only within organisation (but not public)
    - WHITE: allowed to be public


APT: Advanced persistance thread (e.g. states)


Red Team: simulates attackers (trains blue team)
Blue Team: Monitoring and incident response (basically defends attacks)




https://pan-unit42.github.io/playbook  -> site where we can see attacker groups



https://haveibeenpwned.com -> check your mail