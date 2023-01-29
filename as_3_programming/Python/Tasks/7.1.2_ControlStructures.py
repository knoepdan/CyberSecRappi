
from random import randrange

# 7.1.2.1 Conditions

def multiplyAt(arrOne, arrTwo, pos):
    #print("arrOne: ",type(arrOne))
    #print("arrTwo: ",type(arrTwo))
    
    if arrOne is None or not isinstance(arrOne, list):  # isinstance will also be true for inherited objects (usually prefer isinstance over type)
        return None
    if arrTwo is None or not type(arrTwo) is list:  # type(arrTwo -> checks for exactly this type
        return None

    if pos < 0: 
        return None
    elif pos > len(arrOne)-1:
        return None
    elif pos > len(arrTwo)-1:
        return None
 
    # remark: didnt implement type checks for pos

    result = arrOne[pos] * arrTwo[pos]
    return result


# print(multiplyAt([2, 8, 3], [7, 1, 13], 2))
# print(multiplyAt(None, [7, 1, 13], 2))
# print(multiplyAt([2, 8, 3], None, 2))
# print(multiplyAt("ImNotAnArray", None, 2))
# print(multiplyAt([2, 8, 3], [7, 1, 13], -5))
# print(multiplyAt([2, 8, 3], [7, 1, 13], 8888))


# 2

def resolve(map, keyToSearch, fallback):
# not sure about the difference between "regular condition" and "conditional statment"
   if keyToSearch in map:
       return map[keyToSearch]
   else:
       return fallback


# print(resolve({"dna": "desxxxx acid"}, "dna", "nothing found"))
# print(resolve({"dna": "desxxxx acid"}, "IDoNotExist", "nothing found"))


# 7.1.2.2 Loops


## 1. Sum product
def sumproduct(arrOne, arrTwo):
    sum = 0
    i = 0
    while i < len(arrOne):
        product = multiplyAt(arrOne, arrTwo, i)
        if not product is None: 
            sum = sum + product
        i = i + 1 
    return sum


# print(sumproduct([2, 8, 3], [7, 1, 13]))  # 61
# print(sumproduct([2, 8, 3], [7, 1])) # 22  (will ignore values that have no matching position)
# print(sumproduct([2, 8], [7, 1, 13]))  # 22 (will ignore values that have no matching position)

# 2: function feed
def feed(foodDic):
    # skipping input validation as not crucial for the exercise

    ## preparation
    typeoffood = " or ".join(foodDic.keys())
    hungryQuestion = "Are you hungry? "
    # question loop
    while True:
        isHungry = input(hungryQuestion)
        hungryQuestion = "Are you still hungry? "
        if(isHungry.strip().lower() == "yes"):
            chosenType = input("Woud you like " + typeoffood + "? ")
            if(chosenType in foodDic):
                availableFoodArray = foodDic[chosenType]
                foodIndex = 0
                if(len(availableFoodArray) > 1):
                    foodIndex = randrange(len(availableFoodArray))
                print("Have some ", availableFoodArray[foodIndex])
            else:
                print("Sorry, we don't serve " + chosenType + "Would you like " + typeoffood + "? ")

        else:
            print("See you next time")
            return


feed({"greens": ["broccoli", "beans"], "carbs": ["potatoes"]})