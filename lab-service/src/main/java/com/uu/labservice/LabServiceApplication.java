package com.uu.labservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LabServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(LabServiceApplication.class, args);
		System.out.println("\u001B[32m" + "Lab service on: 8082." + "\u001B[0m");
	}

}
