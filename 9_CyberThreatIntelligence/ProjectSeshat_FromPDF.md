# Project Seshat

Taken from the pdf used in classes, i assembled all information regarding "Project Seshat" which was to demonstrate what would have to be done during the CTI life cylcle (info was scattered in 100 paged pdf) 

## Intelligence cycle for project "Seshat"

**1. Planning & Requirements**
Our Company is about to launch a brand new product in the field of press release management
(codename “Seshat”).

The board of directory and executive committee wants to protect the IP and final product as good as possible.
-  The RFI is submitted:
- What known threat actors are after market-sensitive, non-public information?
- How have they attacked in the past and how do they operate to achieve their goals?
- Are our current security controls sufficient or do we need to invest into new controls?

**2. Collection**
Describe the comanpy product in simple terms and keywords
- What information sources do we have?
- Vendor feeds and reports
- What OSINT reports are there? Can we use them to find vendor reports?
- OSINT report we found in our collection
    - https://money.cnn.com/2015/08/11/investing/hacked-stock-press-release-indictment/
- From here we found “iermolovychvadym_information.pdf”, the US DOJ indictment document

**3. Processing**
- From the DOJ document, extract details from the PDF into easier formats
- Identify TTPs, actor names, malware names and process that
- Actor: “Vadym Iermolovych” (aka ”Dima”, “Dingos777”, …)
- TTPs: SQL injections (T1190), reverse shell, phishing (likely), spoofing, brute force attack 

**4. Analysis**
- We are lucky, the DOJ indictment is an
excellent reference (I love such reports)
- Enrich the TTPs, understand if you need to
collect additional data
    - https://www.justice.gov/usao-nj/pr/ukrainianhacker-
admits-role-largest-known-computerhacking-
and-securities-fraud-scheme
    - https://www.justice.gov/usao-nj/pr/hackersentenced-
30-months-prison-role-largestknown-
computer-hacking-and-securities
- Do we have our answers for the
stakeholder’s RFI?


**5. Dissemination**
- In our example we disseminate a PDF based report by email.
- Our reporting emphasizes on the attackers methods to breach a network or application
    - SQL injection, brute forcing, password re-use, VPN access
- Given the importance of the project and discovery of SQL injection attacks, we inform the SOC
that they should evaluate SQL alerts and detection capability.
    - Keep “need to know”-principle in mind when disseminating


*Remark: plus later asking for feedback*


## Steps and Info

**Summary of PDF Court case**
Vadym Iermolovych (who also has other names) and his Co-consipirators  is accused of: 
- hacked into the computer network of "Marketwired", "PRN"  and "Business Wire"
- stole confidential information
- gave the info to traders the stolen nonpublic information (generating around 30 million in profits)
Attack: 
- sql injection attack ("MarketWire" "Business WIRE" )
- creating reverse shells
- gained access to credentials of employees, that were used to gain access to confidential info (Brute fore attacks and - if i got this right - found somewhere)
- attackers also purchased a database with "PRN" logins



## Leftovers

**Abreviations**
- TIP: Thread intelligence platform
- RFI: Request for information
- TTP: Tactic's, Technisques and Procedures
- ISACs or ISAC: ISAC Information sharing and analysis centers
    - nonprofit organization that provides central resurce for gathering ino on cyber threats
    - nonprofit organization that provides central resurce for gathering ino on cyber threats
        - example: email groups, forum, chats etc.
        - known exampes: FS-ISAC, H-ISAC, MS-ISAC, FI-ISAC, ENISA


