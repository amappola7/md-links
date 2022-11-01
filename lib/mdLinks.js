import { checkIfPathExists, getAbsolutePath, getPathsOfMdFiles , getFileLinks, validateLink} from './mdLinksResources.js'

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

  return new Promise((resolve, reject) => {
    if (pathExists) {
      const mdLinks = mdFilesPaths.map((filePath) => getFileLinks(filePath));

      Promise.all(mdLinks).then((mdLinks) => {
        mdLinks = mdLinks.flat();
        // Adding an ID for each link
        let idCounter = 0;
        const mdLinksWithId = mdLinks.map((link) => {
          idCounter++;
          link.id = idCounter;
          return link;
        })

        if (validate === false) {
          resolve(mdLinksWithId);
        } else {
          const validatedLinks = mdLinksWithId.map((link) => validateLink(link));

          Promise.all(validatedLinks).then((validatedLinks) => {
            resolve(validatedLinks);
          })
        }
      })
    } else {
      reject(new TypeError('Path does not exists'));
  }
  })
};









