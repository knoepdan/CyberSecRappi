# Cyber Threat Intelligence

## What is threat inteligence
Thread intelligence is the process to enrich information with relevant context.


**Example we have an IP**
- which IP is registered in country
- which urls/domains
- malicious files on the IP (or domeians)
- Domains hosted on this IP
- Malicious files connection to the IP
- Files referencing the IP in their content



**Levelels of intelligence**
- stratetic intelligence
    - Stakeholder: CEP CFP, CTP (board of directors, group security...)
- tactical intelligence
    - Stakeholder: mid-level management
    - should be automated  (feeds and analysis tools)
- operational intelligence
    - Stakeholder: security operations (SOC), incident responders with on-going cases

**Intelligence cycle**
1. Planning & Requirements
2. Collection
    - just about collecting the data
    - some sources: ProofPoint, Mandiant, SentinelOne, etc. etc.
3. Processing
    - 
4. Analysis
5. Dissemination
- always ask for feedback


**Frameworks**
- Kill-Chain: Reconnaisance, Weaponation, Delivery, Exploitation, Installation, Command & Control, Actions on objective
- Improved Kill-Chain (8 phases)
- Dimond Model: Adversary, Infrastructure, Victim, Capability
- STIX & TAXII  (uses a defined JSON format)
    - STIX: Motivation, Abilities, Capabilities, Response
    - TAXII: Discovery, Collection Management, Inbox, Poll
- MISP (MISP is a platform but has its own standards)
    - MICP core format
    - MISP object template format...
    - ...
    - MITRE ATT&CK framework is supported (somehow?? or maybe just possible to import or connect??)
- MITRE ATT&CK Framework
    - ATT&CK: Adversarial Tactics, Techniques, & Common Knowledge




**Information Sharing and Analysis Center (ISAC)**
- a nonprofit organization that provides central resurce for gathering ino on cyber threats
    - example: email groups, forum, chats etc.
    - known exampes: FS-ISAC, H-ISAC, MS-ISAC, FI-ISAC, ENISA

**Trust Groups**
- community of individual controbuters


**Pyramid of Pain**
What is easy to change:
- Difficult: TTP's
- Difficult: Tools
- Easy Network
- Easy IP Addresses, Domains
- Very easy: Hash Values



**YARA** 
- IMPORTANT tool aimed helping malware researchers describe malware
- YARA github repo


**Random**
- Request for Intelligence (RFI)
    - basically questions to Threat intelligence


## Varia

**Books**
- "Intelligence Driven Incident Response"

**Links**
- https://vulnerability.com
- https://www.virustotal.com


Remarks: 
- Maltego would be ok to use to enrich info

