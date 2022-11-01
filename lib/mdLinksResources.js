import path from 'node:path'; // For absolute paths
import * as fsAsync from 'node:fs/promises';
import fsSync from 'node:fs';
import axios from 'axios';
import { get } from 'node:http';

/**
 * Function to check if a path exists or not
 * @param {string} userPath An absolute or relative path
 * @returns It returns true if the path exists, otherwise it returns false
 */
export const checkIfPathExists = (userPath) => {
  const pathExists = fsSync.existsSync(userPath);

  if (pathExists) {
    return true;
  } else {
    return false;
  }
}

/**
 * Function to check if it is an absolute or a relative path and return the absolute path
 * @param {string} userPath A relative or absolute path
 * @returns An absolute path
 */
export const getAbsolutePath = (userPath) => {
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
 * Function to check if a given path it's a directory or a file.
 * @param {string} userPath An absolute path
 * @returns It returns true if the path is a directory or false if the path is a file. It returns an error if the path doesn't exists.
 */
export const checkDirOrFile = (userPath) => {
  const result = fsSync.statSync(userPath).isDirectory();
  return result;
};

/**
 * Function to check if the extension of a file is .md
 * @param {string} userPath An absolute path
 * @returns It returns true is the extension of a file is .md, otherwise returns false
 */
export const checkFileExtension = (userPath) => {
  const result = path.extname(userPath);

  if (result === '.md'){
    return true
  } else {
    return false
  }
}

/**
 * Function to read a directory and extract all the paths for its .md files
 * @param {string} userPath An absolute path to a file or a directory
 * @param {array} mdFiles The array where it will save the files. The function has an empty array by default.
 * @returns {array} An array with the paths of all the .md files founded
 */
export const getPathsOfMdFiles = (userPath, mdFiles = []) => {
  const dirOrFile = checkDirOrFile(userPath);

  if (!dirOrFile) {
    if (checkFileExtension(userPath)) {
      mdFiles.push(userPath);
    } else {
      console.log('Path is not a directory or .md file');
      return 'Path is not a directory or .md file';
    }
  } else {
    const files = fsSync.readdirSync(userPath, 'utf-8');

    files.forEach((file) => {
      const type = checkDirOrFile(`${userPath}/${file}`);

      if (type) {
        getPathsOfMdFiles(`${userPath}/${file}`, mdFiles);
      } else if (checkFileExtension(`${userPath}/${file}`)) {
          mdFiles.push(`${userPath}/${file}`);
        }
      });
  }

  return mdFiles;
}

/**
 * Function to search for links with regular expressions
 * @param {string} fileContent A string with the content where it will search for links
 * @return {array} An array with all the links founded
 */
export const getLinks = (fileContent, filePath) => {
  // Find with regular expressions the structure of a link ([text](link)) in a .md file
  const regexpLinkAndText = /[^!]\[.+?\]\(.+?\)/g;
  const resultRegexp = fileContent.match(regexpLinkAndText);

  try {
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
  } catch {
    return [];
  }
}

/**
 * Function to read a file and get its content
 * @param {string} userPath An absolute path to a file
 * @returns {string} A string with the content of the file
 */
export const getFileLinks = (userPath) => {
  return new Promise((resolve, reject) => {
    fsAsync.readFile(userPath, 'utf-8')
    .then((content) => {
      const links = getLinks(content, userPath);
      resolve(links);
    })
  })
}

/**
 * Function to make an HTTP request and validate links
 * @param {object} An object that contains the href of the link that want to validate.
 * @returns {Promise} It returns a promise that resolves to the response for a HTTP request.
 */
export const validateLink = (mdLink) => {
  return new Promise ((resolve, reject) => {
    axios.get(mdLink.href)
    .then((response) => {
      mdLink.status = response.status;
      mdLink.statusText = response.statusText;
      resolve(mdLink);
    })
    .catch(() => {
      mdLink.status = null;
      mdLink.statusText = null;
      mdLink.error = 'Could not make HTTP request';
      resolve(mdLink);
    })
  })
}


