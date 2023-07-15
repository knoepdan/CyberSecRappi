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



### Kibana Query language 

Varia
- Date/Time query clause  (format "YYYY-MM-DD" or "YYYY-MM-DDThh:mm:ss")
    - @timestamp <= "2023-07-14T11:12:10"    -> ATTENTION: this will be interpreted as  UTC
        - so this timestap would be equivalent to "2023-07-14T13:12:10"
    - @timestamp <= now-110m

*Remark: probably less relevant than EQL*



## EQL
https://www.elastic.co/guide/en/elasticsearch/reference/current/eql-syntax.html   (Reference)
https://eqllib.readthedocs.io/en/latest/
https://eql.readthedocs.io/en/latest/query-guide/pipes.html#count (good)





**terms** 
- EDR: endpoint detection response
- Nonrepudiation: one cannot successfully dispute action, authorship or validity (Nachweisbarkeit)
- retention times: for how long can we keep information before we are forced to release/publish (from a legal perspective)