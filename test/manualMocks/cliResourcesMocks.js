export const linksFile = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'test/manualMocks/contentFileMock.js'
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'test/manualMocks/contentFileMock.js'
  }
];

export const statsWithOutValidate = {
  totalLinks: 2,
  uniqueLinks: 2,
}

export const linksValidated = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'test/manualMocks/contentFileMock.js',
    id: 1,
    status: 200,
    statusText: 'OK'
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'test/manualMocks/contentFileMock.js',
    id: 2,
    status: 200,
    statusText: 'OK'
  }
];

export const statsWithValidate = {
  totalLinks: 2,
  uniqueLinks: 2,
  brokenLinks: 0,
}