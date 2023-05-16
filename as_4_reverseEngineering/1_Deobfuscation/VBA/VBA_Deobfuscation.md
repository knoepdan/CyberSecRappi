


# VBA deobfuscation

## 2.1.1 Manual deobfuscation

1. Run olevba to extract the obfuscated code inside the maldoc.
    - See steps below
2. Have a look at the code.
   1. How is the execution of the code triggered?
      - Answer: when document is opened: "Private Sub Document_open()"   (also result of olevba analys)
   2. What obfuscation techniques have been used?
     - Answer: 
       - Name mangling (meaningless names)
       - Control flow Rerouting -> lots of labels and Goto statements to make it harder to follow execution flow
       - Lots of dead code
       - Identity operations (mainly with not initialized variables) 
       - Data transformations (string concatenations)
       - There seems to be some base64 encoding (detected by oleva) which seems to be hex. However, to me it seems that this part of the code was not used at all.
            - with Vibermonkey, it is clear that a Powershell script is started. The script itself is base64 encoded (and further obfuscated) but I could not get/see from the output of olevba 
3. See how far you get with manual deobfuscation of the code.
   1. Describe the steps you took.
        - Starting from the initially executed function, i started to rename labels, functions, variables by type (e.g. labelAA, inputString) etc. 
        - Merged some string initialization
        - Removed (or outcommented) unnecessary code, like unnecessary label jumps
          - most labels are unnecessary and the entire code can be shrinked
          - (most of the renames I did were obsolete after this point)
        - end result see "extractedCode.vb"  (contains some dummy code to ensure actual code is never executed)
   2. Any idea what the VBA part of this malware does?
        - it creates a winmgmts:win32_process object which in turn creates another object
          - It passes some treated form of Tvh1u8793dltn9.Content but was not able determine what the value of this is
          - It seems to create/start and object (process)
            - with ViberMonkey it becomes clear that a) a messge to the user is shown and b) a powershell script is started (the Parameter is further obfuscated (basce64 etc.... it looks similar to the one in the next exercise))
  
  
**Running olevba to extract and analze vb code in doc file**

Create environment
- `sudo apt install pipenv`
- Create directors "~/reversing/oletools" and run "cd ~/reversing/oletools"
- run `pipenv install oletools`
- copy "Sample.doc" into ~/reversing/oletools"  (doc file from https://github.com/ti-ng/re-deobfuscation not checked as a) dangerous b) virus scanner might cause trouble)
- run `pipenv run olevba ./Sample.doc` to analzye and get malicious doc file -> copy code to a file for analysis


**Running ViperMonkey**
- Go to folder ~/reversing and clone repo
  - `git clone https://github.com/chezwicker/ViperMonkey.git`
- Go to repo ("cd ViperMonkey")
- Run vipermonkey: 
    - `./docker/dockermonkey.sh ~/reversing/Sample.doc`  (copy sample.doc there)
    - had to adapt the the vipermonkey file dockermonkey.sh on line 49 (before empty line): "docker_id=$(docker run --network host --rm -d -t haroldogden/vipermonkey:latest)"   (apparently this is not necessary on a new live cd, but was still needed 16.5.2023)    
    - output file will provide detailed info (and execute parts)
    - IMPORTANT: Could only run it once on 16.5, so maybe one needs to clone git repo for every run (or really understand whats going on)

## Notes/varia
VB notes
- " _ " means statement continues on the next line. Example: `skuwd = Ga63a6ozyok1lu + Tvh1u8793dltn9 _`  

Links:
- https://perception-point.io/blog/malicious-office-macros-detecting-similarity-in-the-wild-2/ 