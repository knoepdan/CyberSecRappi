# Forensic Readiness
What is Forensic readiness: 
- organizational and technical preparation to be ready for handling it incidents




### Forencsic versus incident response
**Forensic**
- collect, examine and anlyze data
- goal is understanding of breach, compromise or attack (with potential legal relevance)
**Incident response**
- find out what has happened: goal is to recover from threat
- (usually) performed on a live system
- a lot faster than forensics
> often only live response is done



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



## EQL
How to get there
1. Create new Timeline (here we can enter KQL)
2. Click on "Correlation": with textarea to enter "EQL"    

https://www.elastic.co/guide/en/elasticsearch/reference/current/eql-syntax.html   (Reference)
https://github.com/elastic/detection-rules/tree/main/rules/windows
https://eqllib.readthedocs.io/en/latest/ -> Atomic Blue Detections (examples)
https://eql.readthedocs.io/en/latest/query-guide/pipes.html#count (good)
-> also check out the existing rules (best as it certainly uses current syntax)




**terms and varia** 
- EDR: endpoint detection response
- Nonrepudiation: one cannot successfully dispute action, authorship or validity (Nachweisbarkeit)
- retention times: for how long can we keep information before we are forced to release/publish (from a legal perspective)
- IOC Indicator of compromise
- TTP Techniques, tactics and procedures (MITRE)
- Atomic Red Team is a set of scripts or atoms to test your detection based on MITRE's ATT&CK.
    - 