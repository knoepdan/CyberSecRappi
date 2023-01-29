#include <stdio.h>

int add(int x, int y)
{
    int result = x + y;
    return result;
}

int mul(int x, int y)
{
    int result = x * y;
    return result;
}

double div(double x, double y)
{
    double result = x / y; // using int would cut the decimal part
    return result;
}

int main(int argc, char *argv[]) // would also be correct/possible: "int main()"
{
    printf("%i\n", add(1, 5)); // => 6

    // 8.1.2 printing
    printf("%i\n", mul(4, -3)); // => -12
    printf("%.10lf\n", div(28, 6)); // =>  4.6666666667  (%.10lf for double with 10 decimal places)
   
    // Playing around with printf
    printf("Color %s Number %f \n", "blue", 3.14); // => Color blue Number 3.14    (%s for string, %f for float)
    printf("%i   %i    %i  \n", 5, 34, 17.324);   // =>  5   34    0    (last is 0 because  17.324 is not an int)

    // positioning via "{pos}$"  (Attention: position starts with 1) 
    printf("%2$d, %4$d \n", 3, 2, 55, 9999); // 2, 9999   (because it is 1 based unlike for example array index)

    return 0;
}