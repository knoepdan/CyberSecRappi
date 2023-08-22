# Linux

Not comprehensive at all as we focused on windows and is a broad topic.


## Priviledge escalation 

**SUID/GUID**
Linux file permissions allow to set SUID and GUID flags, which mean the file can be executed with the rights of the file owner (SUID) or group owner (GUID). This can be abused to elevate ones privileges.
How to find such files: `find / -perm /u+s,g+s -type f -ls 2>/dev/null`

**SUDO**
The sudo command allows to execute commands as another user (usually root). 
`whoami` -> user
`sudo whoami` -> root
If sudo is unrestricted, it allows direct privilege escalation. Sudo can be restricted to certain commands and require password (config "/etc/sudoers"). 

Links: 
- https://gtfobins.github.io/
- https://blog.compass-security.com/tag/sudo/

**Misconfigured read/write**
Files that other (priviledged) users could be modified and thus attacker can elevate priviledges. (basically works for all OS)
`find / -writable` find all writeble files
`grep -r -i -E "password|username|administrator|credential" / 2>/dev/null` try find sensitive info
`ls -l /home` check permission of users home directory

**Varia**
- LinEnum: script for local enumeration & privilege escalation (see pdf)
    - `curl -LO https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh` get script
    - `./LinEnum.sh -s -k keyword -r report -e /tmp/ -t` -> execute with a given user
- LinPEAS -> script/tool
- Lynis -> security tool
- also good https://book.hacktricks.xyz/linux-unix/linux-privilege-escalation-checklist

Also see "05D Privilege Escalation.pdf"

## Lateral movement

- Port forwarding (to bypass firewalls or avoid traffic inspection, prevent being detected)
    - `ssh -L localhost:3389:127.0.0.1:3389 root@[target host]` SSH tunneling of a specific port
    - `ssh -D 9050 root@[target host]` application-level port forwarding acting as SOCKS server


## Linux forensic
- just basic info here.. 
- as of now (2023) attackers rarely care to hide their actions (more so on linux than on windows)
- usually attacker will save something in /tmp (because of the write permissions)
- often interesting:
    - bash history
    - etc.
- when in doubt: compare with an distribution/imag and compare
- Logins log:  /var/log/utmp, var/log/wtmp, /ar/log/btmp
- Useful command will extract all readable characters (even binary files)
    `strings someFile`