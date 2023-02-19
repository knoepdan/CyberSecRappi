# Powershell Basics

*Remark: not part of the course but can be useful*


### basic commands
- Variable assignment: `Set-Variable foo "bar"`
- Test file existence: `Test-Path $file`
- empty check: `$var -eq $null`
- Negation: `! ($expr)`
-  Echo: `Write-Host $text`



**Security policy**
- `powershell.exe -ep bypass`  open a new powershell to bypass security policy
    - already in a session: `Set-ExecutionPolicy Unrestricted`
- %appdata%\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt  -> logs (if enabled, which it is by default)


