# Ghidra

Software reverse engineering tool (developed by NASA)
https://ghidra-sre.org/ 
github: https://github.com/NationalSecurityAgency/ghidra/releases


See concept document for more info

### Tips and tricks (more or less random)

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

