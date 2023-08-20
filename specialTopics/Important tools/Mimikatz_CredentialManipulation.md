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