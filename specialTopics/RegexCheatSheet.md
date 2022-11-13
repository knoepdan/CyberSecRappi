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
    - `/ducks?/` -> "?" marks preceeding character as optionl. Would match "duck" and "ducks"
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
- Leftovers
    - `\\` -> matches "\". The first "\" is the escaping character



### To check (move to a better place)
- `^` -> start of line  ("^" can also mean negation)






### Links

https://regex101.com/  (attention: be careful not unintentionally change regex settings)

https://cheatography.com/davechild/cheat-sheets/regular-expressions/
https://www.rexegg.com/regex-quickstart.html

https://www.regular-expressions.info/
