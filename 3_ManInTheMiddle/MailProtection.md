
### Mail protecteion

**Spam protection**
Mail server (that recieves mails, potential spam) checks using this exmaple: 
- 1. SPF: will check if the sender IP is allowed for the from address: example: from: xx@bla.ch -> reciever will check DNS for bla.ch 
- 2. DKIM: SMTP header contains signature. Receiver will check signature (first using DNS request)
- 3. : DMARC: in case of validation (of 1 or 2), reciever mail will check what to do. Example: 
bla.ch sends masking as xx@compass.ch to to ost.ch email (mismatch sender mailserver and from). Reciever will now ask compass DNS for policy what there is to do (example: reject mail abut send a mail admin.ost.ch so it is known that someone pretending to be us)

Key words: 
- SPF: Sender policy framework (which IP is allowed to send mail)
- DKIM: DomainKeys Identified Mail (check header signature)
- DMARC: Domain-based Message Authentication, Reporting and Conformance   (Basically a policy on what to do when SPF or DKIM fails)


**CHECK DKIM**
1. In mail header look for DKIM-Signature. Look for s entry (Example: "s=hsr119). 
2. dig query: `dig +short hsr1119._domainkey.hsr.ch txt`
    - alternativly use DKIM loop via https://mxtoolbox.com/SuperTool.aspx (e.g.: "hsr.ch:hsr1119")
3. With DKIM-Signature in mail and (public) key in DNS entry, it is possible to verify email 



###Varia

**Opportunistic encryption**
opportunistic encryption:  mail sending is encrypted but man in the middle is possible.



**S/Mime**
*was not part of the course*
https://de.wikipedia.org/wiki/S/MIME


