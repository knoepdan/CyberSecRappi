;; -----------------------------------------------------------------------------
;; LINUX
;;
;; Assemble, link and run using the following:
;;   nasm case.asm -f elf64 -o prog.o && gcc -o prog prog.o && ./prog
;; -----------------------------------------------------------------------------
global      main
extern      printf
extern      atoi
default     rel

section     .text
    main:
        cmp         rdi, 2  ;check if we have an argument (must be at least 2 as first arg is always arg count)
        jl          exit 
    initialize:
        push        rbx  ; save so it can be restored later ? (why???)
        mov         rdi, [rsi + 8] ; move pointer to second argument and move it to rdi 
        call        atoi wrt ..plt  ; calls atoi and stores value in rax


    ; #### strategie
    ; In register RAX we have to number that is to be factorized. 
    ; In one register RBX we now keep the result (initialized with the value of RAX)
    ; We do a loop where we decrement the value in RAX each time but multiply RAX with RBX 
    ; Once RAX is 0 we jump out of the loop (aka continue) as we have our result

    ; rax: counter to be decremented
    ; rbx: result (temporary result)
    ; r14 ??

         mov         r14, rax ; keep original value for cmp
         mov         rbx, rax ; init result in rbx and rax (counter)
    loop:            
        cmp         rax, 1;   ;  rax-1
        jle         resFound
       ; mov         rbx, rax ; init result in rbx and rax
     

        mov         r14, rax ; keep counter as "imul" will overwrite register (extremly unelegant)

        dec         rax ; decrement counter
        imul        rbx, rax  ; result is stored in rbx



      ;  mov         rcx, rax ; factor to be decremented
      ;  dec         rax 
    ;    imul        rbx, rax  ; result should be stored in r14
        jmp         loop

     ;----- TESTING
       ; imul        rax, rbx  ; result is stored in rax
       ; mov         rsi, rax

     ;------- TESTING
     
     
      ;  mov         rcx, rax ; factor to be decremented
      ;  dec         rax 
    ;    imul        rbx, rax  ; result should be stored in r14
    ;    jmp         loop
    resFound: 
        ; cmp         rax, 3   ; DUMMY..




       mov         rsi, rbx    ; move number to rsi so it can be printed
        jmp         printNumber


    jump:
        cmp         rax, 3
        ja          dflt
        lea         rbx, [tab]
        jmp         [rbx + (rax - 1) * 8]
    C1:
        mov         rsi, 2
        jmp         print
    C2:
        mov         rsi, 3
        jmp         print
    C3:
        mov         rsi, 5
        jmp         print
    dflt:
        mov         rsi, 8
    print: 
        mov     rdi, 0x0    ; file descriptor: stdout
        mov     rax, 0x1    ; interrupt for "write"
        syscall 
        ret

    printNumber:
        lea         rdi, [fmt]
        xor         rax, rax
        call        printf wrt ..plt
        ;ret         ; segmentation fault if I add it
    exit:
        pop         rbx
        mov         rax, 0x3c
        xor         rdi, rdi
        syscall

section    .data
    constmsg:
        db          "Here it is:", 0xA
    fmt:
        db          "%i", 0xA, 0
    tab:
        dq          C1, C2, C3


;; -----------------------------------------------------------------------------
;; MACOS
;;
;; Assemble, link and run using the following:
;;   nasm case.asm -f macho64 -o prog.o && gcc -o prog prog.o && ./prog
;; On Apple Silicon, compile using the following (will be executed using Rosetta):
;;   nasm case.asm -f macho64 -o prog.o && clang -o prog -mmacosx-version-min=10.15 -arch x86_64 prog.o && ./prog
;; -----------------------------------------------------------------------------
; global      _main
; extern      _atoi
; extern      _printf
; default     rel
; section     .text
;     _main:
;         cmp         rdi, 2
;         jl          exit
;     initialize:
;         push        rbx
;         mov         rdi, [rsi + 8]
;         call        _atoi
;         cmp         rax, 3
;         ja          dflt
;         lea         rbx, [tab]
;         jmp         [rbx + (rax - 1) * 8]
;     C1:
;         mov         rsi, 2
;         jmp         print
;     C2:
;         mov         rsi, 3
;         jmp         print
;     C3:
;         mov         rsi, 5
;         jmp         print
;     dflt:
;         mov         rsi, 8
;     print:
;         lea         rdi, [fmt]
;         xor         rax, rax
;         call        _printf
;     exit:
;         pop         rbx
;         mov         rax, 0x02000001
;         xor         rdi, rdi
;         syscall
; section    .data
;     fmt:
;         db          "%i", 0xA, 0
;     tab:
;         dq          C1, C2, C3
