import {checkIfPathExists , getAbsolutePath , checkDirOrFile , checkFileExtension , getPathsOfMdFiles , getLinks , getFileLinks , validateLink} from '../../lib/mdLinksResources'
import {pathsMock, singlePath} from '../manualMocks/pathsMock.js'
import { contentFile , linksFile , nullContent} from '../manualMocks/contentFileMock.js'
import {brokenLink, brokenLinkValidated, getFilesLinksMock, linkToValidate, linkValidated} from '../manualMocks/getFilesLinksMock.js'

describe('Tests for checkIfPathExists()', () => {
  it('should return true if path exists', () => {
    expect(checkIfPathExists('test/manualMocks')).toBe(true)
  })

  it('should return false if path does not exists', () => {
    expect(checkIfPathExists('/home//break/path')).toBe(false)
  })
})

describe('Tests for getAbsolutePath()', () => {
  it('should return the same path with an absolute path as input', () => {
    expect(getAbsolutePath('/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/README.md')).toMatch('/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/README.md')
  })

  it('should return an absolute path with a relative path as input', () => {
    expect(getAbsolutePath('test/lib/mdLinksResources.spec.js')).toMatch('/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/test/lib/mdLinksResources.spec.js')
  })
})

describe('Tests for checkDirOrFile()', () => {
  it('should return true if the path goes to a directory', () => {
    expect(checkDirOrFile('test/manualMocks')).toBe(true)
  })

  it('should return false if the path goes to a file', () => {
    expect(checkDirOrFile('test/manualMocks/contentFileMock.js')).toBe(false)
  })
})

describe('Tests for checkFileExtension()', () => {
  it('should return true if the path goes to a .md file', () => {
    expect(checkFileExtension('test/manualMocks/mdFilesMock/cipher.md')).toBe(true)
  })

  it('should return false if the path goes to a file with any extension except .md', () => {
    expect(checkFileExtension('test/manualMocks/dataMock.js')).toBe(false)
  })
})

describe('Tests for getPathsOfMdFiles()', () => {
  it('should return an array of paths', () => {
    expect(getPathsOfMdFiles('test/manualMocks/mdFilesMock')).toEqual(pathsMock)
  })

  it('should return an array with one path if the path goes to a single file', () => {
    expect(getPathsOfMdFiles('test/manualMocks/mdFilesMock/README.md')).toEqual(singlePath)
  })

  it('should return an error message when the path does not go to a directory or .md file', () => {
    expect(getPathsOfMdFiles('test/manualMocks/contentFileMock.js')).toMatch('Path is not a directory or .md file');
  })
})

describe('Tests for getLinks()', () => {
  it('should return an array of objects with links in it', () => {
    expect(getLinks(contentFile, 'test/manualMocks/contentFileMock.js')).toEqual(linksFile);
  })

  it('should return an empty array when the content file does not contain links', () => {
    expect(getLinks(nullContent, 'test/broken/path')).toEqual([])
  })
})

describe('Tests for getFileLinks()', () => {
  it('should return a promise that resolves into an array of links', () => {
    return getFileLinks('test/manualMocks/file.md').then(result => {
      expect(result).toEqual(getFilesLinksMock);
    });
  })
})

describe('Tests for validateLinks()', () => {
  it('should return an object with the information of the response of the HTTP request', () => {
    return validateLink(linkToValidate).then(result => {
      expect(result).toEqual(linkValidated);
    });
  })

  it('should return an object with the information of the response of the HTTP request and an error when the link is broken', () => {
    return validateLink(brokenLink).then(result => {
      expect(result).toEqual(brokenLinkValidated);
    });
  })
})