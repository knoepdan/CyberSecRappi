# Bloodhound
BloodHound uses graph theory to reveal the hidden and often unintended relationships within an Active Directory environment.


### Basics

**installation**
to install on live-cd: `apt-get install hl-bloodhound`

**start**
1. start one terminal (bash): `sudo neo4j console` 
    - wait till "Started." appears
2. start another terminal (bash) and enter: `BloodHound`
    - Ui will open
    - user: neo4j / password: compass

**Recommended setting**
Set the following settings: 
- Edge label Display:  Always Display
- Node Label Display: Always Display

### Collect data with SharpHound (on windows)
To collect data about the active directory, we can use Sharphound (in lab was found here: c:\temp\tools\SharpHound)
`\SharpHound.exe -c All,GPOLocalGroup` > will create a zip file with AD data

**Loop**
Just generate zip once might not be enough, so we can do this continuously to get more info (as users are constantly log on/off)
`.\SharpHound.exe  -c Session,LoggedOn --loop` -> loop and continuously generate zip files that can be imported (dragged) into bloodhound

**Import in Bloodhound**
1. just drag'n drop the zip file onto the empty GUI of bloodhound
2. Go to Menu > "Refresh Database Stats." (maybe scrolling down is necessary)
    - now we should see the imported objects

### Basics

**Search**
By entering names (user/computers) in textbox next to menu

**Varia**
- check Node Info 
    - click on property to update ui
- Analysis
    - has useful queries: "Shortest paths to Domain Admins from Owned Principals*

**Tips**
- mark target (e.g. Domain admin) as "High Value"
- Mark compromised accounts/machines as "owned" 

also see labtask "Maintaining Access/AD Information Gathering & Analysis" ff