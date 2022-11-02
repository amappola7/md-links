/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable valid-typeof */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import { mdLinks } from './mdLinks.js';
import {
  argumentsProcessArgv, getStatsWithoutValidate, getStatsWithValidate, evaluateArguments,
} from './cliResources.js';

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
  mdLinks(argumentsResult.path, argumentsResult.validate)
    .then((links) => {
      if (argumentsResult.stats === false) {
        console.log(links);
      } else if (argumentsResult.validate === true) {
        const result = getStatsWithValidate(links);
        console.log(`Total: ${result.totalLinks}\nUnique: ${result.uniqueLinks}\nBroken: ${result.brokenLinks}`);
      } else {
        const result = getStatsWithoutValidate(links);
        console.log(`Total: ${result.totalLinks}\nUnique: ${result.uniqueLinks}`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

cli(argumentsProcessArgv);
