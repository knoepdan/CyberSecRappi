# Regex

Attention, not every implementation of regular expressions is exactly the same. However, they are all (very?) similar.


###Basics

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
    - Group 2: "900"


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
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences (good but not same syntax)
https://pynative.com/python-regex-capturing-groups/

### Replacing
To replace a match, the replace value is to be added after the delimiter at the end (usually "/") of the regex. (and followed again by the delimiter)
Example: `/foo/IReplaceFoo/g` -> match regex is "foo" and it will be replaced by "IReplaceFoo"
It is also possible to apply some operations: toUppercase "\U", toLowerCase "\L" (and more)


In some tools, the substitution string is not part of the regex string (we keep it this way in the example as it is easier to read) 
- Example 1: take all urls and make https links out of them (*url regex is simplified*): 
    - `/(((?<=http:\/\/)|(?<=https:\/\/))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,})/gm` -> substitution `<a href="https://$1">link to $1</a>`
- Example 2: find conditional keywords and make them upper case: 
    - `(\bif\b|\bthen\b|\belse\b|\bend\b)` -> substitution to uppercase ("\U"): `\U$1`



*Some regex support conditional replacement. Not shown here as most implementations don't support this*

### More aspectes

**Anchors and flags**
Flags are to be places after the actual regex. 
most common flag "/g" (global): find all the matches, not just the first one (often regex editors always turn that flag on)

- `/^/` Anchor at beginning of the input (with "/m" at the end means beginning of line)
    - e.g.: `/^a/` will match "a" at the beginning of the input 
    - e.g: `/^a/gm` will match "a" at the beginning of the every line ("/gm" means "g" for global, "m" multiline)
- `/$/` Anchor at end of the input (with "/m" at the end meand end of line)
    - e.g: `/ˆif$/m` will match single word if, if its alone on the line

**Lookahead/Lookbehind**
Lookahead "(?={what to look ahead})"
Lookbehind "(?!={what to look ahead})"
- Example: `/.*(?=@)/`  -> "aa@switch.ch" -> will match "aa"

**Some leftovers**
- It is possible to have a different delimiter
    - Example: `%(?:[/][0-9a-zA-Z-_]+){0,}[/]?%` (Regex is surounded by "%" instead of "/")
- there are more flags (like "/g"). Example: "i" for case insensitive or "U" to make all quantifiers laze (not greedy)


### Links

https://regex101.com/  (attention: be careful not unintentionally change regex settings)

https://cheatography.com/davechild/cheat-sheets/regular-expressions/