# Transport security layer

### Questions and answers


1. Are only strong cipher suites supported?
    - Yes, since version 1.3.. (weaker ciphers are no longer supported)
2. Does the server support and prefer cipher suites with forward secrecy?
    - yes, using Diffie-Hellman
3. Does the server support strong protocol versions?
4. Does the server support downgrade detection?
5. What is TLS_FALLBACK_SCSV?
6. Does the server support secure TLS renegotiation?
7. Does the server support client-initiated renegotiation?
8. Is TLS compression support enabled?
9. Is the server vulnerable to the Heartbleed attack?
10. Is the server vulnerable to the OpenSSL CCS injection attack?
11. Is the server vulnerable to the ROBOT attack?
12. Does the Domain use CAA to specify CAs, which can be used to issue certificates for it?



### Notes and varia

- TLS provides: 
    - Confidentialy
    - Authenticity
        - Client and Server supported
        - Usually: unilateral..just server is authenticated
    - Integrity
- often used for HTTP, FTP, IMAP, POP3, SMTP
    - HTTS is just HTTP wrapped in TLS (no new protocol)

- Encryption
    1. Assyemtric encrption to establish connection
        - keay exchange
    2. Symmetric encryption for actual data

**TLS handshake**
1. client -> server: hello 
2. server -> client:  
3. ... etc.. (see diagram in powerpoint or links)


https://de.wikipedia.org/wiki/Transport_Layer_Security 
https://tls.ulfheim.net/  


**CLR** Certificate revokation list
Client (browser) can download list and check if certificate is on list

**OCSP**
During the handshake: the client (browser) can ask the OCSP responder if server certificate is still valid. 
    (Alternative: OCSP Stapling: server asks OCSP responder and caches answer from some time and can then send its OCSP status to the client during handshake. Not widely supported/used yet )



-> generally: CRL, OCSP browser will still accept certificate if CLR or OCSP servers not reachable.  When using OCSP stapling: Flag "Must Staple" (X.509 extension), makes browser abort connection when no OCSP response is present.

**Changes in TLS 1.3**
- Removed support for: Weak ciphers
- Added: Improved handshake, downgrade protected, new algorithms (etc.)
- 

**Varia**
- Perfect forward secrecy: 