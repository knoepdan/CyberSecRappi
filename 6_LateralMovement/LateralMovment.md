# Lateral movement

## NTML

**NTML Authentication**
NTLM is available in "modern" windows alongside Keberos. Used when Kerberos is not working or supported. (Kerberos requires DNS, if DNS is not available, NTLM will be used). 
Disabling NTLM would break features, therefore disable is not usually not an option (not sure if it is even possible)

Authentication works with challenge response. In a Active Directory environment, the Domain controller will ultimatly validate the (challenged) response. For local accounts the local machine (or for home networks probably a server) will check the (challenged) response.

NTLM hash -> multiple names (when googling) -> actually is a MD4 hash

Where are NTML hashes stored:
- SAM: saves NTML hashes of local users
- LSASS process: caches NTML hashes o domain users
- Domain controller(s): stores NTML hashes of all domain users (NTDS.dit)



<div style="color:red">
TODO -> workflow 
when is ntml hash stored in 
- interactive session -> yess tsored in LSASS process
- service longon -> no  (check naming)

</div>

(Ab)using NTML hashes
- brute force 
    - possible (md for is not that strong + hashes are not even that strong
- pass-the-hash

**Pass the hash** -> attack
Basically just using the (stolen) hash to authenticate. (Password is not needed)

Example flow how pass-the-hash works (e.g. tool Mimikatz): 
    - will write into process of LSASS -> inserts (stolen) hash.. (in practice in multiple places). This is the actual attack
        - afterwards.. we can have a cmd tool that runs on that user. When we access another server, the "passed-the-hash" hash would be used to log on
        - Microsoft can detect such logon with a "passed-the-hash" hash (probably only in case when user of stolen hash has never logged on on the remote server ). Not 100% how Microsoft does it as it is not disclosed.
 

CrackMapExec -> tool for pass-the-hash

Microsoft has introduced an update (KB2871997) to mitigate vulnerabilities: 
- disables cleartext pw in memory by default
- Protected Users group -> NTML hash or users in that group will not be cached! (SSO is not possible, user has to enter pw)
- For local accounts only: Groups "Local account" -> cannot login from remote to machine

Microsoft Admin Tier Model -> main approach to limit pass-the-hash impact
    - Tier 0 -> highest privige (Domain controller)
    - Tier 1 -> servers (sensitive business data)
    - Tier 3 -> normal workstation
One Tier can usually not interact with another tier. However, every tier has an admin workstation, from which it is possible to "break" tiers in a way that pass-the-way is not possible. (e.g. from admin workstation in tier 3, user has to log on to server in tier 1 via RDP. from which pass-the-hash is not possible)
 -> sometimes instead to log on from admin workstation to the next tier, a jump host is used (a machine to connect between tiers)

**NTLM relaying** -> attack
scenario: attacker may only have anonymous access to internal networks. Attacker is already man in the middle 

Net-NTLM hash (also: "NTv2"): basically the encrypted NTLM hash. It is what is sent over the network   (not the same as NTLM hash)


Collecting Net-NTLM hashes
- passive: waiting for someone to authenticate... (tools like scanners)
- active
    - ARP
    - Poisoning LLMNR/NBT-NS  (fallback to resolve fileshare names when DNS not available)



Double hop problem
Not possible to jump when process is tied to a network logon. 
Example: attacker manages to access server via network logon. However, from there it is not possible to jump to the next server. -> So attacker needs to load credentials into current logon session. (so basically: to find an interactive session from someone so we can get NTML hash, or we build new logon session with ntml hash or inject ntml hash into current session)


## Kerberos
Protocol for authentication, default authentication in windows. 
Some aspects: 
- ticket based
- mutual authentication (no man in the middle)
    - Example: sql server would authenticate via "MSSQLSvc/ws1.winattacklab.local:1433"
- based on shared secrets
- temporary session keys

Building blocks
    - Authentication Server (AS)
        - basically returns a "Ticket Granting Ticket" (TGT) against credentials
    - Ticket Granting Server (TGS)
        - will provide a service ticket (ST) against a TGT for a particular service
            - ST is specific to a a service.. 

Workflow see diagram 


**"krbtgt" Account**
- built-in account or the KDC service
- is disabled (and cant be activated)
- its hash is used to encrypt TGT's 
    - therefore like a masterkey 
    - password is not changed automatically (so many AD's in practice still have the same)


**Overpass the hash** -> attack
-> like pass-the-hash for NTLM, just for kerberos
LSASS process stores tickets (TGT, ST)

**Pass the ticket** -> attack
Steal tickets
    - steal "Ticket Granting Ticket" TGT 
    - steal service ticket (ST)
How to get the tickets: with local admin rights possible to dump them from LSASS
(can be done via tools like Mimikatz, Cobalt Strike, Rubeus)


**Golden tickets (and silver ticket)**  -> attack
    - forged ticket-granting tickets (TGTs)
    - When we just forge a service ticket (ST) it is called silver ticket
    - Since all account policies are passed in tickets, we can forge autorisation data
        - group memberships, account disabled etc.)
        - it used to be even possible with non-existing users (no longer possible though)
*Remark: AD security boundary is the forest, not the domain. So if we get a golden ticket for a domain.. we can compromise the entire forest (see powerpoint)


**Kerberoasting** -> attack (cracking ticket)
Background: every user can request a ticket for any service, even if user has no right to it. With such a ticket, the password for the service ticket can be cracked.
-> possible because service accounts might have weak passwords and use a weak algorithm by default (RC4). Machine accounts passwords are strong and use a strong ciphery (AES), so this is (normally) not possible.
1. Find a user/service account with a service principal name (SPN)
2. Request a service ticket with RC4_HMAC_MD5 encryption and extract a hash from it
3. try crack password  (possible tools: hashcat, John the Ripper)
To avoid detection (OpSec considerations): dont just request service tickets for every user, ......




## Lateral movments leftovers
- Port forwarding
- Socks Pivoting
    - a bit like attacker machine can access ethernet interface of victim machine (and could for example create RDP sessions)
- password spraying & reuse (as many machines/services have same pw, or users use same pw)
    - less noisy than brute force as accounts are quickly locked. But even with password spraying one has to careful not to lock accounts (as usually even with password spraying one tries more than one password variant)
- Possibilities once attacker has access to domain controller
    - DC Sync -> get NTLM hashes of domain users (not stealthy when all at once)
    - create our own user (not stealthy)
    ..

## Persistence
How can an attacker keep a compromised machine when the machine is rebooted?
- Advantage: avoid re-compromising the machine
- Drawback: persistence could be detected
Aspects:
- where to store it
- when/how to start it


Some points: 
- add code in startup folder (easy to detect)
- registry to trigger start of application
- shortcut -> when user clicks malware starts (or a download of the software can be triggered.. etc.)
- scheduled tasks
    - Linux: cronjobs (or something like this)
- etc.


*Persistence is usually less important than lateral movment*


## Varia
- rainbow tables:  precalculated hashes
- Local Administrator Password Solution: LAPS
    - Active directory stores local passwords of local admins (to prevent having the same password for all local admins which was often done prior to it)
- helpful commands (windows)
    - `run net share` -> shows network shares
        - also shows hidden admin network shares like c$ and/or d$
    `run klist` -> show current kerberos tickets

- Windows credentials
    - Thread/Process > Token > Logon Session > Auth Package > Credential
