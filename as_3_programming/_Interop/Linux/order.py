#!/user/bin/env python import sys#importing system modules to work with directory files if __name__ == "__main__":# Starting with an empty dictionary here. Which is termed as the order#. All keys in this dictionary appear as a name, and the specified values for them# will be the number of times that specific name will appear.order = {}# sys.stdin is an object used for files. All those functions applied to
# a file object can also be used for sys. Stdin.
import sys

#orders = {} # {} is for a dic/map, [] would be for an array/list

stringList = sys.stdin.readlines()  # list/array []
counter = 1
stringList.sort();  # info: uppercase come before lowercase
for s in stringList:
    
    counter = counter + 1

    # print and sys.stdout will usually go to to standard out
    # Example: 
    #     "cat file.txt | python order.py | sort > dummyOutput.txt"
    #      (just an example.. doesn't really make sense to sort twice and write it twice etc.)
    print(f"{counter}: {s}")
    sys.stdout.write("%d\t%s\n" % (counter, s))

