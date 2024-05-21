#! /usr/bin/env node

import inquirer from "inquirer"; // Importing inquirer for interactive prompts
import chalk from "chalk"; // Importing chalk for styling console output

console.log(chalk.cyanBright.bold.italic("    Wellcome to  'sohailnawaz' - with - code ⭐⭐⭐"));


// Class representing a student
class Student {
    name: string; // Name of the student

    // Constructor to initialize student name
    constructor(n: string) {
        this.name = n;
    }
}

// Class representing a person managing students
class Person {
    students: Student[] = []; // Array to store students

    // Method to add a student to the list
    addStudent(obj: Student) {
        this.students.push(obj);
    }
}

const persons = new Person(); // Create an instance of Person to manage students

// Function to start the program and interact with staff and students
const programStart = async (persons: Person) => {

    // Prompt the user to select whom they want to interact with
    const ans = await inquirer.prompt({
        name: "select",
        type: "list",
        message: chalk.green("Whom would you like to interact with?"),
        choices: ["Staff", "Student", "Exit"]
    });

    if (ans.select === "Staff") {
        // If the user selects 'Staff', display a message indicating they are in the staff room
        console.log(chalk.yellow("You Approach The Staff Room. Please Feel Free To Ask Any questions."));
    } else if (ans.select === "Student") {
        // If the user selects 'Student', prompt for the student's name
        const studentAns = await inquirer.prompt({
            name: "studentName",
            type: "input",
            message: chalk.green("Enter the student name you wish to engage with:")
        });

        // Check if the entered student name exists in the list of students
        let student = persons.students.find(val => val.name === studentAns.studentName);

        if (!student) {
            // If the student is not found, create a new student object and add it to the list
            student = new Student(studentAns.studentName);
            persons.addStudent(student);
            console.log(chalk.magenta(`Hello, I am ${student.name}. Nice to meet you!`)); // Greet the new student
            console.log(chalk.green("New Student added."));
        } else {
            // If the student is found, greet the student
            console.log(chalk.cyan(`Hello, I am ${student.name}. Nice to see you again!`));
        }

        // Display the current list of students
        console.log(chalk.blue("Current student list:"));
        console.log(persons.students.map(s => ({ name: s.name })));
    } else if (ans.select === "Exit") {
        // If the user selects 'Exit', display a message indicating program exit
        console.log(chalk.red("Exiting the program..."));
    }
}

// Start the program by calling programStart function with the Person instance
programStart(persons);
