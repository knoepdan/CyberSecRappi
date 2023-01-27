package javaproject.com;

import javaproject.com.shapes.Parallelogram;
import javaproject.com.shapes.Shape;
import javaproject.com.shapes.Triangle;

public class JavaProject {
	public static void main(String[] args) {

		Shape tri = new Triangle(15, 15, 60);
		System.out.println("Hello I am a " + tri + "  area: " + tri.calculateArea() + "    cirumference: "
				+ tri.calculateCircumference());

		Shape para = new Parallelogram(15, 15, 60);
		System.out.println("Hello I am a " + para + "  area: " + para.calculateArea() + "    cirumference: "
				+ para.calculateCircumference());

		//
		Shape tri2 = new Triangle(10, 10, 90);
		System.out.println("2. Hello I am a " + tri2 + "  area: " + tri2.calculateArea() + "    cirumference: "
				+ tri2.calculateCircumference());

		Shape para2 = new Parallelogram(10, 10, 90);
		System.out.println("2. Hello I am a " + para2 + "  area: " + para2.calculateArea() + "    cirumference: "
				+ para2.calculateCircumference());

	}
}
