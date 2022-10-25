import process from 'node:process'; // To extract the arguments passed
import path from 'node:path'; // For absolute paths
import * as fsAsync from 'node:fs/promises';
import fsSync from 'node:fs';

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
  fsSync.statSync(userPath).isDirectory()
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

/**
 * Function to search for links with regular expressions
 * @param {string} fileContent A string with the content where it will search for links
 * @return {array} An array with all the links founded
 */
const getLinks = (fileContent, filePath) => {
  const regexpLink = /http[^)]+/g;
  const links = fileContent.match(regexpLink);
  const cleanLinks = links.map((link) => {
    const newLink = {
      href: link,
      text: 'Hola',
      file: filePath
    }

    return newLink;
  })
  return cleanLinks;
}

/**
 * Function to read a file and get its content
 * @param {string} userPath An absolute path
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
 */
const processFile = (userPath) => {
  getFileContent(userPath)
  .then((content) => {
    const httpLinks = getLinks(content, userPath);
    console.log(httpLinks);
  })
}

processFile(userAbsolutePath);
// module.exports




































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

