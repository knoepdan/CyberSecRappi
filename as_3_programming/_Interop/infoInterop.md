# Interopability between languages

Since some developers have a preference for some languages but a few things are useful in others, it can make sense (sometimes) to use 2 languages where a script in one language calls another and then uses the output for further processing. Especially in a exam scenario where time is of crucial, this can be useful.


Generally, the challenge is: 
- how to call (usually very simple, but it doesnt hurt to have an example)
- how to await (usually also simple)
- how to pass params
- how to use return value 
    - One possibility is always to write info into a file and then read it with the next script (not elegant though) 

*Remark 1: info here might not exclusivly about interoperability*
*Remark 2: Not all aspects are always shown*

## Windows

**bat files**
Call other scripts
- Generally use "CALL" to await outcome
- `CALL other.bat paramOne paramTwo` 
    - in other.bat we can access params by %1%. %2% 
        ``` 
           IF NOT "%1%"==""  
	        %OTHERVAR% run %1%
        ```
- `call npm i`  (without should also work but then we don't await )
- `node someJsScript.js`   (we don't use call because we don't await. Usually we would also use call (not tested here))
- `PowerShell.exe -NoProfile -ExecutionPolicy Bypass -Command "& { Start-Process PowerShell.exe -ArgumentList '-NoProfile -ExecutionPolicy Bypass  -File ""%~dp0\copy-icons.ps1 ""' -Verb RunAs }"`  (often use `@ECHO OFF` before calling)


**Powershell**
Should be preinstalled run in powershell window or call via bat
- Call a bat file (multiple ways)
    - `Invoke-Expression -Command ".\testPS.bat"`
    - `Start-Process -FilePath "C:\PathToBatFile\FileToExecute.bat" -ArgumentList $argstr -Wait -NoNewWindow`
    - https://java2blog.com/run-batch-file-powershell/


**C# scripting .csx**
Based on .Net Core:   https://github.com/dotnet-script/dotnet-script
`dotnet script helloworld.csx`

Some more links and infos
- https://visualstudiomagazine.com/articles/2021/06/14/csharp-scripting.aspx
- https://learn.microsoft.com/en-us/archive/msdn-magazine/2016/january/essential-net-csharp-scripting
- attention there are some older versions of .net scripting (Nake, ScriptCS) which are not necessarily compatible

**node**
Requires node to be installed
`node scriptsFolder/nameOfScript.js`  (see example script build.js)
