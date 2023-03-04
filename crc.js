#! /usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import { mainFunc } from "./func.js";
const program = new Command();

const questions = [
  {
    type: "input",
    name: "msgBits",
    message: "Input the message bits?",
  },
  {
    type: "input",
    name: "genBits",
    message: "Input the generator bits?",
  },
];
program
  .name("crc-checker")
  .description("cyclic redundancy tool")
  .usage("<command>")
  .version("1.0.0");

program
  .command("check")
  .description("checks for error")
  .alias("chk")
  .action(() => {
    inquirer.prompt(questions).then((answers) => {
      const { msgBits, genBits } = answers;
      console.log(mainFunc(msgBits, genBits));
    });
  });
program.parse(process.argv);
