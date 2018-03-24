const letters = 'abcdefghijklmnoprstuvwy';
const allOrientations = ['horizontal','vertical', 'diagonal'];

const orientations = {
  horizontal:     (x,y,i) => { return {x: x+i, y: y  }; },
  vertical:       (x,y,i) => { return {x: x,   y: y+i}; },
  diagonal:       (x,y,i) => { return {x: x+i, y: y+i}; }
};

const checkOrientations = {
  horizontal:     (x,y,h,w,l) => { return w >= x + l; },
  vertical:       (x,y,h,w,l) => { return h >= y + l; },
  diagonal:       (x,y,h,w,l) => { return (w >= x + l) && (h >= y + l); }
};

const skipOrientations = {
  horizontal:     (x,y,l) => { return {x: 0,   y: y+1  }; },
  vertical:       (x,y,l) => { return {x: 0,   y: y+100}; },
  diagonal:       (x,y,l) => { return {x: 0,   y: y+1  }; }
};

const fillPuzzle = (words, options) => {
  let puzzle = [], i, j, len;

  for (i = 0; i < options.height; i++) {
    puzzle.push([]);
    for (j = 0; j < options.width; j++) {
      puzzle[i].push({val: '', id: []});
    }
  }

  for (i = 0, len = words.length; i < len; i++) {
    if (!placeWordInPuzzle(puzzle, options, words[i])) {
      return null;
    }
  }

  return puzzle;
};

const placeWordInPuzzle = (puzzle, options, word) => {
  const locations = findBestLocations(puzzle, options, word.word);

  if (locations.length === 0) {
    return false;
  }

  const overlapingLoc = [];
  const rest = [];
  locations.forEach(loc => {
    if (loc.overlap > 0 && loc.overlap < word.word.length) {
      overlapingLoc.push(loc);
    } else {
      rest.push(loc);
    }
  })
  let sel;

  if (overlapingLoc.length) {
    sel = overlapingLoc[Math.floor(Math.random() * overlapingLoc.length)];
  } else {
    sel = rest[Math.floor(Math.random() * rest.length)];
  }

  placeWord(puzzle, word.word, sel.x, sel.y, orientations[sel.orientation], word.id);

  return true;
};

const findBestLocations = (puzzle, options, word) => {
  let locations = [],
      height = options.height,
      width = options.width,
      wordLength = word.length,
      maxOverlap = 0;

  for (let k = 0, len = options.orientations.length; k < len; k++) {
    let orientation = options.orientations[k],
        check = checkOrientations[orientation],
        next = orientations[orientation],
        skipTo = skipOrientations[orientation],
        x = 0, y = 0;

    while( y < height ) {
      if (check(x, y, height, width, wordLength)) {
        const overlap = calcOverlap(word, puzzle, x, y, next);

        if (overlap >= maxOverlap || (!options.preferOverlap && overlap > -1)) {
          maxOverlap = overlap;
          locations.push({x: x, y: y, orientation: orientation, overlap: overlap});
        }

        x++;
        if (x >= width) {
          x = 0;
          y++;
        }
      } else {
        const nextPossible = skipTo(x,y,wordLength);
        x = nextPossible.x;
        y = nextPossible.y;
      }
    }
  }
  return options.preferOverlap ? pruneLocations(locations, maxOverlap) : locations;
};

const calcOverlap = (word, puzzle, x, y, fnGetSquare) => {
  let overlap = 0;

  for (var i = 0, len = word.length; i < len; i++) {
    const next = fnGetSquare(x, y, i),
          square = puzzle[next.y][next.x].val;

    if (square === word[i]) {
      overlap++;
    } else if (square !== '' ) {
      return -1;
    }
  }
  return overlap;
};

const pruneLocations = (locations, overlap) => {
  const rest = [];
  const pruned = [];

  for(let i = 0, len = locations.length; i < len; i++) {
    if (locations[i].overlap > overlap && locations[i].overlap !== overlap) {
      pruned.push(locations[i]);
    } else {
      rest.push(locations[i]);
    }
  }

  for (var i = 0; i < 5; i++) {
    pruned.push(rest[Math.floor(Math.random() * rest.length)]);
  }

  return pruned;
};

const placeWord = (puzzle, word, x, y, fnGetSquare, id) => {
  for (let i = 0, len = word.length; i < len; i++) {
    const next = fnGetSquare(x, y, i);
    puzzle[next.y][next.x].val = word[i];
    puzzle[next.y][next.x].id.push(id);
  }
};


export default {
  validOrientations: allOrientations,
  orientations: orientations,

  newPuzzle: function(words, settings) {
    let wordList, puzzle, attempts = 0, opts = settings || {};

    wordList = words.slice(0).sort( function (a,b) {
      return (a.word.length < b.word.length) ? 1 : 0;
    });

    const options = {
      height:       opts.height || wordList[0].length,
      width:        opts.width || wordList[0].length,
      orientations: opts.orientations || allOrientations,
      fillBlanks:   opts.fillBlanks !== undefined ? opts.fillBlanks : true,
      maxAttempts:  opts.maxAttempts || 3,
      preferOverlap: opts.preferOverlap !== undefined ? opts.preferOverlap : true
    };

    while (!puzzle) {
      while (!puzzle && attempts++ < options.maxAttempts) {
        puzzle = fillPuzzle(wordList, options);
      }

      if (!puzzle) {
        options.height++;
        options.width++;
        attempts = 0;
      }
    }

    if (options.fillBlanks) {
      this.fillBlanks(puzzle, options);
    }

    return puzzle;
  },

  fillBlanks: function (puzzle) {
    for (let i = 0, height = puzzle.length; i < height; i++) {
      const row = puzzle[i];
      for (let j = 0, width = row.length; j < width; j++) {
        if (!puzzle[i][j].val) {
          const randomLetter = Math.floor(Math.random() * letters.length);
          puzzle[i][j].val = letters[randomLetter];
        }
      }
    }
  },
};
