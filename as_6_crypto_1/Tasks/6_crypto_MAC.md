# 5 Message Authentication Codes (MAC)

### Questions & Answers


1.  MACs aim to cryptographically secure message integrity and are either based on hash functions or block ciphers. They make use of symmetric keys for generation and verification. Provide reasons why it is a bad idea to design an HMAC like
    1. mac = hash(concat(key, message))
        - Answer: its possible "fake" the same mac by changing the message and then append data untill we get the same MAC
    2. mac = hash(concat(message, key))
        - Answer: according to Wikipedia, if we find a collision got the message (different input, same hash), we still get the same MAC when we hash message+key. (same starting point according to wikipedia)
    3. mac = hash(concat(key, message, key)) ?
        - Answer: better than 1 and 2 as it solves their flaws: not possible to just append data to the msg and not same starting point. However, according to Wikipedia, still not a good idea as various papers suggest vulnerabilities.

2. Explain the HMAC construction and point out advantages over the above approaches.
    - Answer: mac = hash(concat(key, hash(concat(key, message)))
        - it is obvious that the above vulnerabilities (append data to msg and same starting point) woulndn't work because of the nested hash. 

3. OPTIONAL Explain the CBC-MAC and provide information how OMAC (formerly CMAC) addresses problems of the CBC-MAC.
    - Partial answer (as optional): predictable IV (allows replay attack), same key for encryption and auth 

3. OPTIONAL In order to encrypt and integrity protect messages in the same go, Authenticated Encryption (with Associated Data) could used. You did already study GCM or maybe EAX block modes that provide such features. Please explain the difference of AE and AEAD in simple words.
    - skipped as optional :-(



### Randmom notes (link etc.)
- MAC: Message authentication code
    - https://en.wikipedia.org/wiki/Message_authentication_code
- HMAC: keyed-hash message authentication code
    - is a MAC based on a key and hash function