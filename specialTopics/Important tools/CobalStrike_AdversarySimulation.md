# Cobal strike
Software for Adversary Simulations and Red Team Operations. Using beacons (agents) in infected clients.
https://www.cobaltstrike.com/
*Cobalt strike can make use of other tools like Mimikatz as well*

## Situational awareness**
- Screenshots: `screenshot -p <path> -q <quality>`
-  Clipboard: via powershell "Start-ClipboardMonitor.ps1"
- KeePass (open source password manager) -> when unlocked passwords can be read from memory


## Credential abuse
Examples:
- extract local credentials with the help of Mimikatz
- DcSync 
- Impersonating tokens

Cobalt strike will store the passwords

## Lateral movement
- Span a new beacon
    - `jump [module] [target] [listener]` via varios means: psexec, ssh, winrm, etc. 
- Remotely run a command
    - `remote-exec [module] [target] [command+args]` via varios means: psexec, winrm, wmi 

Attention: WMI or WinRM use "Network Logon" Sessions, credentials are not sent and available remote system. So one has to steal another token that points to a non-network logon session. (otherwise "Douple-Hop is not possible)

Furthermore, SOCKS Pivoting is possible (see "Pivot traffic/tools into network")

*see pdf "06B Lateral Movement.pdf"*

**Kerberos** (also lateral movmement)
- Over-pass-the-hash: `pth [DOMAIN\user] [NTLM hash]` will use Mimikatz’s sekurlsa::pth as well:
- Pass-the-ticket
- Golden Ticket (via Mimikatz)
    - silver ticket also works as very similar

**Persistance**
Not built in commands for persistance but scripts can be found: 
https://github.com/harleyQu1nn/AggressorScripts/tree/master/Persistence