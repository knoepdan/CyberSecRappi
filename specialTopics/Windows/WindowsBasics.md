# Windows


## UAC


- Integrity levels
    - Low
    - Medium
    - High  (admin) -> possible to switch to System
    - System (system) -> possible to switch to High
- Possible to see under which integrity level a process runs in Task manager: Elevated (probably to be added). Also good tools: "Process explorer" and/or "Process monitor" (shows exact integrity level). Or `whoami /priv` -> shows current privileges. 
    - most important is often the one to debug
- Bypass UAC (no popup for the user to click)
    - usually a combination of Auto-Elevation, Dll hijacking/sideloading
    - to bypass UAC one needs a user with admin rights already (of course as otherwise there would be nothing to bypa