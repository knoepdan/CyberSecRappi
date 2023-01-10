
# 7.1.1.1 Array

def multiplyAt(arrOne, arrTwo, pos):
    result = arrOne[pos] * arrTwo[pos]
    return result


testResult = multiplyAt([2, 8, 3], [7, 1, 13], 2)
print(testResult)