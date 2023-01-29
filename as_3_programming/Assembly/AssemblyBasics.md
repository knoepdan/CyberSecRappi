# Assembly

Assembly language is a low level language where the instructions match the architectures machine code instructions. Usually, an assembly statement matches a machine instruction. Since assembler is tied to the architecture machine code instructions, each architecture has a specific assembly language. 

*Remark: The compiler output of languages such as C#/Java (byte code) is sometimes also refered to as assembler (stack-assembler etc.) Such instructions don't reflect underyling cpu architecture*



### Assembly with Kali linux

**Compile and run assembly code with NASM**
1. Precondition: NASM  must be installed
    - https://www.nasm.us/  (intended for x86 on 64bit)
    - already installed on live CD
2. `nasm -f elf64 {prog.asm} -o {outputfile.o}`
   - e.g. "nasm -f elf64 helloTest.asm -o helloTest.o"
   - compiling: translates assembly to object code
3. `gcc {outputfile.o} -o {targetExecutable}`
    - e.g. "gcc helloTest.o -o helloTest"
    - linking: creates a single executable
4. Run the file: `./{targetExecutable}`   (e.g. "./helloTest")


Step 2-4 can be combined (example)
```
nasm factorial.asm -f elf64 -o factorial.o && gcc factorial.o -o factorial && ./factorial 5
``` 


*remark: on a different system/os, steps are/can be different*

**VS code**
Extension: "x86 and x86_64 Assembly" 

## Links 
x86 has evolved quite a bit while keeping backwards compatibility. (Quote: "x86" usually means binary compatibility with the 32-bit instruction set of a 80386.") 

- https://en.wikipedia.org/wiki/Processor_register
- https://en.wikipedia.org/wiki/X86


**links refering to 32bit**
- https://en.wikibooks.org/wiki/X86_Assembly/X86_Architecture
- https://resources.infosecinstitute.com/topic/registers/  (registers.. only 32 bit)
- https://resources.infosecinstitute.com/topic/instructions/ (instructions, probably only 32bit)
- https://www.assemblylanguagetuts.com/x86-assembly-registers-explained/  (register, simple + good)
- https://www.cs.virginia.edu/~evans/cs216/guides/x86.html  (good NASM assembler)



**Links refering to 64 bit**
https://cs.brown.edu/courses/cs033/docs/guides/x64_cheatsheet.pdf 



