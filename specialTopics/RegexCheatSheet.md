# Regex

Attention, not every implementation of regular expressions is exactly the same. However, they are all (very?) similar.

- `/basic/` search for "basic", "/" mark the start and the end
- `/if|else|then/` search for either if, else or then. "|" is to distinguish alternatives
- `/if\b/` word boundary: "\b" -> words are defined as 
letters, digits and "\_".
    - `[[:<:]]`  start of word (or `\b(?=\w)`)
    - `[[:>:]]` end of word (or `\b(?<=\w)`)
- `\s` -> whitespace. Will match " ", "\t" (tab), \r" (carriage return), "\n" (line feed), "\f" form feed and "n/a" (vertical tab). Alternative way of writing: `[[:space:]]`
- Different characters and ranges
    - `/[cr]at/` -> will find "cat" and "rat" ("[]" -> means single character)
    - `/[a-z]/` match any lower case character
    - `/[A-Z]/` match any upper case character
    - `/[0-9]/` any number
    - `/[0-9a-zA-Z]/` number or character
    - `.` Wildcard: any charachter except new line ("\n")
- Other meta characters ("\{character with special function}")
    - `\d` -> digits
    - `\w` -> word (letters, digits, underscore)
    - `[[:alpha:]]` -> letters 
- Quantifiers (optiona, zero or more, one or more)
    - `/ducks?/` -> "?" marks preceeding character as optional. Would match "duck" and "ducks"
    - `/[x]*ll/` -> "*" means: zero or more. Here, would match "ll", "xll", "xxll" etc
    - `/[x]+ll/` -> "*" means: one or more. Here, would match  "xll", "xxll" etc
    - Between: `{1,2}` ({min, max}, max can be left out)
        - `{1,}` is equivalent to "+"
    - "Greedyness" >  matches try to match as much as possible
        - To avoid this and match the first occurence use the lazy quantifier `*?`
            - `/<.*?>/` -> to find a html/xml tag. (and not continue searching after the first ">" character )
- Negation "^"
    - `[^a-z]` matches anything that is not lowercase
        - `/[^^]/` matches anything except "^"
        - *carefully that you get the right character "^" and not "ˆ" which will not work*
- Leftovers
    - `\\` -> matches "\". The first "\" is the escaping character

###Groups
A group is a regular expression enclosed in brackets. Example: "(someRegex)". 

**Example 1 (basic)**: 
String: "This image has a resolutoin of 1440x900 pixels"
Regex: `/([0-9]+)x([0-9]+)/`
- Match 1: "1440x900" 
    - Group 1: "1440"
    -  Group 2: "900"


**Backreferences and named groups**

Groups can be named: ?’name’...  (It seems that in some Regex implementations, the syntax is like this: "(?<name>...)" ). Can then be backreferenced withing the Regex via
- via index index: "\n"  (attention \0 always refers to the entire match, individual groups are 1 based)
- via name "\g{name}"  (index based backreference still works)

Examples *(careful that you really get the right characters)*": 
- Backreference: `/<([^>]*).*>.*<\/\1>/`   
- Same thing with named group`/<(?'tag'[^>]*).*>.*<\/\g{tag}>/`

Non-Capturing groups meaning we dont get the groups, just the whole match are defined by adding "?:" after the opening bracket. 


**Example 2:**
```
method someNonWorkingPseudo { 
 end if
	loop
		counter = counter + 1 
	end loop
}
````
Regex: `/end\s(if|loop)/`
- Match 1: "end if" 
    - Group 1: "if"
- Match 2: "end loop"
    -  Group 1: "loop"

Regex without groups: `/end\s(?:if|loop)/`
- Match 1: "end if"  (no groups)
- Match 2: "end loop" (no groups)


**Example 3 (named groups):**
Text: "First_Name: John, Last_Name: Doe First_Name: Jane, Last_Name: Smith"
Regex: `/First_Name: (\w+), Last_Name: (\w+)/`
Regex with named groups: `/First_Name: (?'firstname'\w+), Last_Name: (?'lastname'\w+)/`  (not that we use the name here)
- Match 1: "First_Name: John, Last_Name: Doe"
    - Group 1: "John"
    - Group 2: "Doe"
- Match 2: "First_Name: Jane, Last_Name: Smith"
    - Group 1: "Jane"
    - Group 2: "Smith"




**Links**
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences (good)
https://pynative.com/python-regex-capturing-groups/


** To check (move to a better place and/or improve (or remove))**
- `^` -> start of line  ("^" can also mean negation)






### Links

https://regex101.com/  (attention: be careful not unintentionally change regex settings)

https://cheatography.com/davechild/cheat-sheets/regular-expressions/
https://www.rexegg.com/regex-quickstart.html

https://www.regular-expressions.info/
