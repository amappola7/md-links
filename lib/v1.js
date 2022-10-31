import {passedPath, checkIfPathExists, getAbsolutePath, getPathsOfMdFiles, processFile, responseHTTPRequest } from './resources.js'

/**
 * .md Links Function. It extracts all http / https links from a directory or file
 * @param {string} path An absolute or relative path to a directory or file
 * @param {boolean} validate A boolean, if true an HTTP request will be made to validate the links
 * @return {Promise} It returns a promise. It's resolved to an array of objects with links and some other information
 */
const mdLinks = (userPath, validate = false) => {
  const pathExists = checkIfPathExists(userPath);

  if (pathExists) {
    const userAbsolutePath = getAbsolutePath(userPath);
    const mdFilesPaths = getPathsOfMdFiles(userAbsolutePath);

    if (validate === false) {
      return new Promise((resolve, reject) => {
        const mdLinksProcessed = mdFilesPaths.map((filePath) => processFile(filePath));

        Promise.all(mdLinksProcessed).then((mdLinksResult) => {
          resolve(mdLinksResult.flat());
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        const mdLinksProcessed = mdFilesPaths.map((filePath) => processFile(filePath));
        const mdLinksValidated = mdLinksProcessed.map((link) => responseHTTPRequest(link));

        Promise.all(mdLinksProcessed).then((mdLinksResult) => {
          const prueba = mdLinksResult.flat();
          const mdLinksValidated = prueba.map((link) => responseHTTPRequest(link));

          Promise.all(mdLinksValidated).then((result) => {
            resolve(result.flat());
          })
        })
      })
    }
  } else {
    throw new TypeError('Path does not exists');
  }
}

mdLinks(passedPath)
.then((mdLinks) => {
  console.log(mdLinks);
})