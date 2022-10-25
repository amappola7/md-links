import process from 'node:process'; // To extract the arguments passed
import path, { resolve } from 'node:path'; // For absolute paths
import * as fsAsync from 'node:fs/promises';
import fsSync from 'node:fs';
import fetch from 'node-fetch';

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

const userAbsolutePath = getAbsolutePath(passedPath);

/**
 * Function to check if a given path it's a directory or a file.
 * @param {string} userPath An absolute path
 * @returns It returns true if the path is a directory or false if the path is a file. It returns an error if the path doesn't exists.
 */
const checkDirOrFile = (userPath) => {
  const result = fsSync.statSync(userPath).isDirectory();
  return result;
};

/**
 * Function to check if the extension of a file is .md
 * @param {string} userPath An absolute path
 * @returns It returns true is the extension of a file is .md, otherwise returns false
 */
const checkFileExtension = (userPath) => {
  const result = path.extname(userPath);

  if (result === '.md'){
    return true
  } else {
    return false
  }
}

/**
 * Function to read a directory and extract all the paths for its .md files
 * @param {string} userPath An absolute path
 * @param {array} mdFiles The array where it will save the files
 * @returns {array} An array with the paths of all the .md files founded
 */
const getDirectoryFiles = (userPath, mdFiles = []) => {
  const files = fsSync.readdirSync(userPath, 'utf-8');

  files.forEach((file) => {
    const type = checkDirOrFile(`${userPath}/${file}`);

    if (type) {
      getDirectoryFiles(`${userPath}/${file}`, mdFiles);
    } else if (checkFileExtension(`${userPath}/${file}`)) {
        mdFiles.push(`${userPath}/${file}`);
      }
    });

  return mdFiles;
}

getDirectoryFiles(userAbsolutePath);

/**
 * Function to search for links with regular expressions
 * @param {string} fileContent A string with the content where it will search for links
 * @return {array} An array with all the links founded
 */
const getLinks = (fileContent, filePath) => {
  // Find with regular expressions the structure of a link ([text](link)) in a .md file
  const regexpLinkAndText = /[^!]\[.+?\]\(.+?\)/g;
  const resultRegexp = fileContent.match(regexpLinkAndText);

  // Create array with only http links
  const links = resultRegexp.filter((link) => {
    if (link.includes('http')){
      return true;
    }
  })

  // Create array of objects with links and its information
  const infoLinks = links.map((link) => {
    const newLink = {
      href: link.match(/https*?:([^"')\s]+)/)[0],
      text: link.match(/\[(.*)\]/)[1],
      file: filePath
    }

    return newLink;
  })

  return infoLinks;
}

/**
 * Function to read a file and get its content
 * @param {string} userPath An absolute path to a file
 * @returns {string} A string with the content of the file
 */
const getFileContent = (userPath) => {
  return new Promise ((resolve, reject) => {
    fsAsync.readFile(userPath, 'utf-8')
    .then((content) => {
      resolve(content);
    })
    .catch(() => {
        reject(Error('File cannot be read'));
    })
  })
}

/**
 * Function to extract links
 * @param {string} userPath An absolute path to a file
 * @returns {Promise} It returns a promise that resolves to an array of objects. Each object contains a link, its text and the path of the file where the link is.
 */
const processFile = (userPath) => {
  getFileContent(userPath)
  .then((content) => {
    const httpLinks = getLinks(content, userPath);
    resolve(httpLinks);
  })
}

/**
 * Function to validate links
 * @param {string} mdLink The link it want to validate and make an HTTP request
 * @returns {Promise} It returns a promise that resolves to the response for a HTTP request.
 */
const validateLink = (mdLink) => {
  return new Promise ((resolve, reject) => {
    fetch(mdLink)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      console.log('Link Not Found');
    })
  })
}


// const resources = {
//   getAbsolutePathF: getAbsolutePath,
//   checkDirOrFile,
//   checkFileExtension,
//   getDirectoryFiles,
//   getLinks,
//   getFileContent,
//   processFile,
// }




































// UNUSED FUNCTIONS
/**
 * Function to check if a given path it's a directory or a file.
 * @param {string} userPath An absolute path
 * @returns It returns true if the path is a directory or false if the path is a file. It returns an error if the path doesn't exists.
 */
 const checkDirOrFileAsync = (userPath) => {
  fsAsync.stat(userPath)
  .then ((stats) => {
    const result = stats.isDirectory();
    return result;
  })
  .catch((error) => {
    throw new Error('Path does not exists')
  })
};

