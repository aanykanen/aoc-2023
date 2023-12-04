function parseCardPoints(card) {
  const cardId = Number(card.match(/^Card\s+(?<cardId>\d+): /).groups.cardId);
  const cardInput = card.replace(/^Card\s+\d+: /, '');
  const [winningNumbers, cardNumbers] = cardInput.split('|').map(parseCardInfo);
  const { points, cardsWon } = getWinnings(cardId, cardNumbers, winningNumbers);

  return { cardId, points, cardsWon };

  function getWinnings(cardId, cardNumbers, winningNumbers) {
    const correctNumbers = winningNumbers.filter((winningNumber) => cardNumbers.includes(winningNumber));
    const points = correctNumbers.length === 0 ? 0 : 2 ** (correctNumbers.length - 1);
    const cardsWon = Array.from({ length: correctNumbers.length }, (_, i) => i + 1 + cardId);
    return { points, cardsWon };
  }

  function parseCardInfo(cardInput) {
    return Array.from(cardInput.matchAll(/\d+/g)).map((v) => Number(v));
  }
}

export function solvePuzzle1(puzzleInput) {
  const cards = puzzleInput.split('\n').filter((r) => r !== '');
  return cards.map(parseCardPoints).reduce((p, n) => (n.points += p), 0);
}

export function solvePuzzle2(puzzleInput) {
  const origCards = puzzleInput
    .split('\n')
    .filter((r) => r !== '')
    .map(parseCardPoints);
  // Note: reversing the order because acquired cards can only have greater ID than
  // the card it was acquired from
  const cardsAdded = origCards.reverse().reduce((p, n) => {
    const { cardId, cardsWon } = n;
    return [...p, { cardId, cardsAdded: calculateCards(cardsWon, p) }];
  }, []);

  return cardsAdded.reduce((p, n) => p + n.cardsAdded, 0);

  function calculateCards(cardsWon, cardDict) {
    if (cardsWon.length === 0) {
      return 1;
    }

    return cardsWon.reduce((p, n) => p + cardDict.find((card) => card.cardId === n).cardsAdded, 0) + 1;
  }

  // My first attempt considered recursion, but this will run out of heap memory
  /*
  const origCards = puzzleInput.split('\n').map(parseCardPoints);
  const origWinnings = origCards.map((c) => c.cardsWon).flat();
  return recurseWinnings(origWinnings, origCards.length + origWinnings.length);

  function recurseWinnings(cards, points) {
    if (cards.length === 0) {
      return points;
    }

    const [currentCardId, ...rest] = cards;
    const { cardsWon } = origCards.find((card) => card.cardId === currentCardId);
    return recurseWinnings([...rest, ...cardsWon], points + cardsWon.length);
  }
  */
}
