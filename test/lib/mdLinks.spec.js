/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { mdLinks } from '../../lib/mdLinks.js';
import { data, validatedData } from '../manualMocks/mdLinksMocks.js';

describe('Tests for mdLinks()', () => {
  it('should resolves in an array of objects with only the links information when the only argument is the path', () => {
    mdLinks('test/manualMocks/mdFilesMock').then((result) => {
      expect(result).toEqual(data);
    });
  });

  it('should resolves in an array of objects with the links information and the information of the HTTP request when validate true', () => {
    mdLinks('test/manualMocks/mdFilesMock', true).then((result) => {
      expect(result).toEqual(validatedData);
    });
  });

  it('should resolves in an array of objects with only the links information when validate false', (done) => {
    mdLinks('test/manualMocks/mdFilesMock', false).then((result) => {
      expect(result).toEqual(data);
      done();
    });
  });
});
