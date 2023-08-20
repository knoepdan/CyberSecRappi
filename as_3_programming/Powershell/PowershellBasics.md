# Powershell Basics

*Remark: not part of the course but can be useful*


### basic commands
- Variable assignment: `Set-Variable foo "bar"`
- Test file existence: `Test-Path $file`
- empty check: `$var -eq $null`
- Negation: `! ($expr)`
- Echo: `Write-Host $text`
- Set language: `powershell -c "Set-WinUserLanguageList -LanguageList de-ch -Force"`
- Whoami: `whoami`
    `whoami /groups` see which groups user belongs to (does not mean process runs elevated when in admin group, labels "Mandatory Level HIGH" indicate this)
- Ip configuration: `ipconfig`
- show local users: `net user`
- inspect user: `net user username`
- create local admin: `net user /add hacker Hacker@Work && net localgroup administrators hacker /add`
    - username "hacker", password "Hacker@Work"


*Remark: some commands would also work in CMD*

**Security policy**
- `powershell.exe -ep bypass`  open a new powershell to bypass security policy
    - already in a session: `Set-ExecutionPolicy Unrestricted`
- %appdata%\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt  -> logs (if enabled, which it is by default)


