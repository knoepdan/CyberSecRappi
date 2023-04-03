# Dynamic analysis 


## First steps

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