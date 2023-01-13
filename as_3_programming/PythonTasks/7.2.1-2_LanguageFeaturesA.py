# 7.2.1  Modules & packages
from testPackage import misc
# if file misc.py was on same level, this should work: "import misc"

# print(misc.multiplyAt([2, 8, 3], [7, 1, 13], 2))  # test

# 7.2.2 sets
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
# tuple: t = (1, 3, 5) ## cannot be changed

def gcpf(arrOne):
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
    
print(gcpf([21, 56, 77]))

    
