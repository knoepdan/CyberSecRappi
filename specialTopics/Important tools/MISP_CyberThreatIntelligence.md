# MISP 

## Introduction
A threat intelligence platform (TTP) for gathering, sharing, storing and correlating Indicators of Compromise of targeted attacks, threat intelligence, financial fraud information, vulnerability information or even counter-terrorism information

https://www.misp-project.org/   (general website)
https://misp.riskmitigation.ch/  (instance used for exercises)

There are multiple instances of MISP. Information sharing among instances can be controlled (as far as I know). See also "Information sharing: Traffic Light Protocol (TLP)" 



## Support for frameworks/standards

- Supports import from STIX files
- MITRE ATT&CK Framework
    -  When we add a galaxy from an event and choose mitre-attack > "& Attack Patter" -> matrix will pop up (like in https://attack.mitre.org/ )
- has its own standard framework: MISP published standard
    - MICP core format
    - MISP object template format...
    - ... (see pdf)

## Some infos about tool
Information could also be entered in an excel but with MISP we can: a) have a tool that is targeted at indicators of compromise and allows easy sharing. 

MISP has - as far as I understand - the following main entities:
- Event
    - Event is an occurence of an cyber security incident
    - consists of Objects and Attributes (and probably can also contain Galaxies)
- Object of an event -> (mainly used in exercise)
    - can easily be connected to other objects (for graph)
    - Model: attackers, vicitms, vulnerabilities etc. with objects
- Attribute of an event 
    - connection for
- Galaxy
    - Can be used to describe "MITRE ATT&CK", "Tool", "Threat Actors" etc. of an event in more  details (depens on how you model it)

A lot is up to the user on how he/she wants to model it. Example: Sometimes add an information as object or as attribute. 


## Varia

Login (also see Tasks as it was used for the exercises)
   - Login via: "daniel.knoepfel@ost.ch"

Links: 
    - https://www.misp-project.org/documentation/
    - https://circl.lu/services/misp-training-materials/ Training materials
    - https://www.youtube.com/watch?v=aM7czPsQyaI&list=PLhSWiKucshm4CfNjKm7cxxjmj8LfxRXdp (MISP training module 1, long)
    - https://www.circl.lu/doc/misp/book.pdf (ok... but concepts are not described)
    - https://www.circl.lu/doc/misp/