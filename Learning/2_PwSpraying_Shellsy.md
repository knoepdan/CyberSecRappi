# Varia

## Password spraying
Try to login with different users and same password (instead of same user different pw)
Tool fail2ban will lock IP after too many failed login attempts. (can be bypassed by changing IP via tools as proxychain or toor etc.)
https://www.youtube.com/watch?v=vkeb0pWYDr8


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

**Web Shell**
A web shell is a shell-like interface that enables a web server to be remotely accessed. The user (attacker) can enter commands via browser and commands are sent via http Get (or post) requests.

For this to happen, the webserver has to host the web shell (which might be done by an exploit: for example via a file upload "webshell.php" that is then executed, or sql injection)
*Remark: probably not so easy to detect by firewalls as commands are normal http requests which are usually allowed* 
