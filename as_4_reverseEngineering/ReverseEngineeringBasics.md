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

## Dynamic analysis
Using Ghidra some points: 
- Debugger tools have to be configured
- Debugger targets: how to connect (in theory should lead to same results but in practise this isn't the case)
    - in VM 
    - via TCP 
- Objects:
    - start debugging: right click debugger node and selecte "Exec"
    - shows us the different debugger sessions and lists the processes / threads
- Interpreter
    - shows info about what debugger is doing
    - possible to set commands (much like console for browser tab, see video)
        - example: `dq 14fff0` -> shows content of memory  (quad, attention big endian)
        - example: `ed 14fff0 01` -> edits content of memory (quad)
        - example: `eb 14fff0 01` -> edits content of memory (byte)
        - example: `db 14fff0` -> show content of memory (byte)
        - example: `dd 14fff0` -> show content of memory (double word)
        - seeing memory values should also work in "Watches" (see pdf, might not always work)
    - might open upon starting a debugger session
        - otherwise just go to Windows > Interpreter (along with all other windows)
    
- Modules
    - allows mapping virtual memory address to the program (and used libraries)
    - **Important: only when mapped can we relate addresses in e.g. listing component and set breakpoints**
        - to map after starting debug session: right click module (there should only be one) and "Map to $prog"
        - Static mappings window should show mappings (window may has to be opened via Window..)
- Breakpoints
    - 2 types
        - Software breakpoints (have to change source as otherwise it would not be possible)
        - Hardware breakpoints
            - use dedicated CPU registers (by now, hardware usually has this)
    - Can be set from "Listing" component
        - different type of breakpoints.. (accessing memory, SW Execute, HW Execute....)
- Listing components
    - Dynamic > debugger equivalient to "static" listing component
        - Sometimes doesn't show instructions -> right click and disassemble
        - Always possible to add a new one via Window > Debugger > 
    - Dynamic can be configured to always go to control flow (recommended to have 2 windows)
        - Track Location: 
            - Stack or instruction pointer ("Track Program Counter")$
            - Stack pointer RSP ("Track Stack Pointer")  
- Registers -> CPU registers
- Watches -> watch memory location
    - has a special syntax for pointers:   `*:8 RSP` watches 8 bytes the register RSP points to
- Stack 
    - shows stack frames
    - each "CALL" instruction will create a new stack frame (cleared by later "RET" instruction)
    - Click will update "Registers" and "Dynamic Listing" (why registers?)
    - possible to add comments (double click)
    - more see concept **quite important**



Start debugging 
- preconditions: windows etc. are setup
1. "Debugger Targets" > Connect > choose correct debugger (dbgen for windows, "IN-VM" or via "local agent")
2. Objects:
    - start debugging: right click debugger node and selecte "Exec"
    - shows us the different debugger sessions and lists the processes / threads
2. Modules:  right click module (there should only be one) and "Map to $prog"


## Tool Ghidra
Software reverse engineering tool (developed by NASA) for static and dynamic analyis
https://ghidra-sre.org/  (follow download link to github: https://github.com/NationalSecurityAgency/ghidra/releases)


## Varia 
