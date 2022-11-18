# SSH Man in the middle
### Answers

1. Explain the steps above. Explain the purpose/meaning of each step
    - Answer: see below
2. Explain why public/key auth is really preventing MitM
    - Answer: Public/key cryptography is used for authentication when connection is established. Client will use private key - which no one else has access to - sign/encrypt and target server (ssh) uses the public key to verify that the encrypted connection that is being established is actually between the allowed client and not the man in the middle. 
3. Explain the purpose of editing the ssh client configuration
    Answer: disable password login, so authentication via public/key authentication is enforced (and no fallback to password) 
4. Explain why 2FA would not fix the problem of ssh MitM
    - authentication that prevents MitM has to be done when the connection is being established. The second factor in 2FA would have to be entered when we already have a connection, which potentially is a "man in the middle". 
5. What is the lesson learned?
    - Answer: password should not be enabled for ssh as it is vulnerable to MitM attacks (no warnings like we have in a browser)


### Steps and setting it up
for intel (see lab steps + video)

1. Get docker "alpine-ssh-mitm-legacy" via git
    - see tasks
2. build and run docker
    - `cd /home/hacker/alpine-ssh-mitm-legacy`
    - `docker-compose -f docker-compose-amd64.yml build` -> build docker image
    - `cat docker-compose-amd64.yml` -> just display file and see which docker file is used
    - `docker-compose -f docker-compose-amd64.yml up ` -> run 
3. start bash in docker and check processes (just to check)
    - `docker ps` -> see runnig docker processes (and also their id)
    - `docker exec -i -t ae8 bash` 
        - starts bash within docker. 
        - Params: "i": interactive, "t": allocate pseudo-TTY, "ae8": name/id of container we got from 'docker ps' (could be full id)
    - `netstat -antp` -> check ports and what program listens to it
4. In a bash outside docker connect via SSH to port 4444 (man in the middle)
    - `ssh -l hacker -p 4444 localhost `
        - will ask for password
        - on port we actually connect to man in the middle (and not directly to SSH)
            - therefore, password is visible in docker terminal (starten in step 2).
    - `exit` to close ssh connection (in ssh terminal of course)
5. Setup public key authentication for ssh
    - described in task. Basically, generate private/public key ("ss-keygen") and then make sure the ssh service within the docker uses the generated public key to authenticate the client. 
        - once password authentication is disabled, it is no longer possible to connect via man-in-the-middle (port 4444) as man in the middle cannot authenticate to ssh service.


