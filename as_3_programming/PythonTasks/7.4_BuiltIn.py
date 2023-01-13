from functools import reduce
from datetime import datetime
import json
import os

# 7.4 Builtin 

# 7.4.1 functools

def favorites(arr): 
    itemsListed = reduce(
        lambda aggregate, item: (aggregate + str(item[0])+")"+ item[1]+", "), enumerate(arr, start =1), ""
    )
    answer = input("Pelase prioritize the following: "+ itemsListed)
    parts = answer.split(",")
    print("You like " + arr[int(parts[0])-1] + " best and " + arr[int(parts[len(parts)-1])-1]  + " least!")


# favorites(["tea", "coffee", "water", "soda"])

# 7.4.2 datetime -> integration in log class see "7.2.5-8_LanguageFeatruesD_ClassesEtc.."
now = datetime.now()
print(now)
print(now.strftime("%Y-%m-%d %H:%M:%S.%f")) # same as just print


# 7.4.3 json (and a bit of OS) -> integration in log class see "7.2.5-8_LanguageFeatruesD_ClassesEtc.."
alice = json.loads("""{
    "name": "Alice"
}""") # returns a dictionary
print(alice)
print(type(alice)) # -> <class 'dict'>
couple = alice # not really needed.. it is a reference object and we point to the same object
couple["spouse"] = {"name": "bob"}
print(json.dumps(couple))
print(json.dumps(alice))
print(str(os.getuid()), " ", os.getlogin())