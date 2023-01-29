;; -----------------------------------------------------------------------------
;; LINUX
;;
;; Assemble, link and run using the following:
;;   nasm hello.asm -f elf64 -o prog.o && gcc -o prog prog.o && ./prog
;; -----------------------------------------------------------------------------
global     main

section    .text
    main:
        mov        rax, 0x01
        mov        rdi, 1
        lea        rsi, [rel message]
        mov        rdx, message.len
        syscall
        mov        rax, 0x3c
        xor        rdi, rdi
        syscall

section    .data
    message:
        db         "Hello, World!", 10
        .len:      equ $ - message


;; -----------------------------------------------------------------------------
;; MACOS
;;
;; Assemble, link and run using the following:
;;   nasm hello.asm -f macho64 -o prog.o && gcc -o prog prog.o && ./prog
;; On Apple Silicon, compile using the following (will be executed using Rosetta):
;;   nasm hello.asm -f macho64 -o prog.o && clang -o prog -mmacosx-version-min=10.15 -arch x86_64 prog.o && ./prog
;; -----------------------------------------------------------------------------
; global     _main

; section    .text
;     _main:
;         mov        rax, 0x02000004
;         mov        rdi, 1
;         lea        rsi, [rel message]
;         mov        rdx, message.len
;         syscall
;         mov        rax, 0x02000001
;         xor        rdi, rdi
;         syscall

; section    .data
;     message:
;         db         "Hello, World!", 10
;         .len:      equ $ - message
