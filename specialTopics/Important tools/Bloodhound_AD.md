# Bloodhound
BloodHound uses graph theory to reveal the hidden and often unintended relationships within an Active Directory environment.

### Collect data with SharpHound (on windows)
To collect data about the active directory, we can use Sharphound (in lab was found here: c:\temp\tools\SharpHound)
`\SharpHound.exe -c All,GPOLocalGroup` > will create a zip file with AD data

**Loop**
Just generate zip once might not be enough, so we can do this continuously to get more info (as users are constantly log on/off)
`.\SharpHound.exe  -c Session,LoggedOn --loop` -> loop and continuously generate zip files that can be imported (dragged) into bloodhound