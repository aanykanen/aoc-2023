const COLORS = ['red', 'green', 'blue'];

function parseCubes(handfulOfCubes) {
  const result = COLORS.reduce((p, n) => ({ ...p, [n]: 0 }), {});

  COLORS.forEach((color) => {
    const colorRegex = new RegExp(`(?<amount>[0-9]+) ${color}`);
    const numberOfColorCubes = handfulOfCubes.match(colorRegex);

    if (numberOfColorCubes === null) {
      return;
    }

    result[color] = Number(numberOfColorCubes.groups.amount);
  });

  return result;
}

export function solvePuzzle1(puzzleInput) {
  const minCubes = { red: 12, green: 13, blue: 14 };

  return puzzleInput.split('\n').reduce((p, n) => {
    const gameId = Number(n.match(/^Game (?<gameId>\d+): /).groups.gameId);
    const gameInput = n.replace(/^Game \d+: /, '');

    const handfulsOfCubes = gameInput.split(';').map((v) => v.trim());
    const parsedHandfulOfCubes = handfulsOfCubes.map(parseCubes);

    return gameMeetsCubeRequirements(parsedHandfulOfCubes) ? p + gameId : p;
  }, 0);

  function gameMeetsCubeRequirements(game) {
    return game.every((handful) => COLORS.every((color) => handful[color] <= minCubes[color]));
  }
}

export function solvePuzzle2(puzzleInput) {
  return puzzleInput.split('\n').reduce((p, n) => {
    const gameInput = n.replace(/^Game \d+: /, '');

    const handfulsOfCubes = gameInput.split(';').map((v) => v.trim());
    const parsedHandfulOfCubes = handfulsOfCubes.map(parseCubes);
    const gamePower = getGamePower(parsedHandfulOfCubes);

    return p + gamePower;
  }, 0);

  function getGamePower(game) {
    const minCubes = game.reduce(
      (p, n) => {
        COLORS.forEach((color) => {
          if (p[color] === null || p[color] < n[color]) {
            p[color] = n[color];
          }
        });
        return p;
      },
      { red: null, green: null, blue: null },
    );

    return Object.keys(minCubes)
      .map((k) => minCubes[k])
      .reduce((p, n) => n * p, 1);
  }
}
