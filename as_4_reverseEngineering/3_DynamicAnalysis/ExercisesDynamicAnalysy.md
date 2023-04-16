# Dynamic analysis 


## First stepss

**4.2 Running a programm**

1. Inspect the “Dynamic Listing” component and compare it to the static “Listing” component. Why are they showing completely different memory locations?
    - Static Listing:     140000000  (Beginning of mapped addresses)
    - Dynamic Listing:        7ffa700e2680 48 83 ec 78     SUB        RSP,0x78   (Address of register RIP)
    - Answer: static listing shows the beginnning of the mapped memory addresses, basically where the actual file starts, whereas the dynamic listing shows the first code that is executed (see register RIP). 

<span style="color:red">What are the registers EIP, and or IP ??? Are these 32 bit subsets?</span>

2. Have a look at the “Registers” component. Where are the instruction pointer and stack pointer pointing? Where can you find these memory locations?
    - RIP (instruction pointer): 7ff700e2680 -> points to where we jumped to in the dynamic listing
    - Stack
        - RBP Stack base pointer (base pointer): 0
            - however, first instruction will change it's value
        - RSP Current base pointer: 14ffd8
            - not sure what this means
3. What is displayed in the “Stack” component?
    - The starting point address of the dynamic listing (7ffa700e260). The point where we actually start debugging


**4.2.1 Suspending at a known location**

Main function: `FUN_140001060` renamed to `FUN_MAIN_140001060`

1. How do the “Dynamic Listing” and the static “Listing” components present now? Why is it different
from before?
    - dynamic listings
        - I mainly just see the actual assembly code
        - I see the registers actually being used: `MOV qword ptr [RSP + 0x10], RDX`
    - static listing:
            - I get some additional information regarding parameters, function, stack values (local_res)
        -  I see label names, argument names etc:  `MOV qword ptr [RSP + local_res10], param_2`
    - Conclusion: it is best to have both, static and dynamic listing open at the same time as they complement each other
2. How is the “Stack” component changed? What happens if you click on the different lines presented
there?
    - The stack components shows the different stack frames. For ex3-win.exe 4 stack frames are shown, the last 2 can be mapped to a function (last is current main function)
    - Upon clicking on a line, we jump to the dynamic listing (tracking the program counter) and the static listing jump to the corresponding code (not the address in the stack). The register only show values for the current stack frame (or better current execution) as they values for the previous states are lost/overwritten. 
3. Where can you find the values for argc / argv? What are these? Can you find the argument you
passed based on these?
    - In my example, I passed one string argument so in a C program I end up with 2 arguments: argc and a char array with 2 entries ("program name" and "customValue").
    - Using the static listing (and to a lesser degree the compiled C code), i quickly find the assembly code that uses or references the arguments. Once I found these places, i check the corresponding code lines in the dynamic listing and find the registers or memory addresses these values should be. 
        - argc (in C) -> param_1 in static listing -> register RCX in dynamic listing -> value "2"
        - param_2 (char array in C) > pointer in RDX to (534fa0) -> in Interpreter i can see the memory values 
4. How do you go about finding the actual text values passed to the program?
    - in Interpreter `db 534fa0`  (534fa0 being the address in register RDX)
        - since a char is only 1 byte, "db" is the correct keyword to query the memory here. 


**4.2.2 Stepping**
Advancing program to method comparing eky
1. How would you go about finding the expected value (without modifying program state - we only
learn about that later ;-))?
    - Firstly, I would statically analyze the code, especially the decompiled C code rename some variables (static analysis)
        - it seems that we have to find a string and that there has been some obfuscation
        - there is one crucial if statement which defines whether we got the right character or not
    - Secondly, I try to find the crucial if statement in assembly (CMP statement) and I set a breakpoint there: `CMP        EAX,param_1`
        - In the register EAX has to be the value for the character that is compared to my input, so I can use the register value to find out a valid input. I set a breakpoint exactly at this point. 
    - I work in rounds now: I start debugging with a certain input string, continue untill my breakpoint at the compare statement is hit and read the correct value from the register EAX to get the first valid character. I restart debugging - round 2 - but this time I make sure my input string starts with the first valid character (value from EAX as ASCI string) I again continue till I hit the breakpoint, but this time i continue again to hit the same breakpoint again (second loop in while) so I get the second character. I do another round to get the third character.
2. Get the first three correct characters.
    - Value in register EAX when comparing: "Thi"
        - [1]  -> 54  -> "T"
        - [2]  -> 68  -> "h"
        - [3]  -> 69  -> "i"

## Input from Sprechstunde

- layouting: splitting windows -> by drag & drop
- bind dynamic listing to stack?`(check video beginning .. 6:50)
- explanation about pointer to pointer ...

- Stack register RBP 
    - RBP is usually (always?) set by hand so it's ok if it is initially 0
    - RBP is (can be) used to save RSP 
        - per convention: first thing to do is save RSP to RBP so when function call is finished we can just reset value 
        - however: compiler might do things differently and also possible that compile optimizes stuff so we don't see this


Link to video: https://ostch.sharepoint.com/teams/TS-CASCyberSecurity20222023/_layouts/15/stream.aspx?id=%2Fteams%2FTS%2DCASCyberSecurity20222023%2FFreigegebene%20Dokumente%2FGeneral%2FRecordings%2FBesprechung%20in%20%E2%80%9EAllgemein%E2%80%9C%2D20230404%5F170218%2DBesprechungsaufzeichnung%2Emp4


**Little and big endian (little endian used by x86 CPU)**
Example hex number: 4F52 
    - big endian (intuitive):  4F 52
    - little endian:  52 4F
        - 52 at addresse 1000, 4f at address 1001
        - used by x86 CPU's


**Memory size definitions**
- Byte:  db byte 1 byte / 8 bit
- Word:  dw word 2 bytes / 16 bits
- Double:  word dd dword 4 bytes / 32 bits
- Quadword:  dq qword 8 bytes / 64 bits

**Assembly examples**
Examples instructions
- `MOV dst src` -> moves data from source to destiation
    - src can be pointers to memory, registers, constants
    - dst can be pointers to memory + registers (some registers are excluded)
- `LEA rsi [someLabel]` -> moves/loads the memory address into rsi   