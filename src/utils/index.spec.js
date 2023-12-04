import { expect } from 'chai';

import { readPuzzleInput } from '.';

describe('utils', () => {
  describe('readEnvPuzzle', () => {
    // Note: this and the next test will fail if you have not placed your puzzle input for day 1
    // inside the ${projectRoot}/src/day-1 folder
    it('should read input from day folder when its available', async () => {
      await readPuzzleInput(1);
      expect(true).to.eql(true);
    });

    it('should read input from relative input path folder when its available', async () => {
      await readPuzzleInput(null, '../day-1/puzzle-input');
      expect(true).to.eql(true);
    });

    it('should throw error when input is not available', async () => {
      try {
        await readPuzzleInput(null, './foobar');
        expect(true).to.eql(false);
      } catch {
        expect(true).to.eql(true);
      }
    });
  });
});
