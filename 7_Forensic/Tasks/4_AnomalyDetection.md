# Anomaly detection

## Answers

- What files are out of place?
    - MdScan.exe  (creation date, not signed)
    - svcchoste.exe  (name, entropy: doesn't seem to be an exe file)
    - a lot of files that should probably be signed are unsigned (e.g: Windows.UI.Logon.dll)
- Why are said files out of place?
    - MdScan.exe: 
        - Creation date doesn't really make sense. Most files are created in 2019 or later (which could be due to updates). However, a file with a creation date 2006 is extremly unlikely. (There are other dlls with with creation date around 2011 and maybe even 2016 which are a bit strange but these seem to be signed, and maybe they are here just for backwards compatibility. are also suspicious. 
        - File is not signed (and not from microsoft)
    - svcchoste.exe 
        - Very low densitiy (below 0.1)
        - Name is very suspicious
- How did you do your analysis?
    1. checked dates 
        - MdScan.exe seems very much out of place
    2. run sigcheck -> see which files are unsigned
        - MdScan.exe is unsigned
        - (also a multitude of other files are unsinged)
    3. run densityScout
        - Result: a multitude of dll/exe as a density that is suspiciously low
        - svcchost.exe 
    4. Cross check
        - mainly signed and density

General result: 
Files that are out of place were found and potentially/probably malicious. Furthermore, a quite a lot of the dll's were unsigned. I would compare these files with an installation that is not infected. Any installation with such a System32 directory is not to be trusted
