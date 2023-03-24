# Authentication

Authentication > who is the person
Authorisation > what is the person allowed to do


### Ways to authenticate

- Network level: SSL/TLS
    - X.509 Certificates  (common for machine to machine, unusal for client)
- HTTP level
    - BasicAuth / DigestAuth   ( no really relevant anymore )
    - NTLM (insecure because of relay attacks) 
    - Kerberos 
- Application (nowdays the most common way)
    - forms authentication


**User enumeration attack**
    - attacker should not be able to have a list of username because: 
        - password brute-forcing
            - brute fore, wordlist (with rules), password spraying
        - Denial of service (account locking)
        - social engineering
        - .... (pdf)
    - Mitigation: don't tell user that username exists (or doesn't). Better: "Username or password incorrect"
    - check if username/email is already somewhere on https://haveibeenpwned.com
    - Mitigations
        - Lock user accounts after a certain amount of failed attempts (but unlock after some time)
        - CAPTCHA after a certain nof failed attempts

**Password storage**
- use salted hash with hasing algorithms for passwords (e.g. PBKDF2)
    - SHA-3 etc. are fast which is not ideal for passwords


**Session fixation attack**
attackers will pass his session to victim user. 
Example: 
    - attacker has a session to Server. 
    - attacker manages to make victim use the session of the attacker
    - victim logs in to server (authenticates) but session is still valid
        - now attacker is also authenticated
Mitigation: always assign a new session Id upon new session (or when session becomes elevated in some other way)

**JWT**
Often for federated use cases (different domains)

https://jwt.io/ 



**FIDO2**
Protocol supported by modern browsers that requires a stick (with a secret). 
Is based on challenge response. Connection between stick and server has to be made (registered), once this is done, user can authenticate with the stick.

Phising resistant !!!



### Federation (Authentication accross domains)
Protocols
- SAML  (obsolete)
    - XML based
    - Single Sign-on (SSO)
- OAuth 2.1
    - Authoriaztion protocol
    - When people mean OAuth they mean OAuth 2.0  
- OIDC (OpenID Connect)
    - Authentication protocol based on OAuth
    - uses JWT



OAuth terminology: 
- Resource owner: user that owns particular resource
- Client: Application accessing protected resources  (application that redirects user to authorization server)
    - Confidential client: server side 
    - Public client: e.g. single page application 
- Resource Server: Server hosting protected resources
- Authorization Server
Client (application) should be registered by the Authorization server (e.g. Facebook or Google)
https://www.oauth.com/playground



OpenID Connect
    - flow is the same as OAUTH
    - Difference: access token is JWT 
    - https://openidconnect.net/ 



### Varia/Notes


- use password manager