# Varia

### Theia IDE (for php)
amazing online IDE for php (maybe others?)

Check errors in terminal: 
`tail /config/log/nginx/error.log`


Example how Theia is used in the hacking lab: 

IDE: https://4d58e319-c098-42af-8957-7302d3726104.idocker.vuln.land/theia/#/home/theia/workspace.theia-workspace
Site developed in IDE: https://4d58e319-c098-42af-8957-7302d3726104.idocker.vuln.land/basics.php

### Browser tools + extensions

CTRL+Shift+R -> clear browser cache
Ctrl+F5  -> clear browser cache in windows+linux (but not mac)



**Browser extensions**
- HackBar V2 by chewbaka 
    - useful for tampering with urls


**Proxies**
- Burp (linux-> default localhost:8080)
- ZAP (linux-> default localhost:8080)
- Fiddler (windows)


**open chrome with security disabled**
- `google-chrome --disable-web-security --no-sandbox --password-store=basic`  worked 15.10. (not 100% sure.. though)
- `google-chrome --disable-web-security --no-sandbox --user-data-dir=/tmp/cyberchef` 
    - according to task.. didnt work though (maybe run as root)
- CTRL + ALT + u  -> should also work on VM (tried not working)
- Finding: 
    - passed directory has to exist (probably)
    - seems to be working on windows (but not on linux VM, chrome is opened but could not get CORS requests to work, maybe because not started as root)


https://www.code4it.dev/blog/run-google-chrome-without-cors 

### Urls
https://coveryourtracks.eff.org/ -> location of ip

https://coveryourtracks.eff.org/ -> fingerprinting