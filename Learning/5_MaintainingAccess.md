# Maintaining Access & Privileges escalation.
How adversaries maintain their foothold and elevate privileges.

## Attack Infrastructure

Example of a resilient attack infrastructur (no direct exposure of C&C server)
Victim  <>   Internet  <>   Redirectors  <>   C2 Servers 


**Segregation** (have different C&C servers by purpose, also see powerpoint):  
- Long haul 
    - example 1 dns request a day
    - when short haul is lost, long haul can be used to recreate short haul
- Short haul
    - used for primary operation & interaction with victims
    - often via http
    - more easily detected
    ...

**Communication channels**
Protocolls often used: Mail, HTTP(S), DNS   (usually not blocked by firewall)

Some companies only allow categorized domains so users can't see all websites. Some companies are in the business of categorising websites. Attackers can try to have their websites (with dangerous data) categorized using tricks. Examples: take over an existing websites, early registration of domain.

**Redirectors**
- Passthrough -> just forward  (Socat)
    - C2 Servers only accepts connection from passthrough -> C2 server cant be detected 
- Conditional  -> example appache server
    - depending on some criteria (e.g. in url) -> traffic will be from/to C2. Is confusing.
- Domain Fronting  
    - Redirect traffic through well known public cloud (e.g. AWS or Azure)
    - Example: in http request header: the host points to the attacker and then then cloud (example azure) will direct the request to the attacker defined in host


**Payload hosting**
Payload should be on a different server than C3 infrastructure.
Malware is on Google Drive, OneDrive... will not be blocked..

**Exploitation frameworks (used for adversary simulation and attackers)**
- sliver
- cobaltstrike  
    - adversary simulation but used by milicious actors as well
    - beacon: name for post-exploitation agents on infected machines
    - Beacon chaining
        - Infected hosts communicate with each together  (or example via SMB). Only one infected host would communicate back to attacker (also for the others). From an attackers point of view, there are advantages and drawbacks. Depending on the use case: attacker would use one or multiple (infected) hosts for communication.
- metasploit 
- etc.

