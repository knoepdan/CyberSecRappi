# Forensic Readiness
What is forensic readiness? Oranizational and technical preparation to be ready to handling IT incidets by: 
- Define rules what to log
- how to handle incidents
- increase IT's security and response in case of incidents

Some aspects:
- legal, regulatory
- governance
- incident response
- operations
- etc.

More aspect
- Confidentiality
- Integrity
    - ensure audit log of changes
    - ensure processes are followed
- Availability
    - ensure access to data
- Continuity
    - recovery plan (ability to recover fast)
- Authentication
    - ensure access is controlled and logged
    - who accessed what
- Authorization
    - ensure access is only granted to legitimate users/applications
- Nonrepudiation
    - no one should be able to clam X or Y action was NOT performed by them


## Business Risk Mitigation

Risk Analysis
- helps anticipate likely points of attack
- aware of existing vulnerabilities
- which threats are most likely (ransomware, phishing, fraud... )


## Information Security (Proactive/Reactive)
Proactive
- Information Security Framework
    - Education
    - Policy
    - Guidance
    - Controlling
    - Logging
- Regulatory and organization requirments
- Administration processes (least priviliege)
- Specialized Security teams (blue, read, purple)
- Security
    - Vulnerability Mgm
    - System & Account Hardening (and review)
    - Identification of core assets

Reactive
- Incident Response Capabilities
    - SOC Security operations center
        - Control: compliancy testing,. penetration testing, vulnerability testing
        - Monitor: log monitoring SIEM administration, incident response
        - Operational: identity & access management, key mgm, firewall administration
    - CSIRT: Cyber security incident response team
        - focus on incident response (can be part of SOC)
    - CERT: Computer Emergency Response team
- Disaster Recovery Plans
    - focus on data and it's recovery
    - Prevention > Detection > Correction
- Business Continuity Plans
    - focus on business to run again (not just data)
    - business impact analysis > recovery strategy > plan development > testing & exercises



## Recap: Forensic Evidence / Types of Forensic Investigations
Basic process forensic investigations
1. Collect
    - Logs, Evidence
2. Preserve
    - Store, Protect
3. Examine
    - Monitor
4. Analyze
    - Analysis, Reporting

Incident response (requires a lot of data like network logs, system/app/service logs, endpoint logs)
1. Preparation
2. Detection
3. Analysis
4. Containment
5. Eradication
6. Recovery

**Type of forensics**
- Computer forensics 
    - disk analyzis
    - log analysis
- network forensics  (difficult with encrypted communication)
    - scanning activities
    - lateral movement
    - payload download
    - C2 communicatoin 
    - exfiltration
- Memory forensis
    - malware binaries
    - malware communicatoin
    - ..
- E-Discovery
    - discovery, preservation and procesion of inof in support of legal/regulatory matters
- Clout Forensics
    - big challenge nowdays

## Processes & Models

Simplified model/process
1. Preparation
2. Gathering
    - Identification
    - Preservation
    - Collection
3. Processing
    - Examination
    - Analysis
4. Presentation


**Forensic Readiness Plan**
- Purpose of plan
- Scope
- Legal/Contractual
    - are we allowed or do we have to do it?
- Definitions/Terminology
- Details: 
    - Use cases, assets, responsibilities,
    - capabilities: who has expertize to perform: collection, storage, protection, analysis, reporting 
    - when to escalate 
    - resources
    - scenarios and use cases
    - training

**Scenario**
- Description
- Indicators
- Evidence Sources
- Response Plan
Check Response plans: "15B_Rorensic_Readiness_Plans-and-Models.pdf" (Ransomware, pishing)... also see lab tasks


## Logging
- What, How, how to process, how long to keep, how is access maintained.

Datasrouces examples:
- Devices
- Storages
- Servers
- Application logs
- System logs
- Appliance logs
- Process Telemetry /EDR
- AV Logs

**Background evidence**
Data that has been collected and stored as part of business operations. 
Examples:
- Network appliances
    - DNS, Proxy, DHCP, Firewall/Router
- Electronic communication (Mail, Instant messaging)
- Thid party data (e.g. internet service provider)
- Authentication
    - Directory service logs (DC, LDAP, SSO)
    - Physical access
    - Access logs of applications
- Cloud

**Foreground evidence**
Specifically collected and stored to assist investigation of incidents. 
Examplesx: 
- Network monitoring (e.g. Intrusion Detection/Prevention)
- Antivirus logs (centrally collectd)
- EDR data (behavioral analysis, process telemetry, file system telemetry, network telemetry)
- Data Loss Prevention logs

Some aspects
- who as access
- stored securely
- how long is it stored
- Correlaction (time.. attention timezones)
- ...

## Monitoring
EDR: Endpoint Detection and Response
XDR: Extended Detection and Response
Key features
• Forensic Triage Packages
• File Acquistion
• Memory Acquisition
• Live Response
• ISOLATION!

Some products
- Windows Defender ATP
- Velociraptor
- many more


### KQL Kibana Query language 

Best approach to start (Create new timeline): 
    - Limit by time (is default anyway)
    - Enter "*" in textbox (Filter your data using KQL Syntax)
        - mean we get all events 

Varia
- Date/Time query clause  (format "YYYY-MM-DD" or "YYYY-MM-DDThh:mm:ss")
    - @timestamp <= "2023-07-14T11:12:10"    -> ATTENTION: this will be interpreted as  UTC
        - so this timestap would be equivalent to "2023-07-14T13:12:10"
    - @timestamp <= now-110m
    - @timestamp:  "2023-07-15T21:02:00.000+02:00 to 2023-07-15T21:02:59.000+02:00"  
        - not verified

*Remark: probably less relevant than EQL*



### EQL
How to get there
1. Create new Timeline (here we can enter KQL)
2. Click on "Correlation": with textarea to enter "EQL"    

https://www.elastic.co/guide/en/elasticsearch/reference/current/eql-syntax.html   (Reference)
https://github.com/elastic/detection-rules/tree/main/rules/windows
https://eqllib.readthedocs.io/en/latest/ -> Atomic Blue Detections (examples)
https://eql.readthedocs.io/en/latest/query-guide/pipes.html#count (good)
-> also check out the existing rules (best as it certainly uses current syntax)

**Varia**
- SIEM: Security information and event management
    - Visibility accross all security systems
    - Event log mgm
    - Correlaction of events from different sources
    - security notifications


## Varia

**terms and varia** 
- EDR: endpoint detection response
- Nonrepudiation: one cannot successfully dispute action, authorship or validity (Nachweisbarkeit)
- retention times: for how long can we keep information before we are forced to release/publish (from a legal perspective)
- IOC Indicator of compromise
- TTP Techniques, tactics and procedures (MITRE)
- Identify gaps -> purple team (blue + red team team up)
- Atomic Red Team is a set of scripts or atoms to test your detection based on MITRE's ATT&CK.
- SIRP: Security Incident Response platform
    - receives alerts from different sources (IDS, EDR, Mail..)
    - example product: TheHive

## Lab
video mid-discussion
https://ostch.sharepoint.com/teams/TS-CASCyberSecurity20222023/_layouts/15/stream.aspx?id=%2Fteams%2FTS%2DCASCyberSecurity20222023%2FFreigegebene%20Dokumente%2FGeneral%2FRecordings%2FSprechstunde%20Lab%2015%2D20230713%5F170043%2DMeeting%20Recording%2Emp4&referrer=Teams%2ETEAMS%2DWEB&referrerScenario=teamsSdk%2DopenFilePreview


video final
https://ostch.sharepoint.com/teams/TS-CASCyberSecurity20222023/_layouts/15/stream.aspx?id=%2Fteams%2FTS%2DCASCyberSecurity20222023%2FFreigegebene%20Dokumente%2FGeneral%2FRecordings%2FMeeting%20in%20%5FGeneral%5F%2D20230720%5F170319%2DMeeting%20Recording%2Emp4