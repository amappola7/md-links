import {jest} from '@jest/globals';
import {checkIfPathExists , getAbsolutePath , checkDirOrFile , checkFileExtension , getPathsOfMdFiles , getLinks , validateLink} from '../../lib/mdLinksResources'
import {dataMock} from '../dataMock.js'
import {pathsMock} from '../pathsMock.js'

describe('Tests for checkIfPathExists()', () => {
  it('should return true if path exists', () => {
    expect(checkIfPathExists('/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/lib/cli.js')).toBe(true)
  })

  it('should return false if path does not exists', () => {
    expect(checkIfPathExists('/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/break/path')).toBe(false)
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
    expect(checkDirOrFile('/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/test')).toBe(true)
  })

  it('should return false if the path goes to a file', () => {
    expect(checkDirOrFile('/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/README.md')).toBe(false)
  })
})

describe('Tests for checkFileExtension()', () => {
  it('should return true if the path goes to a .md file', () => {
    expect(checkFileExtension('/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/README.md')).toBe(true)
  })

  it('should return false if the path goes to a file with any extension except .md', () => {
    expect(checkFileExtension('/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/lib/mdLinks.js')).toBe(false)
  })
})

describe('Tests for getPathsOfMdFiles()', () => {
  it('should return an array of paths', () => {
    expect(getPathsOfMdFiles('/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/test/mdFilesMock')).toEqual(pathsMock)
  })

  it('should return an error message when the path does not go to a directory or .md file', () => {
    expect(getPathsOfMdFiles('/home/amappola/programming_CS/3webDevelopment/3laboratoria/1proyectosBootcamp/4.4markdownLinks/md-links/test/pathsMock.js')).toMatch('Path is not a directory or .md file');
  })
})