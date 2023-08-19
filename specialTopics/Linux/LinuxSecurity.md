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