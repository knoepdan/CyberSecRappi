# RDP Man in the middle

### Answers
1. explain NLA?
    - if set to true, authentication - and with it the encrypted channel -  is delegeted to an external (secure) security protocol.
2. explain CredSSP?
    - This is the protocol responsible for the transfer of the credentials ("Credential Security Support Provider")
    - not 100% i got this right, but I belive the CredSSP ensures that first the authentication happens (via TLS+NTLM for client authentication) and only then the actual RDP session starts.
3. explain why NLA should protect against MitM?
    - When NLA is true, the TLS connection uses the password to established connection without sending it to the "man in the middle". 
        - Simplified and incorrect example to show why it wouldn't work: 
            - Server and client: use the pw hash as part of the symmetric TLS key. 
                - They both don't need to send these info to the other party as they both have this data (hash of the pw).
            - Man in the middle is not able interfere as he doesn't know this info, so if a MitM is present, the a secure connection cannot be established. 
            - > actuall workflow using NTML is way more complicated but in the end it is similar.
4. would 2FA fix the problem of this kind of MitM attack?
    - Answer: 2FA would not help as Man in the middle would just forward any type of credentials. 
5. what is the difference between the two nmap outputs in the steps above (enabled/disabled NLA)?
- NMap scan
    - without NLA: SSL: Success
    - with NLA: SSL doesnt appear...
My interpretation: It means that SSL (TLS) was not detected as mandatory while scanning. TLS is a crucial part of secure authentication via NLA.



### Notes and varia

- WIN10 IP:  192.168.127.157

- NTML: Challenge response based authentication procedure
- SPNEGO: mechanism to negotiate the security technology. 
- PyRDP: Man in the middle application for RDP (developed in python)