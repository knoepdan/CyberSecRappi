# Exercise CyberChef register and forking

###Idea of fork
Forking allows to split input into multiple inputs, which are then separatly passed to the next recipe step. So the follow up steps are executed multiple times, depending on how many inputs the fork step creates. 

###Idea of merge
At the end of recipe with a fork, the different results are to be merged into one result as cyberchef only supports one output. The different results, can be separated by a configurable delimiter.

###Idea of register
"Register" allows setting a variable value. Register retrieves the value from the input (possible a forked input) using a regular expression and assigns the value to the variable. Follow-up steps can then use the variable value in its step configuration. It is useful to use results of a step as configuration. 


### Solution


Nof emails:  **38**

Final CyberChef recipe:

```
[
  { "op": "Fork",
    "args": ["\\n", "\\n\\n", false] },
  { "op": "Register",
    "args": ["(.*)", true, false, false] },
  { "op": "HTTP request",
    "args": ["GET", "https://mcs.unibnf.ch/lecturers-list/page/$R0/", "", "Cross-Origin Resource Sharing", false] },
  { "op": "Extract email addresses",
    "args": [true, false, true] }
]
```
