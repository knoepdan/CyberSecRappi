# APT Report "UNC3524: Eye Spy on Your Email"

https://github.com/CyberMonitor/APT_CyberCriminal_Campagin_Collections/tree/master/2022/2022.05.02.UNC3524

Event ID: 	1500
UUID: 	abfa04e0-b7c8-4cb1-9cde-62f46b387e6a

## Notes summary from pdf (somewhat random)
- Group name: UNC3524 
    - Info from excel: https://docs.google.com/spreadsheets/u/0/d/1H9_xaxQHpWaa4O_Son4Gx0YOIzlcBWMsdvePFX68EKU/pubhtml#
        - From: russia
        - Other name: "APT29"  (and many others like "Dukes" etc. etc.)
    - https://attack.mitre.org/groups/G0016/
- Group started being active/being noticed: Since December 2019
- targets: employees of companies in corporate development, mergers and acquisitions
    - employees targeted: executive teams, work in corporate development/mergeser and acquisitsions and IT security stuff (probably to check if detected)
- Group specializes in: data theft
    - via emails
- Attack techniques (gaining access)
    - deployed QUIETEXIT  (based on Dropbear SSH client-server software)
        - on network appliances (load balancers, wireless access point controllers etc.) as they are usually trusted
        - these compromised appliances will then establish a connection with a C&C server and a SSH connection is established
    - persistance mechanisms detected (startup scripts)
    - masks traffic (connections attempts) as legitimate traffic (making request appear as from the vendor of device)
    - C&C domains are using dynamic DNS providers (easy to update DNS records)
        - when inactive: the domains would resolve to 127.0.0.1
    - C&C servers identified were conference room camera (probably default credentials used to infect them)
    - Alternative way (secondary backdoor) 
        - REGEORG web shell placed on a web server
            - code heavily obfuscated which allowed to bypass detection
    - See MITRE Att&ck at the bottom
- lateral movement
    - customized version of Impacket's WMIEXEC
        - https://redcanary.com/threat-detection-report/threats/impacket/ 
        - will establish semi-interactive shell on a remote host  (write files on the remote host and then printing output to terminal)
    - also usage of registry
    - See MITRE Att&ck at the bottom
- Stealing data
    - from Microsoft Exchange server (on premise or cloud) via Web services API
    - Authentication to Exchange server: username/pw, service principals etc.
    - All content (mails & attachment) will be extracted for a time range (usually starting with the date last extraction ended) 
- What to do against it
    - Dection not easy
        - network logging
    - check network devices and hardening according to vendor information 
    - Mandiant's UNC2452 Microsoft 365 Hardening Guide (hardengin and detection)
        - mentioned in connection with accessing exchange servers

Links: 
    - https://attack.mitre.org/groups/G0016/
    - https://www.mandiant.com/resources/blog/unc3524-eye-spy-email  (like pdf)
    - https://www.mandiant.com/resources/blog/remediation-and-hardening-strategies-for-microsoft-365-to-defend-against-unc2452


## Questions

- to me what is in the text and the mentioned text and the listed MITRE att&ack categories do not fully match
    - Not mentioned in mitre: WMI, Exfiltration>Automated Exfiltration?
    - Some techniques are not mentioned in the text (example: powershell, etc.)
        - I guess this is ok as text didn't cover details
- From my understanding: we have a reverse shell (described in text). I don't see this in a) text b) Mitre attack group
- Mitre attack seems to have way more groups than I see in the diagram/table... how to access them when one is searching 
    - or where do i see a complete MITRE att&ck group table?
- Where can i just add text?
- Generally: not sure how to best use the tools yet
    - How to model a groupd like APT29 / UNC2452 ?
    - Here we haven't really modeled an event but it was rather about a group
- etc.

## Varia

- SOCKS: internet protocol for proxy functionality
    - https://de.wikipedia.org/wiki/SOCKS