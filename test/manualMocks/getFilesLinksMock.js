export const getFilesLinksMock = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'test/manualMocks/file.md',
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'test/manualMocks/file.md',
  }
]

export const linkToValidate = {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'test/manualMocks/file.md',
  };

export const linkValidated={
  href: 'https://nodejs.org/',
  text: 'Node.js',
  file: 'test/manualMocks/file.md',
  status: 200,
  statusText: 'OK'
};

export const brokenLink = {
    href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
    file: 'test/manualMocks/mdFilesMock/README.md',
}

export const brokenLinkValidated = {
    href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
    file: 'test/manualMocks/mdFilesMock/README.md',
    status: null,
    statusText: null,
    error: 'Could not make HTTP request'
}