# C

## Compile and run C (without VS Code)
Assuming C compile gcc is present (usually preinstalled on linux) to create an executable do: 
    - gcc $filename -o $outputname  (e.g. `gcc sourceCode.c -o executable`)
    - run the program:  ./$outputname (e.g. `./executable`)
    - 




## Visual studio code and C

*VS Code on was preinstalled with a few extension for C and C++. These are just listed here. *

Main Extensions
- C/C++
- C/C++ Extension Pack  (this one alone is enough)

Other extensions
- C/C++ Themes
- CMake
- CMake Tools

**Debugging**
With the extension mentioned above, it should be possible to just run and debug a C file (if main method is present). Some other prerequisites are likely needed as well as the might not be part of the extensions, mainly the compiler but on a linux system gcc should be present anyway.


**Without extensions**

Configure code runner in .vscode/settings.json  (basically compile and immediatly run it)
```
{
    "code-runner.executorMap":{
        "c": "cd $dir && gcc $fileName -o$ $fileNameWithoutExt && $dir$fileNameWithoutExt
    }
}
```
*not tested.. but should work*