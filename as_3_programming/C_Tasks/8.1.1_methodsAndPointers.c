#include <stdio.h>

int add(int x, int y)
{
    int result = x + y;
    return result;
}

int pointerPlayGround()
{
    // just some basic examples related to pointer etc (to refresh my memory)

    // Basics
    int intVar = 20;
    int *intPointer = &intVar;
    printf("Value of intVar:  %i\n", intVar);                           // shows tha value assigned
    printf("Address of intVar %i\n", &intVar);                          // shows the address in memory
    printf("Pointer intPointer (pointing to intVar) %i\n", intPointer); // shows the same as &intVar (since this is what we assigned)
    printf("Value of Pointer intPointer %i\n", *intPointer);            // shows the value in the memory the pointer points to

    // NULL and void Pointer
    int *nullPointer = NULL;                          // usually assign NULL if not yet clear what to assign (similarly to Java or C#)
    void *voidPointer = NULL;                         // void point can store any type of pointer
    printf("Pointer nullPointer  %i\n", nullPointer); // -> 0 (actual value might depend on environment.. should be 0)
    // *nullPointer will fail as it is not permitted by the OS  printf("Value of Pointer nullPointer %i\n", *nullPointer);

    // Pointers: arrays and arithmetics
    // It is possible to do calculations  (++, --, +, -)
    int arr[5] = {1, 2, 3, 4, 5};
    int *arrPointer = arr; // Points to start of array, &arr[0] would be the same
    for (int i = 0; i < 5; i++)
    {
        printf("\n  a value in the arrPointer: %x, ", *arrPointer);
        arrPointer++; // will point to the next element of array: Important that the pointer is of the same type as the elements, so moves the size of the array
    }

    // Pointers and memory allocation
    // Pointers can be handled very similarly to arrays (since arrays are basically pointers as well)
    int *p = (int *)malloc(sizeof(int) * 10); // allocate memory on the heap and return pointer to it
    p[2] = 100; // set 3rd element
    printf("\n  a) value of a[2] %i ", p[2]);
    *(p + 2) = 101; // set 3rd element (same but jumping to the second position in pointer and then dereference pointer via *)
    printf("\n  b) value of a[2] %i ", p[2]);
    free(p); // deallocate memory
    
    // Some more info
    // Pointer can point to functions (function pointer) and it is possible to pass pointers like any other variable
    // uninitialized pointers (wild pointers) point to unknown locations in memory -> always initialize pointers

    printf("\n");
}

int main(int argc, char *argv[]) // would also be correct/possible: "int main()"
{
    pointerPlayGround();
    printf("%i\n", add(1, 5));  // => 6
    printf("%i\n", add(-2, 4)); // => 2
    return 0;
}