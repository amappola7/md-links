import {passedPath, checkIfPathExists, getAbsolutePath, getPathsOfMdFiles, processFile, responseHTTPRequest } from './resources.js'
import fetch from 'node-fetch';

/**
 * .md Links Function. It extracts all http / https links from a directory or file
 * @param {string} path An absolute or relative path to a directory or file
 * @param {boolean} validate A boolean, if true an HTTP request will be made to validate the links
 * @return {Promise} It returns a promise. It's resolved to an array of objects with links and some other information
 */
// Function with index
const validateFalse = (userPath) => {
  const pathExists = checkIfPathExists(userPath);

  if (pathExists) {
    const userAbsolutePath = getAbsolutePath(userPath);
    const mdFilesPaths = getPathsOfMdFiles(userAbsolutePath);

    return new Promise((resolve, reject) => {
      const mdLinksProcessed = mdFilesPaths.map((filePath) => processFile(filePath));

      Promise.all(mdLinksProcessed).then((mdLinksIndividualResult) => {
        const mdLinksTotalResult = mdLinksIndividualResult.flat();
        let idCounter = 0;
        const mdLinksWithId = mdLinksTotalResult.map((link) => {
          idCounter++;
          link.id = idCounter;
          return link;
        })

        resolve(mdLinksWithId);
      })
    })
  } else {
    throw new TypeError('Path does not exists');
  }
}

// validateFalse(passedPath)
// .then((mdLinks) => {
//   console.log(mdLinks);
// })

const validateTrue = (userPath) => {
  validateFalse(userPath)
  .then((mdLinks) => {
      const linksValidated = mdLinks.map((link) => {
        try {
          fetch(link.href).then((response) => {
            link.status = response.status;
            link ? link.ok = 'ok' : link.ok = 'fail';
            console.log(link);
          })
        } catch (error) {
          link.status = 'ENOTFOUNDED'
          link.ok = 'ENOTFOUNDED'ñ
          return link
        }
      }
      );
  })
  .catch((error) => {
    console.log('PRUEBA', error);
  })
}

validateTrue(passedPath);