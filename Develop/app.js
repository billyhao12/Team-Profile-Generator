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
    }

];

const addAnother = {
    type: "confirm",
    message: "Add another employee?",
    name: "addAnother"
};

const managerQuestions = [
    {
        type: "input",
        message: "Enter your office number",
        name: "officeNumber"
    },

    addAnother
];

const engineerQuestions = [
    {
        type: "input",
        message: "Enter your GitHub username",
        name: "github"
    },

    addAnother
];

const internQuestions = [
    {
        type: "input",
        message: "Enter your school's name",
        name: "school"
    },

    addAnother
];

function writeToFile(fileName, data) {

    fs.writeFile(fileName, render(data), function(error) {
        if (error) console.log(error);
        else console.log('Success!');
    });

}

function init() {

    inquirer
    .prompt(initQuestions)
    .then( response => {
        
        if (response.role === "Manager") {
            inquirer
            .prompt(managerQuestions)
            .then( response => {
                console.log(response);
                if(response.addAnother) init();
            });
        };

        if (response.role === "Engineer") {
            inquirer
            .prompt(engineerQuestions)
            .then( response => {
                console.log(response);
                if(response.addAnother) init();
            });
        };

        if (response.role === "Intern") {
            inquirer
            .prompt(internQuestions)
            .then( response => {
                console.log(response);
                if(response.addAnother) init();
            });
        };

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
