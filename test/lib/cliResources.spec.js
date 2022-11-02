/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { getStatsWithoutValidate, getStatsWithValidate, evaluateArguments } from '../../lib/cliResources.js';
import {
  linksFile, statsWithOutValidate, linksValidated, statsWithValidate,
} from '../manualMocks/cliResourcesMocks.js';

describe('Test for getStatsWithoutValidate()', () => {
  it('should return the stats of total links and unique links', () => {
    expect(getStatsWithoutValidate(linksFile)).toEqual(statsWithOutValidate);
  });
});

describe('Test for getStatsWithValidate()', () => {
  it('should return the stats of total links and unique links', () => {
    expect(getStatsWithValidate(linksValidated)).toEqual(statsWithValidate);
  });
});

describe('Test for evaluateArguments()', () => {
  it('should return an error message when there are not sufficient arguments', () => {
    expect(evaluateArguments(['argument1', 'argument2'])).toMatch('Path does not exists');
  });

  it('should return an object with the path, validate false and stats false when user only inputs path as argument', () => {
    expect(evaluateArguments(['argument1', 'argument2', 'test/manualMocks/pathsMock.js'])).toEqual({ path: 'test/manualMocks/pathsMock.js', validate: false, stats: false });
  });

  it('should return an object with the path, validate true and stats false when user inputs path and --validate as arguments', () => {
    expect(evaluateArguments(['argument1', 'argument2', 'test/manualMocks/pathsMock.js', '--validate'])).toEqual({ path: 'test/manualMocks/pathsMock.js', validate: true, stats: false });
  });

  it('should return an object with the path, validate false and stats true when user inputs path and --stats as arguments', () => {
    expect(evaluateArguments(['argument1', 'argument2', 'test/manualMocks/pathsMock.js', '--stats'])).toEqual({ path: 'test/manualMocks/pathsMock.js', validate: false, stats: true });
  });

  it('should return an error message when user inputs invalid arguments', () => {
    expect(evaluateArguments(['argument1', 'argument2', 'test/manualMocks/pathsMock.js', 'argument4'])).toMatch('Command \'argument4\' not found. Try with:\n--validate\n--stats\n--validate --stats');
  });

  it('should return an object with the path, validate true and stats true when user inputs path, --validate and --stats as arguments', () => {
    expect(evaluateArguments(['argument1', 'argument2', 'test/manualMocks/pathsMock.js', '--validate', '--stats'])).toEqual({ path: 'test/manualMocks/pathsMock.js', validate: true, stats: true });
  });

  it('should return an error message when user inputs arguments in the wrong order', () => {
    expect(evaluateArguments(['argument1', 'argument2', 'test/manualMocks/pathsMock.js', '--stats', '--validate'])).toMatch('Invalid command. Try with:\n--validate --stats');
  });

  it('should return an error message when user inputs invalid arguments', () => {
    expect(evaluateArguments(['argument1', 'argument2', 'test/manualMocks/pathsMock.js', 'argument4', 'argument5'])).toMatch('Command \'argument4 argument5\' not found. Try with:\n--validate --stats');
  });
});
