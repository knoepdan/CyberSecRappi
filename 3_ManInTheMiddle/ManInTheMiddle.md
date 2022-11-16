#Man in the middle


##How to become man in the middle

- BGP: forged BGP announcements
- Wifi: Rogue access point (free WiFi ...)
- Physical on network layer (mobile network) or with help ISP
    - must usually be cleared by law enforcement
- ARP spoofing
- DHCP Poisoning
- DNS Poisoning
- Other
    - NFC Relaying attach
        - attack on contactless payments.. physical access necessary
    -  IMSI catcher 
        - interrupt cell phone signal (using rogue antenna)
    - Rogue Network Device
        1. Connect device into LAN 2. will provide a reverse shell 3. use reverse shell from home
    - Bluetooth
  

### ARP spoofing
Only works in local network. Using ARP packages, attacker will make other machines assign IP addresses to the wrong MAC addres (assign the IP's to the attackers mac address). 
Attacker can then be the gateway for a machine and for the actual gateway pretending that particular machine (and thus be the man in the middle) 


### DHCP Poisoning

Often used to provide a client with a forged IP address of the DNS server (and not used to assign a wrong IP to the client)

Basic workflow: 
1. Client: On startup: sends broadcast: where is the DHCP server (Discover)
2. DHCP Server:  answers: I am the DHCP server and here are my params. (Offer) (allows client to check params)
    - <span style="color:red">FAKE DHCP server answers and returns fake DNS server</span>
        - forged DHCP server has to be faster than the actual one, so often a DOS attack is run in parallel. 
3. Client: asks DHCP server: what is my IP address (Request)
4. DHCP Server: answers with the IP + forged DNS server  that now belongs to client
    - <span style="color:red">forged DHCP server answers (returning forged IP of DNS)</span>

###DNS Poisoning
**Attacker forges DNS updates** 
Example: 
1. Attacker sends "Delete dns entry"
2. Attacker sends "Add forged dns entry"
-> now DNS server will return spoofed (incorrect) IP's for certain addresses

**Malware based DNS poisoning**
- Malware modifies host file (windows: "c:\Windows\System32\Drivers\etc\hosts", linux: /etc/hosts)
- Setup system proxy with trusted root certificate
    - set (wrong) proxy in registry
    - download and import certificate for (wrong) proxy

**Tools**
-  scapy: tool (fake/forge packages/requests, e.g. dns spoofing)  (see powerpoint)
- Metasploit

*also see powerpoint*


### What can be done once you are "man in the middle"

Depends on whether traffic is: 
- unencrypted (dns, http, dhcp, telnet, arp, snmp, smtp)
- encrpyted ( https, smb, ssh)

Once you are "man in the middle", it is possible to 
- intercept  (block)
- redirect 
    - e.g. https to http: http://www.google.fm/url?q=http://go.msn.com/HML/6/5.asp?target=http://%09%349i%6bb3%32.%64%%%09A%09.R%%09u%%%%09/   (would redirect to 49ikb32.da.ru)
    - e.g. DNS
- passive (listening) -> only unencrypted
- downgrade (encrypted)
    - e.g. TLS connection: when cypher/algo is negotiated the strongest cipher is used that both parties support. That way, it is possible that a man in the middle can downgrade to a weak cipher
        - possible with: HTTPS, SMB
            - it is ususaly possible to mitigate this via possible (example: apache can be configured to only accept strong cyphers even this is not compliant with RFCs)
    - or downgrade https to http (man in the middle will still communicate via https to target server, just the connection client-"man in the middle" is via http)




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
- Generally: Mutual certificate authentication (client also authenticates via certificate)
    - prevents man in the middle because there is only one encrypted connection (end to end) 
- FIDO2 -> protection againt man in the middle for https. 
    - in combination using dongle 
    - concept similar to NLA for RDP
    - see [15:52] Severin Rohner
    https://www.youtube.com/watch?v=ce5IHjfYmwQ
<https://teams.microsoft.com/l/message/19:5a6be47a2da447f19d52b11b53297b22@thread.tacv2/1668178379961?tenantId=a6e70fa3-1c7a-4aa2-a25e-836eea52ca22&amp;groupId=b9c4c81d-e84b-41ff-ba3a-af504e582f74&amp;parentMessageId=1668178300199&amp;teamName=CAS Cyber Security 2022 / 2023&amp;channelName=2022-11-11 Man in the Middle&amp;createdTime=1668178379961&amp;allowXTenantAccess=false> 



###Some more details


**RDP Man in the middle (and how to deactivate it)**
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
    - attention: "man in the middle" has to do a lot to rewrite links, headers (even js). (like  WAF: Web application firewall)

*Remark: offline phising is more or like just faking a website*


### Tools
**bettercap tool**
Tool created to perform various types of MITM attacks against a network, manipulate HTTP, HTTPS and TCP traffic in realtime, sniff for credentials and more. "Man-in-the-middle" is possible.  (probably best tool right now)

`bettercap -iface eth0`


`net.prove on`  -> what is this?



Public WIFI
    - IP tables (TODO: check)


**Certificate transparency log**

Certificate is hashed and is stored with a timestamp.
SCT = Signed certificate transparency

CT logs  -> these are logs

CA needs 

<span style="color:red"> TODO<span>


### Varia
**Terms and varia**
- Cookie: Secure: only via encrypted connection
- Transparent Proxy: ...?????
- WAF: Web application firewall 
    - man in the middle often has to be able to do what a WAF does. For example rewrite links and headers (and even JS)

**Tipps for excercises/testing**
- use virgin browsers (for some tests like HSTS): FF create new profile  (open browser with "-P", also see live cd VM)
- ARP Spoofing: Tip for VM-> dont bridge VM !!!