# 7.2.4 unpacking
def pnd(number):
    if -1 <= number <= 1:
        return number
    factors = []

    while number % 2 == 0:
        number /= 2
        factors.append(2)

    current = 3
    while abs(number) >= current:
        if number % current == 0:
            number /= current
            factors.append(current)
        else:
            current += 2

    return factors

## quick recap basic collection initializations
# list/array: x = [1, 3, 4]
# dic/map: d = {"a": 2, "b": 33}
# sets: s = {"a", "b"}   ## values must be unique

def fixedGcpf(arrOne):
    allFactors = None
    for n in arrOne:
        factors = pnd(n)
        if allFactors is None:
            allFactors = set().union(factors)
        else:
            allFactors = allFactors.intersection(factors)    
    # find biggest factor in allFactors
    maxFactor = 0
    for f in allFactors:
        if f > maxFactor:
            maxFactor = f
    return maxFactor


##### Unpacking Part 1
def gcpf(*numbers):
    return fixedGcpf(numbers)
    
#print(fixedGcpf([21, 56, 77]))
#print(gcpf(21, 56, 77))

    
##### Unpacking Part 2

def fixedFeed(foodDic):
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
                    foodIndex = 0 # randrange(len(availableFoodArray))
                print("Have some ", availableFoodArray[foodIndex])
            else:
                print("Sorry, we don't serve " + chosenType + "Would you like " + typeoffood + "? ")

        else:
            print("See you next time")
            return

def feed(**foods):
    foodDic = {}
    for f in foods:
        #print(f"- {f} ({foods[f]})")
        foodDic[f] = foods[f]
    fixedFeed(foodDic)


feed(greens=["broccoli", "beans"], carbs=["potatoes"])