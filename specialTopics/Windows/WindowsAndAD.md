# Windows and Active directory

Active directory is a directory service (db) to manage computers, servers and users, printers.... It is based on LDAP, NTLM, Kerberos, DNS and other protocols.
Objects can be grouped in Organizational Units (OU). 
Generally a big target for attackers. 

## AD Basics

**Structure**
- Forest  (Collection of trees, Security boundary, AD instance, there can be trust between 2 forests )
    - Tree (collection of one or more domains or trees)
        - Domains

**Security Prinicpals**
- Entity that can be authenticated
- SID (Security identifier): uniquely identifies a security principal
    - Access control decisions are based on SID's

**Access control List ACL**
An access control list defines permissions (allowed, denied, audited) on an object (trustee).
An ACL consists of: 
- Discretionary Access Control (DACL): basically permissions for object
- System Access Control (SACL): enables admisn to log

**Group Policy Objects (GPO)**
Administrator-defined specifications of policy settings applied to users, groups or computers

**Administrators**
- BUILTIN\Administrators
    - local admin access on domain controller
- Domain Admins
    - access to all resources
- Enterprise admins
- .....

## Active Directory Varia

**Collect info about AD**
- Native tools: ADUC, nltest, net xyz, WMI
    - Net commands
        - `net user alice [/domain]`
        - `net localgroup Administrators`
        - `net group "Domain Admins" /domain`
        - `net share`
        - `net account`
    - WMI
        - `wmic NTDOMAIN GET DomainControllerAddress,DomainName,Roles /VALUE`
        - `wmic process call create "cmd.exe /c calc.exe"` dummy example
- Sysinternals tools: ADExplorer
    - if you don't have ADUC, use this
- PowerView (powershell tools)
    - see pdf "05E AD Situational Awareness.pdf"
- BloodHound (used in exercise)
- etc. (LDAP clients, PingCastle...)

## Attack AD

**Common pitfalls / misconfigurations**
- no segregation of privileged access (highly privileged admins log on to clients)
- weak passwords
- same local admin password on all machines
- lack of least-privilege principle etc.

AD infrastructure can be complex and hard to get it right.

**How to attack**
1. What is my target
    - identify computer names that we need to compromise to reach our target
2. Wo has control on the target
    - identify local administrator accounts
3. Where is the person who has control
Best to use a tool like bloodhound for this


**Attack varia**
Often important: 
- which user has permissions to the service/machine I want (not always necessary to be admin)
- Know who is logged in to which computer.


## ---------- Leftovers/Varia -------------
### NTML

LSASS process > keeps the NTLM hash in memory on the machine the user is typing password

### To check
- when does a login leave a ntml hash in LSASS
    - network logon does NOT leave NTML hash in LSASS process
    - interactive logon will leave NTML hash in LSASS process
        - but when is a login interactive and when not???
    - RDP -> special case
        - Restricted admin mode: login as "network logon" (no NTML hash in LSASS) -> no NTLM hash on in LSASS on the server
            - but now vulnerable to "pass-the-hash"
        - https://www.eshlomo.us/restricted-rdp-for-admin-restrictedadmin/
    

