const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const initQuestions = [
    {
        type: "input",
        message: "Enter your full name",
        name: "name"
    },

    {
        type: "input",
        message: "Enter your employee ID",
        name: "id"
    },

    {
       type: "input",
       message: "Enter your email",
       name: "email"
    },

    {
        type: "list",
        message: "What is your role?",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role"
    },

    {
        type: "input",
        message: "Enter your office number",
        when: function(answers) {
            return (answers.role === "Manager")
        },
        name: "officeNumber"
    },

    {
        type: "input",
        message: "Enter your GitHub username",
        when: function(answers) {
            return (answers.role === "Engineer")
        },
        name: "github"
    },

    {
        type: "input",
        message: "Enter your school's name",
        when: function(answers) {
            return (answers.role === "Intern")
        },
        name: "school"
    },

    {
        type: "confirm",
        message: "Add another employee?",
        name: "addAnother"
    }
];

function init() {

    inquirer
    .prompt(initQuestions)
    .then( response => {
        
        console.log(response);

    });

}

init();

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
