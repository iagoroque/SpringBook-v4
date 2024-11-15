package com.uu.professorservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProfessorServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProfessorServiceApplication.class, args);
		System.out.println("\u001B[32m" + "Professor service on: 8081." + "\u001B[0m");
	}

}
