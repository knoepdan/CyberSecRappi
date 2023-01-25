public class Exercises {
	public static void main(String[] args) {
		System.out.println("Hello, Java!");

		dataStructures();
	}

	private static void dataStructures(){

		// 10.1.1.1 Constants and variables
		int someInt = 3;
		char someChar = 'a';

		someInt = someInt + 5;
		someChar = (char) ((short)someChar + 5);

		System.out.println("Some int: "+ someInt + ", someChar: " + someChar);// somechar is 'f' cause for most encodings - including utf8/unicode - the alphabet characters are in 'correct' order
	}
}
