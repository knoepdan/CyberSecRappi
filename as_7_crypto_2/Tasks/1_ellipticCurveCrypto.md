# Elliptic curve Cryptogrphy

### Questions and answers

1. What mathematical problem does ECC rely on?
    - Answer: it is based on the algebraic structure of elliptic curves over finite fields (to be honest... this math seems to be a bit too advanced for me)

2. Name reasons why ECC keys are significantly shorter than for other approaches to public-key cryptography?
    - ECC provides the same security with a much shorter key lenght. 

3. What are good key sizes when working with ECC and keeping information confidential for another decade?
    - I would go with 256 bit. (ECRYPT recommends 512 for the 2029-2030 but i guess 256 would do). Some other resources claim that ECC key lenght should be about twice that of the lenght of a symmetric key (which 256bit fullfills for 2032)

4. OPTIONAL Can you choose any curve as a base or are there concerns when choosing a curve?
    - Answer: No, wikipedia lists several points that should be avoided when choosing a curve.
