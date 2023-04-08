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
    - In the dynamic listings, I follow the Programm counter (instruction pointer) and the stack (RSP) so they jump to corresponding places. 
2. How is the “Stack” component changed? What happens if you click on the different lines presented
there?
    - In the dynamic listing (tracking the program counter) i jump to the corresponding place
3. Where can you find the values for argc / argv? What are these? Can you find the argument you
passed based on these?
4. How do you go about finding the actual text values passed to the program?


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