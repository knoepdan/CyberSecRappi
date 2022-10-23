#Tools and varia


**Cyber-chef**
https://gchq.github.io/CyberChef 

- To execute http request, make sure CORS is not enabled (disable CORS)
- Some concepts/features to know: 
    - recipe (saving/loading)
    - forking
    - register: variables 

**open chrome with security disabled**
- `google-chrome --disable-web-security --no-sandbox --password-store=basic`  worked 15.10. (not 100% sure.. though)
- `google-chrome --disable-web-security --no-sandbox --user-data-dir=/tmp/cyberchef` 
    - according to task.. didnt work though (maybe run as root)
- CTRL + ALT + u  -> should also work on VM (tried not working)
- Finding: 
    - passed directory has to exist (probably)
    - seems to be working on windows (but not on linux VM, chrome is opened but could not get CORS requests to work, maybe because not started as root)


https://www.code4it.dev/blog/run-google-chrome-without-cors 

For example possible to execute cross domain requests.

**git via command line**
Example
`git clone https://github.com/ibuetler/python3-beautifulsoup-crawl-webpage.git`ls
