/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import {
  checkIfPathExists, getAbsolutePath, getPathsOfMdFiles, getFileLinks, validateLink,
} from './mdLinksResources.js';

/**
 * .md Links Function. It extracts all http / https links from a directory or file
 * @param {string} path An absolute or relative path to a directory or .md file
 * @param {boolean} validate A boolean, if true an HTTP request will be made to validate the links
 * @return {Promise} It returns a promise. It's resolved to an array of objects with links and some other information
 */

export const mdLinks = (userPath, validate = false) => {
  const pathExists = checkIfPathExists(userPath);
  const userAbsolutePath = getAbsolutePath(userPath);
  const mdFilesPaths = getPathsOfMdFiles(userAbsolutePath);

  if (pathExists) {
    return new Promise((resolve, reject) => {
      const mdLinks = mdFilesPaths.map((filePath) => getFileLinks(filePath));

      Promise.all(mdLinks).then((mdLinks) => {
        mdLinks = mdLinks.flat();

        // Adding an ID for each link
        let idCounter = 0;
        const mdLinksWithId = mdLinks.map((link) => {
          idCounter += 1;
          link.id = idCounter;
          return link;
        });

        if (validate === false) {
          resolve(mdLinksWithId);
        } else {
          const validatedLinks = mdLinksWithId.map((link) => validateLink(link));

          Promise.all(validatedLinks).then((validatedLinks) => {
            resolve(validatedLinks);
          });
        }
      });
    });
  }
  console.log('Path does not exists');
  return 'Path does not exists';
};
