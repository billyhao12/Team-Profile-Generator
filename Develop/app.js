const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

employeeQuestions = [

    {
        type: "input",
        message: "Enter employee's full name",
        name: "name"
    },

    {
        type: "input",
        message: "Enter employee ID",
        name: "id"
    },

    {
        type: "input",
        message: "Enter employee's email",
        name: "email"
    }

];

function askForManagerInfo() {

    console.log("---------------------");
    console.log("Enter manager info");
    console.log("---------------------");

    inquirer
        .prompt(
            [
                ...employeeQuestions,
                {
                    type: "input",
                    message: "Enter your office number",
                    name: "officeNumber"
                }
            ])

        .then(( {name, id, email, officeNumber} ) => {
            employees.push(new Manager(name, id, email, officeNumber));
            console.log(employees);
            askForRole();
        });

}

function askForRole() {

    console.log("---------------------");
    console.log("Adding a team member");
    console.log("---------------------");

    inquirer
        .prompt(
            [
                {
                    type: "list",
                    message: "What is your role?",
                    choices: ["Engineer", "Intern"],
                    name: "role"
                }
            ])

        .then(( {role} ) => {
            role === "Engineer" ? askForEngineerInfo() : askForInternInfo();
        });

}

function askForEngineerInfo() {

    console.log("---------------------");
    console.log("Enter engineer info");
    console.log("---------------------");

    inquirer
        .prompt(
            [
                ...employeeQuestions,
                {
                    type: "input",
                    message: "Enter your GitHub username",
                    name: "github"
                }

            ])

        .then( ({name, id, email, github}) => {
            employees.push( new Engineer(name, id, email, github) );
            console.log(employees);
            addAnother();
        });

}

function askForInternInfo() {

    console.log("---------------------");
    console.log("Enter intern info");
    console.log("---------------------");

    inquirer
        .prompt(
            [
                ...employeeQuestions,
                {
                    type: "input",
                    message: "Enter your school's name",
                    name: "school"
                }

            ])
        .then( ({name, id, email, school}) => {
            employees.push(new Intern(name, id, email, school));
            console.log(employees);
            addAnother();
        });
}

function addAnother() {

    inquirer
        .prompt(
            [
                {
                    type: "confirm",
                    message: "Add another team member?",
                    name: "addAnother"
                }

            ])
        .then( ({addAnother}) => {
            if (addAnother) askForRole()
            else console.log(employees);
        });
}

askForManagerInfo();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.