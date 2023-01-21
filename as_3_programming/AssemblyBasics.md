# Assembly

Assembly language is a low level language where the instructions match the architectures machine code instructions. Usually, an assembly statement matches a machine instruction. Since assembler is tied to the architecture machine code instructions, each architecture has a specific assembly language. 

*Remark: The compiler output of languages such as C#/Java (byte code) is sometimes also refered to as assembler (stack-assembler etc.) Of course such instructions don't reflect the machine code instruction*


## X86 

"x86" usually means binary compatibility with the 32-bit instruction set of a 80386. 

- https://en.wikipedia.org/wiki/Processor_register
- https://en.wikipedia.org/wiki/X86


**16-bit register**
16-bit register AX, BX, CX, DX had multiple purposes, but each had a special function: 
    - AX -> mainly for calculations
    - BX -> base address of a data structure
    - CX -> counter for loops (and move operations?)
    - DX -> data register for second operand
Other register
    - SP -> stackpointer (top element of stack)
    - BP -> base pointer (other location of stack or memory)
    - IP -> instruction pointer  -> points to current instruction in memory
Index register
    - SI -> source index
    - DI -> destination index
Segment register
    - CS -> code segment
    - DS -> data segment
    - SS -> stack segment
    - ES -> extra segment
**register for Intel 80386 (32bit)**
Basically all registers were extended to 32bit (exception: segment registers)
- AX/EAX/RAX: Accumulator (results of calculations)
- BX/EBX/RBX: Basis
- CX/ECX/RCX: Zähler
- DX/EDX/RDX: Daten/Allzweck
- SI/ESI/RSI: Quellindex (Zeichenketten)
- DI/EDI/RDI: Zielindex (Zeichenketten)
- SP/ESP/RSP: Stapelzeiger
- BP/EBP/RBP: Stapelsegment (Anfangsadresse)
- IP/EIP/RIP: Befehlszeiger

**x64 (64 bit)**
see: 
- https://en.wikipedia.org/wiki/X86-64
- https://de.wikipedia.org/wiki/X64

## Assembly with Kali linux



https://filippo.io/linux-syscall-table/  > Linux system calls table (and in which register you have to load it)

## Random info 8086 assembler

Examples instructions
- `MOV dst src` -> moves data from source to destiation
    - src can be pointers to memory, registers, constants
    - dst can be pointers to memory + registers (except register CS + IP)


## leftovers
- WORD: word is the natural unit of data used by a particular processor design
    - https://en.wikipedia.org/wiki/Word_(computer_architecture)