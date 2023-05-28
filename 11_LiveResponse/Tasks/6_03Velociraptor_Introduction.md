# Velociraptor Introduction

Now that you have the Velociraptor deployment running, let's collect some Artifacts. As you may know, Sysinternals tools create a registry key when they're first run. On Forensic.winattacklab.local and using Velociraptor, find out which Sysinternals tools have been run by users on the system.

To demonstrate the abilities of Velociraptor, do this in three different ways:

1. Manually look through the registry
2. Design your own VQL query and use the Notebook
3. Run a hunt on only Forensic to get the information


## Plan for VQL
1. load ntuser.dat files of all users into registry
    - maybe leave this part out at first and just check current registry
    - or dont load them into registry but use a function to still be able to parse it
2. check registry key -> using eulach flag
3. print out which users have that
-> safe it as artefact and start a hunt


------------
get all files

SELECT FullPath FROM glob(globs="C:/Users/**/ntuser.dat")

-------



## Steps/Hints

**Step 2 reg **

`SELECT * FROM glob(globs="HKEY_USERS/*/Software/SysInternals/**/", accessor="reg")`


**Step 3 ntuser.dat**

VQL to get ntuser.dat files of all users: `SELECT FullPath FROM glob(globs="C:/Users/**/ntuser.dat")`

**Step 4 glob**
https://docs.velociraptor.app/vql_reference/plugin/glob/
```
SELECT FullPath FROM glob(
globs="C:/Temp/*.txt")
```

```
SELECT FullPath FROM glob(
globs="C:/Temp/*.txt", accessor="ntfs")
```

*Remark: must be forward slashes*

**Hint 3 - Use raw_reg accessor**


## Varia/Leftovers
Trigger intelisense:  CTRL + Space


Unload registry: `reg load HKU\gugus`  (only needed if previously loaded)