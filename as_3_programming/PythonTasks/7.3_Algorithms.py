# 7.3 Algorithms

# 7.3.1 Filtering
def startsWithA(arr):
    
    # https://w3schools.com/python/python_lambda.asp
    # https://realpython.com/python-lambda/
    return list(filter(lambda x: (x.strip().lower()[0] == "a"), arr))

print(startsWithA(["apple", "pear", "grape"]))  # -> ["apple"]

# 7.3.2 Mapping
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


# solution without  map
def pndsOne(arr):
    result = []
    for n in arr:
        factors = pnd(n)
        # make values unique
        factorsSet = set(factors)
        uniqueFactors = tuple(factorsSet)
        result.append(uniqueFactors)
    return result

# solution with  map
def pnds(arr):
    result = list(map(lambda x: tuple(set(pnd(x))), arr))
    return result


print(pndsOne([15,99,100]))
print(pnds([15,99,100]))