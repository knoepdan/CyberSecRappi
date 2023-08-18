# Management links and tools

*Remark: there is some overlap with tools and links that are more technical.*


**CVE Common Vulnerabilities and Exposures**
- https://www.cve.org/
    - Specific vulnerabilities (product related)
    - search: https://cve.mitre.org/cve/search_cve_list.html
        - Attention: might be moved to a new site soon (15.8.2023)
    - https://cve.mitre.org  (potentially old site)
**CWE Common Weakness enumeration**
    - classification of weaknesses (usually not directly product related): example cross-site scripting
    - https://www.cvedetails.com/cwe-definitions.php
**ASVS Application Security Verification Standard**
    - intended mainly for developers (managed by OWASP)
    - ASVS -> basically a list of recommendations
        - ASVS level 1: recommendation for all apps (example: encoding)
        - ASVS level 2: 
        - ASVS level 3: for high security applications (e.g. nuclear plant)
    - https://github.com/OWASP/ASVS/ main page
        - https://owasp.org/www-pdf-archive/OWASP_Application_Security_Verification_Standard_4.0-en.pdf  (example)

*Also see details in 01_unterricht folder*

**Vulnerability databases** usually (always?) have CVE assigned
- https://nvd.nist.gov/
- https://www.cvedetails.com/
- https://www.exploit-db.com/
- https://cve.mitre.org/  (again)


### Traffic light Protokoll (TLP)

- TLP:Red
    - Don't distribute info at all.
- TLP:AMBER
    - distribute within the organsation on a need-to-know basis
- TLP:Green
    - distribute within the organisation and their partners but NOT publicly
- TLP:WHITE
    - information can be distributed freely and publicly (except maybe for copyright issues.. but thats not covered by TLP)

### Varia

<span style="color:orange">
see
- check 2_£ActiveReconnaissance/Vulnerability.md
- check 9_CyberThreatIntelligence
etc...
 </span>

 (maybe also distinguish between tools that are to be used for attacks and other tools helpful for analysy (e.g. wireshark) .... but its probably very difficult to draw a line here)