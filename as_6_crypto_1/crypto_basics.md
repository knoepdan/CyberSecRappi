# Crypto basics


**Symmetric Ciphers**
- AES
- Chacha$
- 3DES (considered weak by now)

**Asymmetric Encryption**
- RSA
- ElGamal

**Concepts**
- Digital Signatures
- Hash functions
    - slow hash functions for passwords: PBKDF2, scrypt, bcrypt, Argon2
        - should be a little slow to make brute force attacks more difficult
    - collision resistance -> difficulty to find an input string with the same hash



### Hash functions
- With key:  MAC/HMAC
- Without key


### Varia

Cypers
- block cypers (AES)
- Stream cyphers

**Terms/etc.**
- A5 Security
    - <span style="color:orange">???</span>
- Key stream repetition
    - <span style="color:orange">???</span>
- Key derivation
    - Key Derivation with PBKDF2  (???)
    - <span style="color:orange">???</span>
- Rainbow table
    - datastructure to allow fast search for the original value of a hash. Used to crack (non-salted) passwords
- Pseudo random number generators
    - not so easy to get random numbers. Some generators block until sufficient entropy has been achieved (e.g. java)
- CRC (Cyclic redundancy check)
    - usually used to detect transmission errors. Sometimes used as a hash function (not really secure though) 
- CIA triad: confidentiality, integrity, availability
