# Reverse engineering basics

Main technics

- Deobfuscation
- Static analysis (basically just looking at the code)
- Dynamic analysis (also run the code.. potentially dangerous)


## Deobfuscation


## Static analysis

Link to meeting: https://ostch.sharepoint.com/teams/TS-CASCyberSecurity20222023/_layouts/15/stream.aspx?id=%2Fteams%2FTS%2DCASCyberSecurity20222023%2FFreigegebene%20Dokumente%2FGeneral%2FRecordings%2FMeeting%20in%20%5FGeneral%5F%2D20230321%5F170103%2DMeeting%20Recording%2Emp4 

**Possible to check file hash to so see if not someone else has done analysis**
Sites to check known malware by file hash
- https://www.virustotal.com/gui/home/search
- https://bazaar.abuse.ch/verify-ua/


**Check Filetype**
- Unix (Linux???): `file $path` -> will return infos about type of file on unix
- Linux: use library python-magic
- Windows: -> see steps in concept

**Strings**
strings often provide helpful info: 
- `strings /someFolder/file.exe` -> will print the strings found (linux, for the same on windows check concept)



**Tool Ghidra**
Software reverse engineering tool (developed by NASA)
https://ghidra-sre.org/  (follow download link to github: https://github.com/NationalSecurityAgency/ghidra/releases)