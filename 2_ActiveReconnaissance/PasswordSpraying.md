# Password Spraying 

Basics: try finding a password by using the same (usually common) password and different accounts names. 


**Tool to prevent against it**
Fail2ban -> will count number failed logins and one can add a treshold (e.g. 10), and an action if treshold is reached. (example block IP or 10 minutes)

**How to circumvent Fail2Ban**
- Change IP (for example using a proxy)



**Excercise notes**
Simple connect via SSH
- Trying to connect via ssh and user "user_100000" to "pwspray.vm.vuln.land":  
    - `ssh user_100000@pwspray.vm.vuln.land`
    In a shell script: https://stackoverflow.com/questions/12202587/automatically-enter-ssh-password-with-script 
    - maybe also disable host key checking (easy to google)

