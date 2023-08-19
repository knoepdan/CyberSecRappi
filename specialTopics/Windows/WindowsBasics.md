# Windows


## UAC
- Integrity levels
    - Low
    - Medium
    - High  (admin) -> possible to switch to System
    - System (system) -> possible to switch to High
- Possible to see under which integrity level a process runs in Task manager: Elevated (probably to be added). Also good tools: "Process explorer" and/or "Process monitor" (shows exact integrity level). 
    - `whoami /priv` -> shows current privileges. 
- See privileges of other process
    - Powershell: `Get-TokenPrivs -ProcID 4848`
- Most important privilege is often "SeDebugPrivilege" as it allows to debug (and read memory)
- Bypass UAC (no popup for the user to click)
    - repo with ways to bypass UAC: https://github.com/hfiref0x/UACME
    - usually a combination of Auto-Elevation, Dll hijacking/sideloading
        - as some programs auto-elevate by default (as signed by microsoft) but possible do smuggle in my own dll. 
            - find auto-elevate programs: `Strings.exe -s *.exe | findstr /I "<autoElevate>true</autoElevate>“`
    - to bypass UAC one needs a user with admin rights already (of course as otherwise there would be nothing to bypass)
    - Tools like Cobalt Strike also support bypassing UAC