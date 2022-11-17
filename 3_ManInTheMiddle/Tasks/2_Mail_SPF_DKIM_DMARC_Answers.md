# Mail SPF, DKIM, DMARC

### Answers


- has opportunistic encryption being used?
- is the smtp communication using spf protection?
- is the smtp communication using dkim protection?
- is the smtp communication using dmarc protection?

### Checks


**CHECK DKIM**
1. In mail header look for DKIM-Signature. Look for s entry (Example: "s=hsr119).  -> see text or via https://mha.azurewebsites.net/ 
2. dig query: `dig +short hsr1119._domainkey.hsr.ch txt`
    - alternativly use DKIM loop via https://mxtoolbox.com/SuperTool.aspx (e.g.: "hsr.ch:hsr1119")
3. With DKIM-Signature in mail and (public) key in DNS entry, it is possible to verify email (see server logs)

### Notes

- HSR to compass (1 mail)
    - Outlook msg -> see png or header.txt (no need to check *.msg file https://emailheaders.net/outlook.html )
    - Mail + Header:  https://mha.azurewebsites.net/  
        - hsr to compass
    - Traffic (Wireshark *.pcap file)
        - encrypted: Server certificate from HSR
            - 152.96.36.19 mx2.hsr.ch
            - 62.2.85.154 mx2.compass-security.com
    - logs
        - seems DKIM successful
Findings: 
- HSR has no DMARC entry -> DNS query via https://mxtoolbox.com/DMARC.aspx¨
- HSR has SPF entry (dig -t txt hsr.ch or also via mxtoolbox.com) and 152.96.36.19 is allowed to send
    -  I don't see this verified anywhere, so I guess compass doesn't have SPF checks
- HSR has DKIM which was used here
