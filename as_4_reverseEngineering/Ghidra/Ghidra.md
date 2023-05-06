# Ghidra

Software reverse engineering tool (developed by NASA)
https://ghidra-sre.org/ 
github: https://github.com/NationalSecurityAgency/ghidra/releases


## Static analyis with Ghidra

**Tipps and trick (more or less random)**

- finding main method (for windows prog)
    1. Symbol Tree > Exports > entry
    2. Double click to see decompiled C function -> probably we see a simple function calling another function
    3. Double click on that function to get to a bigger function which contains
        - a lot of setup code (can be more or less ignored)
        - call to actual main function
- rename variable and func (recommendations)
    - `varAA` -> change to  `newName_varAA`  (basically keep the old name after the "_")

- it is possible to change the assembly code but not the C code  (patch code)

- possible changes to C stuff
    - renames 
    - change datatypes (undefined to .. )
    - change signature (??? how)


- Function Call Graph
    - Graph that shows how functions call each other
    - good to find main function

- Graph Control Flow  (AST Control flow)
    - shows a diagram for the decompiled function (if a box is selected, the corresponding code is marked)
    - to be triggered from C Windows -> top right menu of window


## Dynamic analysis with Ghidra (Debugging)
Using Ghidra: 
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
        - example with registers: `r zf` -> read register ZF (also possible reading register  ("r zf=1" should also be possible to write.. not tested))
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

See concept pdf for more info


## Varia 

**Good to know**
- `LEA EDI, [ESI+0xffffa000]=>DAT_00401000`  "=>" means that Ghidra was able to infer that [ESI+0xffffa000] is the value of memory address DAT_004010000

**Videos**

Link to video for dynamic analysis: https://ostch.sharepoint.com/teams/TS-CASCyberSecurity20222023/_layouts/15/stream.aspx?id=%2Fteams%2FTS%2DCASCyberSecurity20222023%2FFreigegebene%20Dokumente%2FGeneral%2FRecordings%2FBesprechung%20in%20%E2%80%9EAllgemein%E2%80%9C%2D20230404%5F170218%2DBesprechungsaufzeichnung%2Emp4

There should be more videos (e.g. static analysis)


