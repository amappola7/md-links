/* eslint-disable consistent-return */
/* eslint-disable max-len */
import process from 'node:process'; // To extract the arguments passed

export const argumentsProcessArgv = process.argv;

/**
 * Function to make stats of the links without validate it.
 * @param {array} links It takes an array of objects with links in it to make the stats.
 * @returns {object} It returns an object with the stats obtained.
 */
export const getStatsWithoutValidate = (linksObjects) => {
  const links = linksObjects.map((linkObject) => linkObject.href);

  return {
    totalLinks: linksObjects.length,
    uniqueLinks: new Set(links).size,
  };
};

/**
 * Function to make stats of the links validated.
 * @param {array} links It takes an array of objects with links in it to make the stats.
 * @returns {object} It returns an object with the stats obtained.
 */
export const getStatsWithValidate = (linksObjects) => {
  const resultStatsWithoutValidate = getStatsWithoutValidate(linksObjects);

  let counterBrokenlinks = 0;
  linksObjects.forEach((linkObject) => {
    if ((linkObject.status >= 400 && linkObject.status <= 599) || (linkObject.status === null)) {
      counterBrokenlinks += 1;
    }
  });

  resultStatsWithoutValidate.brokenLinks = counterBrokenlinks;

  return resultStatsWithoutValidate;
};

/**
 * Function to evaluate arguments
 * @param {array} argumentsArray It takes an array of arguments extract from process.argv
 * @returns {object || string} It returns a string with an error message for invalid commands. Otherwise, it returns an object with the values of the commands and the path of the file.
 */

export const evaluateArguments = (argumentsArray) => {
  if (argumentsArray.length < 3) {
    return 'Path does not exists';
  }

  if (argumentsArray.length === 3) {
    return { path: argumentsArray[2], validate: false, stats: false };
  }

  if (argumentsArray.length === 4) {
    if (argumentsArray[3] === '--validate') {
      return { path: argumentsArray[2], validate: true, stats: false };
    } if (argumentsArray[3] === '--stats') {
      return { path: argumentsArray[2], validate: false, stats: true };
    } if (argumentsArray[3] !== '--validate' || argumentsArray[3] !== '--stats') {
      return `Command '${argumentsArray[3]}' not found. Try with:\n--validate\n--stats\n--validate --stats`;
    }
  }

  if (argumentsArray.length === 5) {
    if (argumentsArray[3] === '--validate' && argumentsArray[4] === '--stats') {
      return { path: argumentsArray[2], validate: true, stats: true };
    } if (argumentsArray[3] === '--stats' && argumentsArray[4] === '--validate') {
      return 'Invalid command. Try with:\n--validate --stats';
    }
    return `Command '${argumentsArray[3]} ${argumentsArray[4]}' not found. Try with:\n--validate --stats`;
  }
};
