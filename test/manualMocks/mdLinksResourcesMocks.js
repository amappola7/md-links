export const pathsMock = [
  'test/manualMocks/mdFilesMock/README.md',
  'test/manualMocks/mdFilesMock/cipher.md',
  'test/manualMocks/mdFilesMock/dataLovers/README.md',
  'test/manualMocks/mdFilesMock/file.md'
]

export const singlePath = [
  'test/manualMocks/mdFilesMock/README.md',
]

export const contentFile = `## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional 'README.md').

Estos archivos 'Markdown' normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato 'Markdown', para verificar los links que contengan y reportar
algunas estadísticas.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)`

export const nullContent = 'Contenido sin links';

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

export const getFilesLinksMock = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'test/manualMocks/mdFilesMock/file.md',
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'test/manualMocks/mdFilesMock/file.md',
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