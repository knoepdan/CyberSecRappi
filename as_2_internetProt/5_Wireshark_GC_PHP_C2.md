# Wireshark gc.php c2


### Answers

1. what did you learn in this exercise?
    - to be honest, not fully clear what was is the supposed gain in knowledge from this exercise. Quite possibly, i missed something important. Decrypting the http messages worked (obviously only for the TLS connections to that specific server) but I could neither find packages from/to that server which were still encrypted (relates to next question) nor did I find any suspicious follow up packages in Wireshark.     

2. is it always possible to decipher pcap files if you have the private key
- Answer: no
    - private key has to (obviously) be the one that was used to establish the encrypted connecection. 
    - PFS (Perfect Forward Secrecy) may not be enabled (as otherwise private key is not used for encryption)
    - if encrpytion is not on transport level but on message level (meaning the application handles the encrpytion) then it is not possible to decrypt using wireshark as this would not follow a predictable standard.
    - Wireshark has to know the protocol and the algorithm used for encryption to be able to decrypt a msg. (but this is problem of the tool, if Wireshark doesn't know it, some other tool might)
    - -> otherwise I would say yes if it is on the protocol level and without PFS
        - (i guess this answer is wrong but I didnt find any other reasons  



### Varia
Decoded r url param: getCommand=true&user=WxTrFk&pass=secure&serial=wxpUID33125523
Server IP: 192.168.100.66