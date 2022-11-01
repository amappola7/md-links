import process from 'node:process'; // To extract the arguments passed

export const argumentsArray = process.argv;

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
  }
}

/**
 * Function to make stats of the links validated.
 * @param {array} links It takes an array of objects with links in it to make the stats.
 * @returns {object} It returns an object with the stats obtained.
 */
export const getStatsWithValidate = (linksObjects) => {
  const resultStatsWithoutValidate = getStatsWithoutValidate(linksObjects);

  let counterBrokenlinks = 0;
  linksObjects.forEach((linkObject) => {
    if (linkObject.status >= 400 && linkObject.status <= 599 || linkObject.status === null) {
      counterBrokenlinks++
    }
  });

  resultStatsWithoutValidate.brokenLinks = counterBrokenlinks;

  return resultStatsWithoutValidate;
}

/**
 * Function to evaluate arguments
 * @param {array} argumentsArray It takes an array of arguments extract from process.argv
 * @returns {object || string} It returns a string with an error message for invalid commands. Otherwise, it returns an object with the values of the commands and the path of the file.
 */

export const evaluateArguments = (argumentsArray) => {
  if (argumentsArray.length < 3) {
    return 'Path does not exists'
  }

  if (argumentsArray.length === 3) {
    return {path: argumentsArray[2], validate: false, stats: false}
  }

  if (argumentsArray.length === 4) {
    if (argumentsArray[3] === '--validate') {
      return {path: argumentsArray[2], validate: true, stats: false}
    } else if (argumentsArray[3] === '--stats') {
      return {path: argumentsArray[2], validate: false, stats: true}
    } else if (argumentsArray[3] !== '--validate' || argumentsArray[3] !== '--stats') {
      return `Command '${argumentsArray[3]}' not found. Try with:\n--validate\n--stats\n--validate --stats`
    }
  }

  if (argumentsArray.length === 5) {
    if (argumentsArray[3] === '--validate' && argumentsArray[4] === '--stats' ) {
      return {path: argumentsArray[2], validate: true, stats: true}
    } else if (argumentsArray[3] === '--stats' && argumentsArray[4] === '--validate' ) {
      return `Invalid command. Try with:\n--validate --stats`
    } else {
      return `Command '${argumentsArray[3]} ${argumentsArray[4]}' not found. Try with:\n--validate --stats`
    }
  }
}

















// const prueba = [
//   {
//     href: 'https://img.shields.io/npm/v/asynckit.svg?style=flat',
//     text: '![NPM Module',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/asynckit/README.md',
//     id: 1
//   },
//   {
//     href: 'https://img.shields.io/travis/alexindigo/asynckit/v0.4.0.svg?label=browser&style=flat',
//     text: '![PhantomJS Build',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/asynckit/README.md',
//     id: 2
//   },
//   {
//     href: 'https://img.shields.io/travis/alexindigo/asynckit/v0.4.0.svg?label=linux:0.12-6.x&style=flat',
//     text: '![Linux Build',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/asynckit/README.md',
//     id: 3
//   },
//   {
//     href: 'https://img.shields.io/npm/v/asynckit.svg?style=flat',
//     text: '![NPM Module',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/asynckit/README.md',
//     id: 1
//   },
//   {
//     href: 'https://img.shields.io/travis/alexindigo/asynckit/v0.4.0.svg?label=browser&style=flat',
//     text: '![PhantomJS Build',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/asynckit/README.md',
//     id: 2
//   },
//   {
//     href: 'https://img.shields.io/travis/alexindigo/asynckit/v0.4.0.svg?label=linux:0.12-6.x&style=flat',
//     text: '![Linux Build',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/asynckit/README.md',
//     id: 3
//   },
//   {
//     href: 'https://img.shields.io/appveyor/ci/alexindigo/asynckit/v0.4.0.svg?label=windows:0.12-6.x&style=flat',
//     text: '![Windows Build',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/asynckit/README.md',
//     id: 4
//   },
//   {
//     href: 'https://img.shields.io/coveralls/alexindigo/asynckit/v0.4.0.svg?label=code+coverage&style=flat',
//     text: '![Coverage Status',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/asynckit/README.md',
//     id: 5
//   },
//   {
//     href: 'https://img.shields.io/david/alexindigo/asynckit/v0.4.0.svg?style=flat',
//     text: '![Dependency Status',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/asynckit/README.md',
//     id: 6
//   },
//   {
//     href: 'https://www.bithound.io/github/alexindigo/asynckit/badges/score.svg',
//     text: '![bitHound Overall Score',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/asynckit/README.md',
//     id: 7
//   },
//   {
//     href: 'https://img.shields.io/badge/readme-tested-brightgreen.svg?style=flat',
//     text: '![Readme',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/asynckit/README.md',
//     id: 8
//   },
//   {
//     href: 'https://github.com/alexindigo/asynckit/issues',
//     text: 'issue',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/asynckit/README.md',
//     id: 9
//   },
//   {
//     href: 'https://github.com/axios/axios/pull/4624',
//     text: '#4624',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/axios/CHANGELOG.md',
//     id: 10
//   },
//   {
//     href: 'https://github.com/axios/axios/pull/4654',
//     text: '#4654',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/axios/CHANGELOG.md',
//     id: 11
//   },
//   {
//     href: 'https://github.com/axios/axios/pull/4596',
//     text: '#4596',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/axios/CHANGELOG.md',
//     id: 12
//   },
//   {
//     href: 'https://github.com/axios/axios/pull/4668',
//     text: '#4668',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/axios/CHANGELOG.md',
//     id: 13
//   },
//   {
//     href: 'https://github.com/axios/axios/pull/4096',
//     text: '#4096',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/axios/CHANGELOG.md',
//     id: 14
//   },
//   {
//     href: 'https://github.com/axios/axios/pull/4207',
//     text: '#4207',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/node_modules/axios/CHANGELOG.md',
//     id: 15
//   }
// ];

// const prueba2 = [
//   {
//     href: 'https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5',
//     text: 'What exactly is Node.js? - freeCodeCamp',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/mdFiles/readmeMdLinks.md',
//     id: 62,
//     status: 200,
//     statusText: 'OK'
//   },
//   {
//     href: 'https://www.drauta.com/que-es-nodejs-y-para-que-sirve',
//     text: '¿Qué es Node.js y para qué sirve? - drauta.com',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/mdFiles/readmeMdLinks.md',
//     id: 63,
//     status: 200,
//     statusText: 'OK'
//   },
//   {
//     href: 'https://www.youtube.com/watch?v=WgSc1nv_4Gw',
//     text: '¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/mdFiles/readmeMdLinks.md',
//     id: 64,
//     status: 200,
//     statusText: 'OK'
//   },
//   {
//     href: 'https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html',
//     text: '¿Simplemente qué es Node.js? - IBM Developer Works, 2011',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/mdFiles/readmeMdLinks.md',
//     id: 65,
//     status: 200,
//     statusText: 'OK'
//   },
//   {
//     href: 'https://www.genbeta.com/desarrollo/node-js-y-npm',
//     text: 'Node.js y npm',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/mdFiles/readmeMdLinks.md',
//     id: 66,
//     status: 200,
//     statusText: 'OK'
//   },
//   {
//     href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
//     text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/mdFiles/readmeMdLinks.md',
//     id: 67,
//     status: null,
//     statusText: null,
//     error: 'Could not make HTTP request'
//   },
//   {
//     href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
//     text: 'Asíncronía en js',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/mdFiles/readmeMdLinks.md',
//     id: 68,
//     status: 200,
//     statusText: 'OK'
//   },
//   {
//     href: 'https://docs.npmjs.com/getting-started/what-is-npm',
//     text: 'NPM',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/mdFiles/readmeMdLinks.md',
//     id: 69,
//     status: 200,
//     statusText: 'OK'
//   },
//   {
//     href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
//     text: 'Publicar packpage',
//     file: '/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/mdFiles/readmeMdLinks.md',
//     id: 70,
//     status: 200,
//     statusText: 'OK'
//   }
// ]

// console.log(getStatsWithValidate(prueba2));
