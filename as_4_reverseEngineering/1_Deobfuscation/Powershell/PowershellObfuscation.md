


## Powershell deobfuscation with Cyberchef

Steps done with Cyberchef
1. decoded from base64
2. Removed 0 bytes (visible as punctuation)
    - To Hex
    - Replace 00 with empty string
    - From Hex
3. Improved string readability  (as far as I could tell this would not affect actual functionality)
    - to lowercase
    - replaced "`" with ""  (unnecessary characters)
    - undid string decomposition: replaced "'+'" with "" and similar via multiple find/replace  (regex would have worked too)
Other techniques used which were not solved with cybechef  (these steps I would solve manuall one by one)
- string formatting:  [type]("{2}{3}{5}{0}{4}{1}" -f 're','ry','sy','ste','cto','m.io.di')
- string changes (replace with values from array)
- null assignments 
- meaningless variable names. Exampler:  ;$xap1lma
- unnecessary language characters (e.g. brackets)
- run code in string (dynamic code)

Next steps would be to manually look at parts of the code and deobfuscate it and if it is safe run parts of it to check (see codeSnippets.ps1)

What script does (my understanding as of now)
1. Create a directory
2. download a file and safe it to this directory
3. Run the file


## Deobfuscation with PSDecode

1. Step one: install PSDecode + cut internet connection in VM
2. Create file PowerShellinput.ps1 which contains the base64 encoded part of "PowerShellInput.txt" (the actual powershell part)
3. Run `PSDecode .\PowerShellInput.ps1` 

Output of 
![Output PSDecode](PSDecodeOutput.png)
(also see PSDecodedOutput.txt)

## Notes/Varia
https://www.csnp.org/post/cyberchef-data-decoding-made-easy