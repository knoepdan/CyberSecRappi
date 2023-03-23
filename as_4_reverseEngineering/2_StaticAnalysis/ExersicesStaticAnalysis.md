# Static analys basics exersices


## Basics 3.1

`98ca95d5888ed57532434861e0db91d5bf9b4b10b56bf5a1fb8b27fd7659fcf8`  (in the pdf there seems to be an incorrect space after 98)

Results for this hash
- https://www.virustotal.com/gui/home/search
    - 53 security vendors and 2 sandboxes flagged this file as malicious
    - Seems to be a .net dll that makes a http request, downloads a file, writes to the registry and runs code
- https://bazaar.abuse.ch/verify-ua/  (search: `sha256:98ca95d5888ed57532434861e0db91d5bf9b4b10b56bf5a1fb8b27fd7659fcf8` )
    - 11 vendor detections
    - possible to browse information of vendors (often with an additional link)
    - YARA Rules can be browsed
        - more info https://www.varonis.com/blog/yara-rules or  https://malpedia.caad.fkie.fraunhofer.de/


## Ghidra 3.2

**3.3.3.1  Strings**
The strings that are clearly specific to the actual program (e.g: "You didn't give me your guess", "secrect", etc. ) give a) indications what the program might do b) help us find the most relevant pieces of code

1. Double click on interesting string in "Defined String": we jump to the string definition in "Listing"
2. right click > References > Show References To Address:  we can jump to functions where string is used
3. check these functions in the decompiled C code: We are likely in a relevant function 

**3.3.3.2  Symbols**

Starting from a custom string ("You didn't..."), I go up the calling tree of the functions using the string, and at some point I end up at the entry symbol. One of the functions has to be the main function.  


Example (I slightly renamed the functions)
```
entry symbol
    ..
    FUN_Init_14001328
        FUN_Main_140001060
             "You didn't give me your guess!"
```

**3.2.3.3 Decompile & AST Control Flow**

1. AST Control flow -> decision diagram of the control function. Selecting a box/item, marks the corresponding code green
2. Code of entry function FUN_14001328
    - Any idea where this codde came from?
        - Compile probably has to generate some setup code so our code interacts properly with the OS and the environment (e.g. retrieve the arguments for the main function)
    - How did it get here
        - compiler generates compiles it into exe file 
3. Try to identitfy the main function
    - What's the function name / label:   "FUN_14001060"  ( I renamed it to FUN_Main_140001060)
    - How did you find it?
        - From a custom string "You didn't...", I found the custom code and from there I could jump up the function call tree to find the top function. Top function was entry point, but the one before had to be the main. 
            - also see 3.3.3.2 Symbols 
            - Also see "Function Call Graph"


**3.2.4.1 Program analysis editin func signatures**
Example main function: `int main(int argc, char *argv[]) ` 

1. The type of the second parameter seems strange, doesn’t it?
    - What should it actually be?
        - Answer: a pointer to a char array: "char *arg[]
    - Why doesn’t it make a difference on a lower level? 
        - Answer: On a 64bit system longlong and a pointer both use 64bit
2. Edit the function signature to correctly define the function.  (basically followed the instruction in the concept document)
3. What changes happen in the function code due to the adjustment of the signature?
    - Answer: 
        - works like a refactor in an IDE. Will 
        - Pointer handling is simplified: `strcmp(*(char) **) Param_2 + 8, s_secret_1400..)` -> changes to `strcmp(argv[1], s_secret_140...)`
4. If you have time left (or you find this interesting ;-)), compare the two versions (Windows and
MacOS).
    - What differences do you notice?
        - Answers: 
            - entry directly points to the main function. (no superflouos parameters, different data types)
            - No wrapper function for printf 
            - structure logic slightly different (e.g. in windows version we have an if/else whereas the else is missing in the mac version due to a different code flow, it was unnecessary )
            - constants strings is directly compiled into the main method  ("%s" was correctly recognized as a string)
            - Generally, it seems the mac version is easier to interpret
    - By comparing the two, you’ll easily see what the currently unknown function is.
        - Change its signature as well to clean up a bit more.  
        – Note that it’s a function which accepts a variable number of parameters. Check the “varargs”  
            - Answer: not sure what is meant by varargs? (param_2? -> often called argv in C?)
function attribute.
    - After editing, what differences are still left?
        - code flow is slightly different
        - call to printF
        - otherwise looks similar to my "improved" win version

**3.2.4.2 Overriding Call Signatures**
**3.2.4.3 Rename & Retype variables**
done according to the concept

**3.2.4.4* Rename & Retype variables**
`FUN_PrintF_140001120(&DAT_140003038,responseMessage);`

Changed Data "DAT_140003038" int a string (via Data > string). Label name changes to "s_%s_140003038". It is clear that is called as follows: 
`printf("%s", responseMessage);`

How many bytes do you have to select? Why?
Answer (guess): Ghidra did automatically. However, I guess that since I changed the data into a string, I had to select all bytes untill the first "00" as this marks the end of a string. In this particular case it was 3 bytes (2 characters and the "end" byte)

**3.2.4.5 Putting it all together**

1. Run ex1-win.exe 

Calling "ex1-win secret" > output "Yay ;-)

```
bool FUN_Main_140001060(int argc,char **argv,undefined8 param_3,undefined8 param_4)

{
  int compareResult;
  bool isIncorrect;
  char *responseMessage;
  
  if (argc < 2) {
    FUN_PrintF_140001120(s_You_didn't_give_me_your_guess!_140003000,argv);
    isIncorrect = true;
  }
  else {
    compareResult = strcmp(argv[1],s_secret_140003020);
    isIncorrect = compareResult != 0;
    if (isIncorrect) {
      responseMessage = s_Nay_;-(_140003030;
    }
    else {
      responseMessage = s_Yay_;-)_140003028;
    }
    FUN_PrintF_140001120(s_%s_140003038,responseMessage);
  }
  return isIncorrect;
}
```

2. Analyze ex2-*
- Which version did you choose? Why?  
    - Answer: Looked at both versions and found them both quite cryptic. In the end I opted for the "ex2-macOS" it seemed to be slighly easier and because the results seemed to be better for mac for the first file (string constants, main method, library functions). However, I kept both versions open and looked at both of them. 
- What are the steps the programs take
    1. It asks the user input via 2 function calls and saves them in 2 variables: 
        - "Enter Product ID: "
        - "Th1s P4erial Number: "  (serial number? probably I made some mistake)
    2. It will then pass the user input to a function which will "1" for found (or match) and 0 for not found. 
    3. The user is informed via printF
- What functions can you discover? What would you name them
    - Names I gave in Ghidra (in a real program I would not keep FUN prefix and address)
    - FUN_EnterProductID_100000b20(&local_38,local_58);
        - prints "Enter Pro..." and then asks for user input (FUN_Prompt_...)
    - FUN_EnterSerialNumber_100000c40((long)&local_38,local_78);
        - prints "This.." and then asks for user input (FUN_Prompt_...)
    - FUN_Prompt_100000a70(param_1,9,param_2);
    - FUN_Find_100000d30(local_58,local_78);
        - takes the variables set in the function calls before (*char[32] arrays) and does some cryptic magic and ultimatly returns the result
- What would be good variable names: 
    - local_38 > productId
    - local_78 > serialNo
    - return value from FUN_Find_10000... >  result (a bit too generic)
- What does the program do?
    - Asks for user input and then matches the 2 inputs and gives feedback to the user (not 100% sure about the last step)
- Can you make the program happy?
    - As programs have no feeling, I will never be able to make the program happy :-(   ( Even if the program had feelings, we don't know if it would make it happy when it could give the user positive feedback)



