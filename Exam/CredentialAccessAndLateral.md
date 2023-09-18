# Credential Access & Lateral movement

Start 16:14




## Tasks
**Analyze the Bloodhound data collection in order to find valid attack paths**
-> bloodhound could not analyze the upload :-( File 20221209125412_BloodHond.zip deemed incompatible
So I had to unzip it, and then import the 3 zip files one by one. (hope order is not relevant)



**Analyze the LSASS memory dump in order to access credentials of logged-on users/accounts**
1. download lsass file lsass.DMP
2. Use pypykatz to analze memory
    - `pypykatz lsa minidump lsass.DMP >> pypkatzMini.log`
    - open the generated log with an editor (vscode)
3. Analyze
    - I get infos about the following users (some builtin/service...):
        - "aalfort"
        - "DWM-4"
        - "tmassie"
        - "UMFD-3"
        - "support"
        - "cclear"
        - "FS2$"
        - ...
## Answer the following questions
- Explain at least one valid attack path allowing you to gain domain administrator privileges

    1. fs2.winattacklab.local cclear (starting point)
    2. WS1.WINATTACKLAB.LOCAL
    3. FFAST@WINDATTACKLAB.LOCAL (has session to WS1)
        - is member of Domain admin group
- List all credentials that you managed to extract from the given LSASS memory dump
    List of NTLM hashes  (MSV>NT)
        - allfort
            - 9859340265d3b3c1eb628ece70ebc238
        - tmassie
            - 8cf0345c0d74a3efeb598489493cf47b
        - support
            - 88d52377e3d3a20accba24ee55a9ce2b
        - cclear
            - 70586bc2191f0a0872798bcb30c7fcdf
        - Remark: i excluded other builtin accounts
- Which of the extracted credentials will help you to eventually become domain admin (following the identified attack path)?
- Which well-known attack technique are you going to use in order to authenticate using the stolen credentials?
    - I assume "pass-the-hash" as I can authenticate as such a user when i got hold of the NTLM hash
- Given the connectivity is provided, can you use RDP to make the first jump? => Answer is only accepted with a valid explanation why!
    - no, I need the password in cleartext    
- Alternatively, which lateral movement techniques are commonly used to execute code on the remote host?
    - When I got hold of someones credentials that has right to do so (found in a config, hash cracked, pwspraying or pishing), i can use windows built in services to move laterally
        - Create a scheduled task on remote host
        - Use PsExec
        - WMI
        - Windows remoting
        - DCOM



### Varia
**run bloodhound**
1. start one non-root terminal (bash): `sudo neo4j console` 
    - wait till "Started." appears
2. start another non-root terminal (bash) and enter: `bloodhound`  (no capital letters!!)
    - Ui will open
    - user: neo4j / password: compass

**pypykatz**
`apt-get install python3-pypykat`