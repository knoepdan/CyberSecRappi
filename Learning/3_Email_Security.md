# Email security


## Mail protection

Key words: 
- SPF: Sender policy framework (which IP is allowed to send mail)
- DKIM: DomainKeys Identified Mail (check header signature)
- DMARC: Domain-based Message Authentication, Reporting and Conformance   (Basically a policy on what to do when SPF or DKIM fails)

**Spam protection**
Mail server (that recieves mails, potential spam) checks using this exmaple: 
- 1. SPF: will check if the sender IP is allowed for the from address: example: from: xx@bla.ch -> reciever will check DNS for bla.ch 
- 2. DKIM: SMTP header contains signature. Receiver will check signature (will get public key via DNS request from sender domain)
- 3. : DMARC: in case of validation (of 1 or 2), reciever mail will check what to do. Example: 
bla.ch sends masking as xx@compass.ch to to ost.ch email (mismatch sender mailserver and from). Reciever will now ask compass DNS for policy what there is to do (example: reject mail abut send a mail admin.ost.ch so it is known that someone pretending to be us)

### SPF Sender policy framework

Example dig queries to get SPF entry
`dig -t txt compass-security.com +noall +answer`
`dig -t txt hacking-lab.com +noall +answer`
`dig +short hacking-lab.com txt`

or query it via https://mxtoolbox.com/SuperTool.aspx
https://mxtoolbox.com/SPFRecordGenerator.aspx


**check in log if DKIM was applied for spam detection (see lab-task)**
- Available/applied in X-Spamd-Result: "R_SPF_ALLOW(-0.20)"

### DKIM
Check DKIM
1. In mail header look for DKIM-Signature. Look for s entry (Example: "s=hsr119). 
2. dig query: `dig +short hsr1119._domainkey.hsr.ch txt`
    - alternativly use DKIM loop via https://mxtoolbox.com/SuperTool.aspx (e.g.: "hsr.ch:hsr1119")
3. With DKIM-Signature in mail and (public) key in DNS entry, it is possible to verify email 

**check in log if SPF was applied for spam detection (see lab-task)**
- Available/applied: "DKIM verification successful"

### DMARC
Query for DMarc entry: `dig -t txt _dmarc.hacking-lab.com +short`

Links
- https://dmarcian.com/dmarc-record-wizard/
- https://mxtoolbox.com/DMARCRecordGenerator.aspx


**check in log if DMARC was applied for spam detection  (see lab-task)**
- Available applied in X-Spamd-Result: "DMARC_POLICY_ALLOW(-0.50)"
- Not available/applied in X-Spamd-Result: "DMARC_NA(0.00)"

### Varia

**Also potentially checked by mail receiver**  (not really part of course)
- ip blocklists, rate limits etc.
- reputation (often a rating system is used to determine if its spam)
    - Check "X-Spamd-Result" in receiving mailserver (e.g. outlook-headers.txt): the fewer points the better (less likely to be spam). For example: having DKIM will deduct points. e.g:  "R_DKIM_ALLOW(-0.20)"

**Opportunistic encryption**
opportunistic encryption:  mail sending is encrypted but man in the middle is possible.

**S/Mime**
*was not part of the course*
https://de.wikipedia.org/wiki/S/MIME


