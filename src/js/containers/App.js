import React, { Component } from 'react';
import shortid from 'shortid';
import wordfind from '../lib/wordsearch/util';

import '../../css/reset.css';
import '../../css/style.css';
import WordSearch from '../components/WordSearch';
import ConfigAffiche from '../components/ConfigAffiche';

class App extends Component {
  state = {
    words: [],
    color: 'red',
    searchWordColor: 'black',
    bolds: [],
    puzzleItems: []
  }

  componentDidMount() {
    this.drawPuzzle();
  }

  onColorChange(c) {
    let {color} = this.state;
    color = c;
    this.setState({color});
  }

  // WORDSEARCH
  setColor(color) {
    let {searchWordColor} = this.state;
    searchWordColor = color;
    this.setState({searchWordColor});
  }

  giveBoldToItemsWithId(id) {
    let {bolds} = this.state;
    const idArr = id.split('_')
    const i = idArr.indexOf('bold')
    idArr.splice(i, 1);
    const newIdString = idArr.join('_');
    const exists = bolds.find(bold => bold === newIdString);

    if (exists) {
      const index = bolds.indexOf(exists);
      bolds.splice(index, 1);
    } else {
      bolds.push(newIdString);
    }

    this.setState({bolds});
  }

  addWord(id, newWord) {
    let {words} = this.state;
    let exists = false;

    if (words.length) exists = words.find(word => word.id === id);

    if (exists) {
      words.map(word => {
        if (word.id === id) {
          word.id = id;
          word.word = newWord;
        }
        return word;
      });
    } else {
      words.push({word: newWord, id});
    }

    this.drawPuzzle();
    this.setState({words});
  }

  staticUpdatePuzzle() {
    const {bolds, puzzleItems} = this.state;
    puzzleItems.map(item => {
      let giveBold = false;

      bolds.forEach(bold => {
        if (item.ids.find(id => id === bold)) {
          giveBold = true;
        }
      });
      item.bold = giveBold;

      return item;
    })

    this.setState({puzzleItems});
  }

  drawPuzzle() {
    const {words, bolds} = this.state;
    let {puzzleItems} = this.state;

    puzzleItems = [];
    const puzzle = wordfind.newPuzzle(words, {
      height: 12,
      width:12,
      fillBlanks: true
    });

    for (let i = 0, height = puzzle.length; i < height; i++) {
      const row = puzzle[i];

      for (let j = 0, width = row.length; j < width; j++) {
        const id = shortid.generate();
        const ids = this.idsToString(row[j].id);
        let giveBold = false;

        bolds.forEach(bold => {
          if (row[j].id.find(id => id === bold)) giveBold = true;
        })

        puzzleItems.push(
          {
            id: id,
            ids: row[j].id,
            x: j,
            y: i,
            val: row[j].val || '&nbsp;',
            classes: ids,
            bold: giveBold
          }
        )
      }
    }

    this.setState({puzzleItems});
  }

  idsToString(ids) {
    let myId = '';
    ids.forEach(id => myId += id + ' ')

    return myId;
  }

  render() {
    const {words, puzzleItems, bolds, searchWordColor} = this.state;

    return (
      <div className="App">
        <WordSearch
          puzzleItems={puzzleItems}
          bolds={bolds}
          searchWordColor={searchWordColor}
        />

        <ConfigAffiche
          words={words}
          addWord={this.addWord.bind(this)}
          onColorChange={this.onColorChange.bind(this)}
          setColor={this.setColor.bind(this)}
          drawPuzzle={this.drawPuzzle.bind(this)}
          giveBoldToItemsWithId={this.giveBoldToItemsWithId.bind(this)}
          staticUpdatePuzzle={this.staticUpdatePuzzle.bind(this)}
        />
      </div>
    );
  }
}

export default App;
