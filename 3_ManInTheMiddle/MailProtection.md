
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
