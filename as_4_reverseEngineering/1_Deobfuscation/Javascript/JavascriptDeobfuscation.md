

# Javascript 

## 2.1.3 Analasys of js sample

1. What obfuscation techniques have been used
   - name mangling (short and/or unreadable variable names)
   - comma separator for variable assignments
   - property access to run functions
   - immediatly invoked functions
2. See how far you get with manual deobfuscation of the code

**Steps I took**
    - First steps (all in multiple rounds)
      - Format code, add line breaks etc. (initial step, but multiple rounds aftewards)
      - extract function some immediatly invoked functions
      - rename variables
        - parameter name to inputA. -> example name "inputA" 
        - name differs depending on whether it is a local or global variable
        - once more info is available (type or even purpose), rename variable again
      - adding comments (if i have some info)
      - replaces some conditions: example: `while (!![])` to `while(true)`
      - replace hex number with normal numbers (e.g: `0x1e1` to 481)
   - Further steps
     - take some safe snippets and execute them (in a web page)
       - mainly to get which string values were taken
       - See testJs.html 
       - Deobfuscated code see SampleHarmless.js (Attention: i had to changes some strings and ActiveXObject to ensure the virus scanner would not interfere)
       - (I stopped at some point as it was time consuming)
    - possible further steps
      - with a regular expression, I could have extracted all functions to get strings in my half deobfuscated code ("chooseStringFunc") and then I could have executed it to get all the real strings. 
      - From that it would have been possible to set the correct strings everywhere and furhter deobfuscate the code. 


**What does the malware do**

In a loop, it will download commands from a page and usually execute them, then sleep for some time untill the same thing is to be done again. 
I assume the script will also try to install itself in the startup folder, so it will continue executing after a restart. 


## 2.1.3.1 Deobfuscation with js-box
js-box executes the javascript in a sandboxed environment and logs what external sources (filesystem, registry, network/urls) are accessed. 
The results are accessible in a folder (Sample.js.results). A halfway deobfuscated file is present in this folder. I believe this is the file js-box actually executed (as there seem to be some polyfills etc.)

1. Comparison with my deobfuscation
    - js-box formats the code well  (better than what I did)
    - js-box will actually show you what resources are actually accessed
    - js-box did not:
      - assign proper names to to variables and functions
      - externalize immediate function calls for readability
      - undo variable declarations one file
    - Apart from formatting, I don't think js-box did much (any?) deobfuscation
2. What's missing
I found it a bit difficult to interpret the js-box analysis on its own. The analyzed code, while well-formatted, is still quite obfuscated and not readable. In a way, this is not really surprising, as js-box cannot know the context and can thus not assign proper names and also execute some code snippets to undo obfuscation. A more advanced tool might be able to do some of it. (e.g. naming of parameters, object types etc.)

What helps is to see what the code actually does aka what ressources are accessed (written). However, on it's own, it also doesn't mean much. 

*Remark: also changed some strings/objects in the deobfuscated filr from js-box to avoid problems witht he virus scanner*

## JS deobfuscation info


### Common approaches for js obfuscation

Besides the common approaches that can be used for (almost) any languages, here some js specific examples:

- `(function x(a) {console.log(a);})(1)`  immediatly invoke function (same approach used to create namespace like behavior)
- `let ar = [1, 2]; ar["push"](3)`  use property access for properties and even for functions
- `var x = (console.log("Hi"), "Alice"); console.log(x);` -> console output will be "Hi" "Alice" (2 logs).  Confusion with commas 1
- `var x; y =7,z=(1,2,3);` -> assigns each variable (with x undefined)


### Tool box-js
https://github.com/CapacitorSet/box-js

- makes js more readable (deobfuscates it)
- runs it in a emulated windows js environment (no harm)

How to install: 
- make sure node and npm are available
- then `npm install box-js --global` (as root)


### Recommendation 

**How I would generally  proceed generally**
1. run js-box to get a) a well formatted code b) info about what is accessed
2. deobfuscate the well formatted code on my own (variable names etc.)
    - do this for multiple rounds untill (see comments above)