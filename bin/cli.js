#!/usr/bin/env node
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable valid-typeof */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import process from 'node:process';
import chalk from 'chalk';
import figlet from 'figlet';
import { mdLinks } from '../lib/mdLinks.js';
import {
  getStatsWithoutValidate, getStatsWithValidate, evaluateArguments,
} from '../lib/cliResources.js';

/**
 * Command Line Interface Function. It extracts all http / https links from a directory or file
 * @param {string} path An absolute or relative path to a directory or .md file
 * @param {boolean} validate A boolean, if true an HTTP request will be made to validate the links
 * @param {boolean} stats A boolean, if true it will be printed in console some stats about the links
 * @return It doesn't return anything, just print in console the result.
 */
export const cli = (argumentsArray) => {
  const argumentsResult = evaluateArguments(argumentsArray);

  if (typeof argumentsArray === String) {
    console.log(argumentsResult);
    return argumentsResult;
  }
  return mdLinks(argumentsResult.path, argumentsResult.validate)
    .then((links) => {
      if (argumentsResult.stats === false && argumentsResult.validate === false) {
        console.log(chalk.magenta(figlet.textSync('.md Links', { horizontalLayout: 'full' })));
        links.forEach((link) => {
          console.log(chalk.blue('id:'), chalk.white(link.id));
          console.log(chalk.blue('Path:'), link.file);
          console.log(chalk.blue('Link:'), link.href);
          console.log(chalk.blue('Text:'), link.text, '\n');
        });
      } else if (argumentsResult.stats === false && argumentsResult.validate === true) {
        console.log(chalk.blue(figlet.textSync('.md Links', { horizontalLayout: 'full' })));
        links.forEach((link) => {
          console.log(chalk.magenta('id:'), chalk.white(link.id));
          console.log(chalk.magenta('Path:'), link.file);
          console.log(chalk.magenta('Link:'), link.href);
          console.log(chalk.magenta('Status:'), link.statusText);
          console.log(chalk.magenta('Code:'), chalk.white(link.status));
          console.log(chalk.magenta('Text:'), link.text, '\n');
        });
      } else if (argumentsResult.validate === true) {
        const result = getStatsWithValidate(links);
        console.log(chalk.blue(figlet.textSync('.md Links', { horizontalLayout: 'full' })));
        console.log(`${chalk.magenta('Total:')} ${result.totalLinks}\n${chalk.magenta('Unique:')} ${result.uniqueLinks}\n${chalk.magenta('Broken:')} ${result.brokenLinks}\n`);
      } else {
        const result = getStatsWithoutValidate(links);
        console.log(chalk.magenta(figlet.textSync('.md Links', { horizontalLayout: 'full' })));
        console.log(`${chalk.blue('Total:')} ${result.totalLinks}\n${chalk.blue('Unique:')} ${result.uniqueLinks}\n`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

cli(process.argv);
