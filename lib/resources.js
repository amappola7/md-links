import process from 'node:process'; // To extract the arguments passed
import path from 'node:path'; // For absolute paths
import * as fs from 'node:fs/promises';

const passedPath = process.argv[2];

/**
 * Function to check if it is an absolute or a relative path and return the absolute path
 * @param {string} userPath A relative or absolute path
 * @returns An absolute path
 */
const getAbsolutePath = (userPath) => {
  const isAbsolute = path.isAbsolute(userPath);

  if (isAbsolute) {
    const absolutePath = userPath;
    return absolutePath;
  } else {
    const absolutePath = path.resolve(userPath);
    return absolutePath;
  }
}

/**
 * Function to check if a given path it's a directory or a file
 * @param {string} userPath An absolute path
 * @returns It returns true if the path is a directory or false if the path is a file. It returns an error if the path doesn't exists.
 */
const checkDirOrFile = (userPath) => {
  const workingPath = getAbsolutePath(userPath);
  fs.stat(workingPath)
  .then ((stats) => {
    const result = stats.isDirectory();
    return result;
  })
  .catch((error) => {
    throw new Error('Path does not exists')
  })
};

/**
 * Function to check if the extension of a file is .md
 * @param {string} userPath An absolute path
 * @returns It returns true is the extension of a file is .md, otherwise returns false
 */
const checkFileExtension = (userPath) => {
  const workingPath = getAbsolutePath(userPath);
  const result = path.extname(workingPath);

  if (result === '.md'){
    return true
  } else {
    return false
  }
}

/**
 * Function to read a directory
 */

/**
 * Function to search for links
 * @param {string} fileContent A string with the content where it will search for links
 * @return {array} An array with all the links founded
 */
const getLinks = (fileContent) => {
  const regexpLink = /http[^)]+/g;
  const links = fileContent.match(regexpLink);
  return links;
}

/**
 * Function to read a file and get its content
 * @param {string} userPath An absolute path
 * @returns {string} A string with the content of the file
 */
const getFileContent = (userPath) => {
  const workingPath = getAbsolutePath(userPath);
  const prueba = fs.readFile(workingPath, 'utf-8')
  .then((content) => {
    return content;
  })
  .catch(() => {
    throw new Error('File cannot be read');
  })

  const fileContent = () => {
    prueba.then((content) => {
      console.log(content);
      return content
    })
  }

  const file = fileContent();
  return file;
}

console.log(getFileContent(passedPath));

