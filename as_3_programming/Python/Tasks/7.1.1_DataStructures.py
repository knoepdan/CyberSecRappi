
# 7.1.1.1 Array

def multiplyAt(arrOne, arrTwo, pos):
    result = arrOne[pos] * arrTwo[pos]
    return result


testResult = multiplyAt([2, 8, 3], [7, 1, 13], 2)
print(testResult)


# 7.1.1.2 Maps Dics

def resolve(map, keyToSearch, fallback):
    return map.get(keyToSearch, fallback)
# also possible   
#    if keyToSearch in map:
#        return map[keyToSearch]
#    else:
#        return fallback


print(resolve({"dna": "desxxxx acid"}, "dna", "nothing found"))
print(resolve({"dna": "desxxxx acid"}, "IDoNotExist", "nothing found"))