import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class Exercises {
	public static void main(String[] args) {
		System.out.println("Hello, Java!");

		dataStructures();
	}

	private static void dataStructures() {

		// 10.1.1.1 Constants and variables
		int someInt = 3;
		char someChar = 'a';

		someInt = someInt + 5;
		someChar = (char) ((short) someChar + 5);

		System.out.println("Some int: " + someInt + ", someChar: " + someChar);// somechar is 'f' cause for most
																				// encodings - including utf8/unicode -
																				// the alphabet characters are in
																				// 'correct' order

		// 10.1.1.2 Arrays
		// Part one
		int[] arrayA = { 4, 1, 2, 9 };
		String[] arrayB = { "Foo", "Bar", "Bar", "Foo" };
		System.out.println("10.1.1.2 Part one: " + arrayB[arrayA[2]]); // third item in arrayA (index 2) pointing to
																		// text in arrayB
		// Part two

		ArrayList<String> arrList = new ArrayList<String>(Arrays.asList(arrayB));
		arrList.remove("Bar"); // would be possible to replace "Bar" with arrayB[arrayA[2]]
		System.out.println("10.1.1.2 Part two: " + Arrays.toString(arrList.toArray()));

		// 10.1.1.3 Maps
		Map<String, Integer> shapeCorners = new HashMap<>(Map.of(
				"Triangle", 3,
				"Rectangle", 4,
				"Pentagon", 5));
		Map<Integer, String> shapeNames = new HashMap<>();
		for (Map.Entry<String, Integer> entry : shapeCorners.entrySet()) {
			shapeNames.put(entry.getValue(), entry.getKey());
		}
		/*
		 * initializing by hand.. somewhat error prone
		 * Map<Integer, String> newShapeNames = new HashMap<>(Map.of(
		 * 3, "Triangle",
		 * 4, "Rectangle",
		 * 5, "Pentagon")
		 * );
		 */
		System.out.println(shapeNames);

	}
}
