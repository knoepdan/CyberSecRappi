# Reverse engineering basics

**Main technics**
- Deobfuscation
- Static analysis (basically just looking at the code)
- Dynamic analysis (also run the code.. potentially dangerous)


## Deobfuscation

Some techniques to obfuscate the code: 
- Name mangling
    - choose arbitrary names
- Data transformation & distribution
    - examples: string formatting (decomposition), use hex, asci or some other encoding (possibly also use some math), unnecessary characters, encryption, ett. etc.
- Code bloating
    - dead code insertion
    - identity operations
        - basically code that does nothing in the end (comparison with math: 0 for additive operations)
- Control flow rerouting
    - inlining functions
    - flattening control flow:  unnecessary switch or goto
- Dynamically exectued code
    - strings that are viewed as code and are executed...


Languages covered:
- VBA
    - Tool: ViperMonkey  
- Powershell
    - Tool: PSDecode
- Javascript
   - Tool: box-js  

Recommendation: 
    - manual deobfuscation: use a git repo, and autoformat code first
    - using tools that also execute the code: always in a VM (that is NOT connected)


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


**Ghidra**
important tool for static (and dynamic) analysis. 

## Dynamic analysis




## Tool Ghidra
Software reverse engineering tool (developed by NASA) for static and dynamic analyis
https://ghidra-sre.org/  (follow download link to github: https://github.com/NationalSecurityAgency/ghidra/releases)


*see pdfs (!), exercises*
