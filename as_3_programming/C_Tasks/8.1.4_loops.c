#include <stdio.h>
#include <string.h>

void performCaesarCipher(char *text, int shift)
{
  int textLenght = strlen(text);
  printf("input:: %s  \n   %i   \n", text, textLenght);

  char output[textLenght];
  for (int i = 0; i < textLenght; i++)
  {
    output[i] = text[i] + shift;
    // printf("%i %c  -> %c\n", i, text[i], output[i]);
  }
  output[textLenght] = '\0'; // marker so strlen knows the correct end (without it printf would show one too many)
  printf("%s\n", output);

  // remarks regarding sizeof+strlen
  // printf("sizeof length: %i \n", sizeof(output)); // sizeof is a compile time operator 
  // printf("strlen length: %i  \n", strlen(output)); // predefined c function that will go till the end marked as '\0'
}

int main(int argc, char *argv[]) // would also be correct/possible: "int main()"
{
  // how to call:
  // attention: how to pass spaces or special characters as arguments depends on the shell. Here what worked with linux bash
  // ./8.1.4_loops encode 'Hello, World!' 7               -> Olssv3'^vysk(
  // ./8.1.4_loops decode Olssv3\'\^vysk\(U 7 7           -> Hello, World!

 //performCaesarCipher("Hello, World!", 7);

  char *action = argv[1];
  char *text = argv[2];
  int shift = atoi(argv[3]);
  if (strcmp(action, "encode") == 0)
  {
    performCaesarCipher(text, shift);
  }
  else if (strcmp(action, "decode") == 0)
  {
    performCaesarCipher(text, -1 * shift);
  }
  else
  {
    printf("Invalid first argument. Only 'encode' or 'decode' is allowed!");
    return -1;
  }

  return 0;
}