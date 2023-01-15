


## NTML


LSASS process > keeps the NTLM hash in memory on the machine the user is typing password

## To check
- when does a login leave a ntml hash in LSASS
    - network logon does NOT leave NTML hash in LSASS process
    - interactive logon will leave NTML hash in LSASS process
        - but when is a login interactive and when not???
    - RDP -> special case
        - Restricted admin mode: login as "network logon" (no NTML hash in LSASS) -> no NTLM hash on in LSASS on the server
            - but now vulnerable to "pass-the-hash"
        - https://www.eshlomo.us/restricted-rdp-for-admin-restrictedadmin/
    


## Leftovers

**UAC in windows**
- Integrity levels
    - Low
    - Medium
    - High  (admin) -> possible to switch to System
    - System (system) -> possible to switch to High
- Possible to see under which integrity level a process runs in Task manager: Elevated (probably to be added). Also good tools: "Process explorer" and/or "Process monitor" (shows exact integrity level). Or `whoami /priv` -> shows current privileges. 
    - most important is often the one to debug
- Bypass UAC (no popup for the user to click)
    - to bypass UAC one needs a user with admin rights already (of course as otherwise there would be nothing to bypass)
    - Some examples on how to do it: 
        - AlwaysInstallElevated: AD Group policies which set to true.. makes the msi's run as admin. 
        - Unattended Installation files (sometimes pw can be found in them)
        - Service binaries that one has write access and will be executed as admin
            - or generally any file that is executed with another user. (would be privilege escalation to another user)
        - Hijack Execution flow
            - if dll use is not immediatly found, windows will search different places to find the place. If attacker has write privileges in one of these places, it is possible to place "infected" dlls there. 
                - Vulnerability: "Unquoted Service Paths"
                - path variables (mentioned above)
    - etc.
