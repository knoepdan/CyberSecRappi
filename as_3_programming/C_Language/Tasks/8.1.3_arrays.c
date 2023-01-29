#include <stdio.h>
#include <string.h>

int add(int x, int y)
{
    int result = x + y;
    return result;
}

void arrayTask(int arg1, int arg2, int arg3, int arg4)
{
    int *heapArray = malloc(3 * sizeof(int));
    heapArray[0] = add(arg1, arg2);
    heapArray[1] = add(arg2, arg3);
    heapArray[2] = add(arg3, arg4);

    int stackArray[2] = {0, 0};
    stackArray[0] = add(heapArray[0], heapArray[1]);
    stackArray[1] = add(heapArray[1], heapArray[2]);
    free(heapArray);

    printf("And here it is: %i\n", add(stackArray[0], stackArray[1]));
}

int main(int argc, char *argv[]) // would also be correct/possible: "int main()"
{
    // playing with args
    // printf("Args %d \n", argc); // argc -> nof arguments. Attention: first argument (argv[0]) is the filename)
    // for(int i = 0; i < argc; i++){
    //     if(i == 0){
    //         printf("index: %i, first arg is name of executable: %s \n", i, argv[i]); // example: "exefile aa bb" -> argv[0] = "exefile"
    //     }else{
    //         printf("index: %i, arg: %s \n", i, argv[i]);
    //     }
    // }
    if (argc != 5)
    {
        printf("Program expects 4 arguments (integers)");
        return -1;
    }

    int arg1 = atoi(argv[1]); // parses string value (returns 0 if passed string is not a number)
    int arg2 = atoi(argv[2]);
    int arg3 = atoi(argv[3]);
    int arg4 = atoi(argv[4]);
    arrayTask(arg1, arg2, arg3, arg4); // ./8.1.3_arrays 1 8 5 7 => 47

    // arrayTask(1,8,5,7); // => 47
    return 0;
}