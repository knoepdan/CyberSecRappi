# Cobal strike
Software for Adversary Simulations and Red Team Operations. Using beacons (agents) in infected clients.
https://www.cobaltstrike.com/

**Situational awareness**
- Screenshots: `screenshot -p <path> -q <quality>`
-  Clipboard: via powershell "Start-ClipboardMonitor.ps1"
- KeePass (open source password manager) -> when unlocked passwords can be read from memory


**Credential abuse**
Examples:
- extract local credentials with the help of Mimikatz
- DcSync 
- Impersonating tokens

Cobalt strike will store the passwords

**Lateral movement**
- Span a new beacon
    - `jump [module] [target] [listener]` via varios means: psexec, ssh, winrm, etc. 
- Remotely run a command
    - `remote-exec [module] [target] [command+args]` via varios means: psexec, winrm, wmi 

Attention: WMI or WinRM use "Network Logon" Sessions, credentials are not sent and available remote system. So one has to steal another token that points to a non-network logon session. (otherwise "Douple-Hop is not possible)

Furthermore, SOCKS Pivoting is possible (see "Pivot traffic/tools into network")

see pdf "06B Lateral Movement.pdf"