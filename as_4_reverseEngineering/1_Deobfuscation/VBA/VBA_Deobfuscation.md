


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
       - Encode parts to make it unreadable (Base64 encoding)
       - Control flow Rerouting -> Goto statements to make it harder to follow execution flow
3. See how far you get with manual deobfuscation of the code.
   1. Describe the steps you took.
   2. Any idea what the VBA part of this malware does?




**Running olevba to extract and analze vb code in doc file**

Create environment
- `sudo apt install pipenv`
- Create directors "~/reversing/oletools" and run "cd ~/reversing/oletools"
- run `pipenv install oletools`
- copy "Sample.doc" into ~/reversing/oletools"  (doc file from https://github.com/ti-ng/re-deobfuscation not checked as a) dangerous b) virus scanner might cause trouble)
- run `pipenv run olevba ./Sample.doc` to analzye and get malicious doc file -> copy code to a file for analysis