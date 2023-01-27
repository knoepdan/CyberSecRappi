package javaproject.com;

import javaproject.com.shapes.Parallelogram;
import javaproject.com.shapes.Shape;
import javaproject.com.shapes.Triangle;

public class JavaProject {
	public static void main(String[] args) {
		// program covers
		// 10.1.2.1 classes
		// 10.1.2.2 packages etc.
		// 10.1.3 -> control structures

		boolean keepAsking = true;
		while (keepAsking) {
			createShapeByUserInpt();

			// ask if to
			System.out.println("Do you want to calculate anything further? ");
			String answer = System.console().readLine().trim().toLowerCase();
			if (answer.equals("no")) {
				keepAsking = false;
			} else if (answer.equals("yes")) {
				// ok
			} else {
				System.out.println("I didn't quite get your answer.. but lets keep trying");
			}
		}
	}

	private static void createShapeByUserInpt() {
		System.out.println("What shape? ");
		String answer = System.console().readLine().trim().toLowerCase();

		Shape shape = null;
		switch (answer) {
			case "triangle":
				shape = createTriangleByUserInput();
				break;
			case "parallelogram":
				shape = createParallelogramByUserInput();
				break;
			default:
				System.out.println("I am sorry.. I don't know this shape");
				break;
		}

		if (shape != null) {
			System.out.println("You created " + shape + "!  area: " + shape.calculateArea() + "    cirumference: "
					+ shape.calculateCircumference());

		} else {
			System.out.println("No shape could be created");
		}
	}

	private static Triangle createTriangleByUserInput() {

		double a = getNumberFromUserInput("What lenght for side a? ");
		double b = getNumberFromUserInput("What lenght for side b? ");
		double gamma = getNumberFromUserInput("What should be the value for gamme? ");

		return new Triangle(a, b, gamma);
	}

	private static Parallelogram createParallelogramByUserInput() {

		double base = getNumberFromUserInput("What is the base length? ");
		double height = getNumberFromUserInput("What should be the height? ");
		double angle = getNumberFromUserInput("What is the angle? ");

		return new Parallelogram(base, height, angle);
	}

	private static double getNumberFromUserInput(String question) {

		double val = 0;
		boolean validAnswer = false;

		while (!validAnswer) {
			System.out.println(question);
			String stringVal = System.console().readLine().trim();
			try {
				val = Double.parseDouble(stringVal);
				validAnswer = true;
			} catch (NumberFormatException e) {
				System.out.println("Ups I don't think this was a number. Try again");
			}
		}
		return Math.abs(val);
	}

	/*
	 * private static void examplePrints() {
	 * Shape tri = new Triangle(15, 15, 60);
	 * System.out.println("Hello I am a " + tri + "  area: " + tri.calculateArea() +
	 * "    cirumference: "
	 * + tri.calculateCircumference());
	 * 
	 * Shape para = new Parallelogram(15, 15, 60);
	 * System.out.println("Hello I am a " + para + "  area: " + para.calculateArea()
	 * + "    cirumference: "
	 * + para.calculateCircumference());
	 * 
	 * //
	 * Shape tri2 = new Triangle(10, 10, 90);
	 * System.out.println("2. Hello I am a " + tri2 + "  area: " +
	 * tri2.calculateArea() + "    cirumference: "
	 * + tri2.calculateCircumference());
	 * 
	 * Shape para2 = new Parallelogram(10, 10, 90);
	 * System.out.println("2. Hello I am a " + para2 + "  area: " +
	 * para2.calculateArea() + "    cirumference: "
	 * + para2.calculateCircumference());
	 * }
	 */
}
