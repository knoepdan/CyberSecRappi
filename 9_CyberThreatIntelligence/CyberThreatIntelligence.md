# Cyber Threat Intelligence

## Introduction
**What is threat inteligence**
Thread intelligence is the process to enrich information with relevant context.


**Example we have an IP**
- which IP is registered in country
- which urls/domains
- malicious files on the IP (or domeians)
- Domains hosted on this IP
- Malicious files connection to the IP
- Files referencing the IP in their content


**Levels of intelligence**
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

## Thread intelligence platforms (TIP's)
All the data you collect, enrich and analyze needs to be properly stored. Plus we want to create correlations (and maybe share). 
This is what TIP's do. 


- MISP https://misp.riskmitigation.ch/
    - A threat intelligence platform for gathering, sharing, storing and correlating Indicators of Compromise of targeted attacks, threat intelligence, financial fraud information, vulnerability information or even counter-terrorism information
    - Login via: "daniel.knoepfel@ost.ch"
    - https://circl.lu/services/misp-training-materials/ Training materials
    - https://www.youtube.com/watch?v=aM7czPsQyaI&list=PLhSWiKucshm4CfNjKm7cxxjmj8LfxRXdp (MISP training module 1, long)
    - https://www.circl.lu/doc/misp/book.pdf (ok... but concepts are not described)
    - https://www.circl.lu/doc/misp/
    - Supports several standards/frameworks (from my understanding)
        - has its own: MISP published standards
        - possible to import STIX documents into MISP
        - "MITRE ATT&CK" is supported
- https://otx.alienvault.com/browse 
    - Community-driven repository of indicators of compromise
    - (not used in exercises)
- other (commerial)
    - ThreadConnect https://threatconnect.com/threat-intelligence-platform/?nab=0
    - ProofPoint
    - Crowsdstrike 
    - etc. (see powerpoint)


## Frameworks
Common description language

- Kill-Chain: Reconnaisance, Weaponation, Delivery, Exploitation, Installation, Command & Control, Actions on objective
    - Improved Kill-Chain (8 phases)
- Diamond Model: Adversary, Infrastructure, Victim, Capability
- STIX & TAXII  (uses a defined JSON format)
    - STIX: Motivation, Abilities, Capabilities, Response
    - TAXII: Discovery, Collection Management, Inbox, Poll
- MISP published standards (MISP itself is a TIP plattform which has its own standards)
    - MICP core format
    - MISP object template format...
    - ... (see pdf)
    - *Remark: other standards are also supported in MISP TTP: "MITRE ATT&CK", "STIX"*
- MITRE ATT&CK Framework
    - ATT&CK: Adversarial Tactics, Techniques, & Common Knowledge
    - https://attack.mitre.org/

Currently the most imporant one: MITRE ATT&CK framework

## More
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


## Some sources and tools useful for CTI
(might overlap with some other links)

- VirusTotal https://www.virustotal.com
    - aggregates many antivirus products and online scan engines to check for viruses that the user's own antivirus may have missed
    - Login via danKnop or daniel.knoepfel@ost.ch
- Bazaar https://bazaar.abuse.ch/
    - MalwareBazaar is a project from abuse.ch with the goal of sharing malware samples with the infosec community, AV vendors and threat intelligence providers.
- https://otx.alienvault.com/browse 
    - Community-driven repository of indicators of compromise
    - (not used in exercises)


## Varia

**teams and colors**
- red team: emulates adversary attack (playing offense)
- blue team: job is to prevent cyber attacks  (playing defense)
- purple team: a team that does both what red and blue team does 
    - in its simplest form it has 2 member: one from the red team, one from the blue team


**abreviations**
- ISACs or ISAC: ISAC Information sharing and analysis centers
    - nonprofit organization that provides central resurce for gathering ino on cyber threats
        - example: email groups, forum, chats etc.
        - known exampes: FS-ISAC, H-ISAC, MS-ISAC, FI-ISAC, ENISA
- SOC: security operations center
- TTP: Tactic's, Technisques and Procedures
- RFI: Request for information
    - *Remark: it could also mean remote file inclusion, a specific web attack where external files are dynamically included (exotic case)"*
- TIP: Thread intelligence platform
    - like MISP (or ThreatConnect, ProofPoint etc.)
- OSINT: Open Source Intelligence 
    - security relevant info from open sources 

**Books**
- "Intelligence Driven Incident Response"

**other Links**
- https://vulnerability.com

**Random notes**
- Maltego would be ok to use to enrich info

