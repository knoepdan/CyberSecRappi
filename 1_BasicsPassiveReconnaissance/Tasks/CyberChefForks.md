# Exercise CyberChef forking

###Task
Create all hashed from a given input (cas\n cyber\n security\n) using CyberChef and forking

### Solution

In CyberChef, I chose "Fork" with to treat the different words in the input by line break. Then, by using "Generate all hashes", I was able to generate all existing hashes.

Final CyberChef recipe:

```
[
  { "op": "Fork",
    "args": ["\\n", "===== NEXT ======\\n", false] },
  { "op": "Generate all hashes",
    "args": ["All", true] }
]
```
