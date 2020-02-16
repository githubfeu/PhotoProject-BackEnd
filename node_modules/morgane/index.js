#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const terminalLink = require('terminal-link');

console.log(
    boxen(
        chalk.bold.green("Morgane Jansen") + "\n \n" +
        chalk.yellow.italic("Junior web developer") + "\n \n" +
        chalk.magenta(terminalLink('Github', 'https://github.com/MorganeBeCode')) + "\n \n" +
        chalk.magenta(terminalLink('Linkedin', 'https://www.linkedin.com/in/morgane-jansen-04a0b6191/')) + "\n \n" +
        chalk.magenta("Discord: Bleizez#5935") + "\n \n" +
        chalk.bold("Card: ") + chalk.cyan("npx morgane")
        ,
        { padding: 2, margin: 1, borderStyle: 'round', borderColor: 'yellow', align: 'center', float: 'center' })
)
