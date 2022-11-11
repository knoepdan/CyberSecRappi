

<span style="color:red">TODO and  improve, cleanup (and check with powerpoint)</span>


**bettercap tool**
Tool created to perform various types of MITM attacks against a network, manipulate HTTP, HTTPS and TCP traffic in realtime, sniff for credentials and more. "Man-in-the-middle" is possible.  (probably best tool right now)

`bettercap -iface eth0`


`net.prove on`  -> what is this?

scapy: tool (fake/forge packages/requests, e.g. dns spoofing)

**DHCP Poisoning**



Public WIFI
    - IP tables (TODO: check)

**RDP Man in the middle**
Only possible with deactivated NLA (Configure Network Level Authentication). Can be configured in RDP advanced settings. 

NLA works as follows: 
When connection is being established:
Step 1: Server sends certifiate to client (or man in the middle)  
Step 2: Server will sign some server info + random number and sent it to client agein 
Step 3: Client will verifes the sent info via server certificate (public key). 
-> IMPORTANT: all this happens during connection setup and this is built into the protocol so the man in the middle cannot yet act and send "fake signed server info" (not fully clear how this works though )



**SSH Man in the middle**
Only possible with username/Pw (can be deactiveted (PasswordAuthentication no"))

Tool: "keygen" to generate private+public key (and then man in the middle won't be possible anymore client authenticates via public/key)


**Online phising**
- man in the middle is between real website and client
    - attention: "man in the middle" has to do a lot to rewrite links, headers (even js). (like WA)
Remark: offline phising is more or like just faking a website

### What can be done once you are "man in the middle"

Once you are "man in the middle", it is possible to 
- intercept  (block)
- redirect 
    - e.g. http
- passive (listening)
- downgrade
    - e.g. TLS connection: when cypher/algo is negotiated the strongest cipher is used that both parties support. That way, it is possible that a man in the middle can downgrade to a weak cipher
        - possible with: HTTPS, SMB
            - it is ususaly possible to mitigate this via possible (example: apache can be configured to only accept strong cyphers even this is not compliant with RFCs)


**"SSL strip" attack**
Type of downgrading attack. 
Man in  the middle tries to redirect https request to http request. ("Man in the middle" will itself connect to the target server via https)




### Tipps
- use virgin browsers (for some tests like HSTS): FF create new profile  (open browser with "-P", also see live cd VM)
- ARP Spoofing: Tip for VM-> dont bridge VM !!!

### Prevent man in the middle

- Mobile apps:  Certificate Pinning
    - Fingerprint of servier certificate is compiled into app. If server certificate doesn't have the same finger, connection is not established:  Prevents "Man in the middle"
- [OBSOLETE] Browser: HPKP  (Http Public Key Pinning)
    - HTTP rresponse contains in header: "HPKP: Pin" (pin is formed from public key of server)
    - no longer aktive !!! (problem if pin is not updated by server admin)
    - replaced by HSTS
- Browser HSTS: Header (HTTP-Strict-Transport-Security)
    - Example: `Strict-Transport-Security: max-age=<expire-time>` -> browser will remember that this website that only works with https for the configured max-age
    - will tell browser to redirect to https when site is requested site is requested via http
    - Disadvantage: user has to visit site once
        - this is mitigated by modern browsers which preload the HSTS flag (has to be registered before ( https://hstspreload.org/ ))
- Mutual certificate authentication (client also authenticates via certificate)
    - prevents man in the middle because there is only one encrypted connection (end to end) 
- FIDO2 -> protection againt man in the middle for https. 
    - in combination using dongle 
    - concept similar to NLA for RDP
    - see [15:52] Severin Rohner
    https://www.youtube.com/watch?v=ce5IHjfYmwQ
<https://teams.microsoft.com/l/message/19:5a6be47a2da447f19d52b11b53297b22@thread.tacv2/1668178379961?tenantId=a6e70fa3-1c7a-4aa2-a25e-836eea52ca22&amp;groupId=b9c4c81d-e84b-41ff-ba3a-af504e582f74&amp;parentMessageId=1668178300199&amp;teamName=CAS Cyber Security 2022 / 2023&amp;channelName=2022-11-11 Man in the Middle&amp;createdTime=1668178379961&amp;allowXTenantAccess=false> 

**Certificate transparency log**

Certificate is hashed and is stored with a timestamp.
SCT = Signed certificate transparency

CT logs  -> these are logs

CA needs 

<span style="color:red"> TODO<span>



### Mail protecteion

**Spam protection**
Mail server (that recieves mails, potential spam) checks using this exmaple: 
- 1. SPF: will check if the sender IP is allowed for the from address: example: from: xx@bla.ch -> reciever will check DNS for bla.ch 
- 2. DKIN: SMTP header contains signature. Receiver will check signature (first using DNS request)
- 3: DMARC: in case of validation (of 1 or 2), reciever mail will check what to do. Example: 
bla.ch sends masking as xx@compass.ch to to ost.ch email (mismatch sender mailserver and from). Reciever will now ask compass DNS for policy what there is to do (example: reject mail abut send a mail admin.ost.ch so it is known that someone pretending to be us)

Key words: 
- SPF: Sender policy framework
- DKIN: (check header signature)
- DMARC:  Policy


**Opportunistic encryption**
opportunistic encryption:  mail sending is encrypted but man in the middle is possible.
Usually replaced by S/Mime.


**S/Mime**
(was not part of the course)
https://de.wikipedia.org/wiki/S/MIME


### Varia Cookies etc.
- Cookie: Secure: only via encrypted connection
- Transparent Proxy: ...?????
- WAF: Web application firewall 
    - man in the middle often has to be able to do what a WAF does. For example rewrite links and headers (and even JS)
