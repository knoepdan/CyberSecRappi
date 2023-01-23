;; -----------------------------------------------------------------------------
;; LINUX
;;   (inspired by case.asm and methods-call.asm)
;; Assemble, link and run using the following:
;;   nasm factorial.asm -f elf64 -o factorial.o && gcc factorial.o -o factorial && ./factorial 5
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


    ; #### approach (now that we have passed argument as number in RAX)
    ; In register RAX we have the initial number to be factorized. 
    ; In one register RBX we now keep the result (initialized with the value of RAX)
    ; We do a loop where we decrement the value in RAX each time but multiply RAX with RBX 
    ; Once RAX is 1 we jump out of the loop (aka continue) as we have our result
         mov         rbx, rax ; init result in rbx and rax (counter)
    loop:            
        cmp         rax, 1;   ;  rax-1
        jle         resFound  ; check flags: jump out of the loop if necessary (rax is 1 or below)
        dec         rax ; decrement counter rax
        imul        rbx, rax  ; mulitply temporary result with counter (factorize)
        jmp         loop  ; 
    resFound: 
       mov         r14, rbx    ; save result in r14
       ; print text  (ok not all on one line)
        lea         rsi, [rel constmsg]
        mov         rdx, 15
        call        print
       ; print number
       mov         rsi, r14    ; move number to rsi so it can be printed
       jmp         printNumber
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
    fmt:
         db          "%i", 0xA, 0

    constmsg:
        db          "Here it is:", 0xA

