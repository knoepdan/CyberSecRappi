# Notes (more or less random)

## comments from chat  
*just pasted them in chronological order... often they only make sense in combination with video**

https://www.elastic.co/guide/en/ecs/current/ecs-allowed-values-event-category.html


```
Install-Module -Name invoke-atomicredteam,powershell-yaml -Scope CurrentUser Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser IEX (IWR 'https://raw.githubusercontent.com/redcanaryco/invoke-atomicredteam/master/install-atomicredteam.ps1' -UseBasicParsing); Install-AtomicRedTeam -getAtomics -Force
```

Test execution:
- Invoke-AtomicTest T1546.008 -GetPrereqs
- Invoke-AtomicTest T1546.008 
- Invoke-AtomicTest T1546.008 -Cleanup



**Table**
IOC	Type	Description
TBD	Hash	MD5 hash of dropped file "XXXXX.exe"
TBD	Filename	Dropped ransomware crypter
TBD	Filename	Ransom note on desktop
TBD	Domain	Domain used to download second stage

https://eqllib.readthedocs.io/en/latest/

https://eql.readthedocs.io/en/latest/query-guide/pipes.html#count


sequence with maxspan=50m
[authentication where event.action == "logon-failed"] with runs=10


Zeigt alle commands für local group egal ob "add /remove / get ...": `get-command *localgroup* `



sequence with maxspan=100m
[ network where event.action:"http_request" and  process.name:"metricbeat.exe"] 
  [ network where event.action:"http_request"] 


https://github.com/redcanaryco/atomic-red-team/blob/master/atomics/T1197/T1197.md


https://github.com/redcanaryco/atomic-red-team