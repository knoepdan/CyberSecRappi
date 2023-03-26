# Username enumeration

## Answers

1. Explain the security problem
    - using trial and error we can find out what usernames exists. This can be user for other attacks: 
        - password spraying
        - brute force attacks
        - account locking
        - social engineering
2. Explain your attack (exploit, screenshot, hacking journal)
    - see below (simple trial error approach)
3. Explain mitigation (remedy)
    - Feedback which does not indicate whether username exists or not (better user feedback: "username or password incorrect")


## Steps

1. Go to login of website (Glocken Emil)
2. Try login with wrong password or wrong username
    - User feedback if user exists or not: possible to find all usernames with trial and error
3. Try to find some users (trial and error)
    - Found: "admin", "root"
        - other usernames I tried usernames that don't exist: "superadmin"
    - in a real attack: i would automate the process (brute force) and probably use a list of usernames: 
        - https://github.com/danielmiessler/SecLists/tree/master/Usernames
        - https://github.com/jeanphorn/wordlist/blob/master/usernames.txt
        - (just trying with the most common characters would also be possible (basically nof available characters powered by possible max length of username )