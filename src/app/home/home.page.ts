import { Component } from '@angular/core';
import { CombinationItem } from 'src/models/combinationItem';
import { Distribution } from 'src/models/distribution';
import { LetterCount } from 'src/models/letterCount';
import { filter, replace, join, map, last, findIndex, orderBy, toArray, head, clone } from 'lodash';
import { Combination } from 'src/models/combination';
import { Move } from 'src/models/move';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  originalText: string = 'ΣΦΨΞΔλΨΔΛΣΦΔλΨξΔϗΞΔΦΨΞϑλΨΛΣΘϑΞϗΦϑλΨΣΞΨλϑΞΨζβΣφΔΨΣΦΨΣΞΨξΛϗΞΞϑΨϖΣΞΨΠΣϖΛΣφΔΞΨΩΨΠΛΣΦϖϗϖϑΨΔΨΞΔΨΘΔφϗΔΨϖΣΨΞϑλΨΓΔΘϗΦϑλΨΣΞΨΔΛΛϗΣΛϑΨαΔΨΣΞΨΔΛΛϗΣΛϑΨαΔΨΣλΨξΔΦϖΣΛΔΨϖΣΨΦϗΣξΞΔΨλβΨΠϑΦΓΡϑΨΔΞΨαϗΣΦμϑΨΞϑΨλΔΞβϖΔΦΨΞΔλΨεΞΔβμΔλΨϖΣΞΨΠΔζϑΦΔΞΨΩΨΔΦϗΘΔΦϖϑΨΞΔΨμΛϑΠΔΨΠΔΛΨΣλϑλΨΓΣΛΛϑλΨΣΞΨΔΛΛϗΣΛϑΨαΔΨΣΞΨΔΛΛϗΣΛϑΨαΔΨΞΔλΨΠΣΦΔλΨΩΨΞΔλΨαΔηβϗμΔλΨλΣΨαΔΦΨΠΔΛΨΞΔΨΘϗλΘΔΨλΣΦϖΔΨΞΔλΨΠΣΦΔλΨλϑΦΨϖΣΨΦϑλϑμΛϑλΨΞΔλΨαΔηβϗμΔλΨλϑΦΨΔζΣΦΔλ';
  originalDistribution: Distribution;
  resultText: string;
  resultDistribution: Distribution;
  combination: Combination;
  selectedDistribution: number;
  private timeoutId: any;

  moves: Array<Move> = [];

  baseDistributions: Array<Distribution> = [
    {
      name: 'QWERTY',
      orderedDistribution: ' qwertyuiopasdfghjklñzxcvbnm'
    },
    {
      name: 'Spanish',
      orderedDistribution: ' eaosnrildtucmpbhqyvgfjzñxkw'
    },
    {
      name: 'English',
      orderedDistribution: ' etaoinsrhdlucmfywgpbvkxqjzñ'
    }
  ];

  constructor() {
    this.getDistribution();
  }

  /**
* Obtiene la distribución del texto codificado, solo se ejecuta al inicio
*/
  getDistribution() {
    const letterCounter: Array<LetterCount> = [];

    for (let i = 0; i < this.originalText.length; i++) {
      const index = findIndex(letterCounter,(l) => {
        return l.char === this.originalText[i];
      });
      if (index !== -1) {
        letterCounter[index].count++;
      } else {
        letterCounter.push({
          char: this.originalText[i],
          count: 1
        });
      }

    }

    this.originalDistribution = {
      name: 'original',
      orderedDistribution: join(map(orderBy(letterCounter, 'count', 'desc'), (lc) =>  lc.char), '')
    };

    this.createCombination();
  }

  /**
* Crea el objeto utilizado para igualar la distribución inicial con la base seleccionada
*/
  createCombination() {
    this.combination  = {
      baseDistributionName: this.selectedDistribution !== undefined ? this.baseDistributions[ this.selectedDistribution ].name : '',
      items: []
    };

    toArray(this.originalDistribution.orderedDistribution).forEach((letter) => {
        const item: CombinationItem = {
          oLetter: letter,
          rLetter: null,
          lock: false
        };
        this.combination.items.push(item);
    });
  }

  /**
* Ejecutado al cambiar la base seleccionada.
* Crea una nueva combinación y asigna los caracteres de la base a cada uno de la distribución codificada.
*/
  onDistributionChanged() {
    this.moves = [];
    this.createCombination();

    toArray(this.baseDistributions[ this.selectedDistribution ].orderedDistribution).forEach((letter, key) => {
      if ( this.combination.items[key] ) {
        this.combination.items[key].rLetter = letter;
      }
    });
    this.formatText();
  }

  /**
* Al cambiar un item "a => b" de la combinación.
* Identifica el caracter modificado y realiza un "switch" donde este estaba ubicado.
* Almacena el movimiento realizado.
*/
  onCombinationItemChanged(index: number) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }

    this.timeoutId = setTimeout(() => {
      if (this.combination.items[ index ].rLetter) {
        const move: Move = {
          changedIndex: index,
          replacedLetter: this.combination.items[ index ].rLetter
        };
        
        move.replacedIndex = this.combination.items.indexOf(head(filter(this.combination.items, (i, k) => {
          return i.rLetter === move.replacedLetter && k != index;
         })));
        
        const currentDistribution = join(map(this.combination.items, 'rLetter'), '');

        move.changedLetter = head(filter(toArray(this.baseDistributions[this.selectedDistribution].orderedDistribution), (l) => {
            return currentDistribution.indexOf(l) === -1;
        }));
    
        this.combination.items[ move.replacedIndex ].rLetter = move.changedLetter;
    
        this.moves.push(move);
        setTimeout(this.formatText.bind(this), 500);
        
      }
    }, 1000);
  }

/**
* Vuelve hacia atrás un movimiento del historial.
*/
  unDoCombinationChange() {
    const move = last(this.moves);
    this.moves.splice(this.moves.indexOf(move), 1);

    this.combination.items[ move.replacedIndex ].rLetter = move.replacedLetter;
    this.combination.items[ move.changedIndex ].rLetter = move.changedLetter;
    this.formatText();
  }

/**
* Tomando el texto codificado como base, utiliza la combinación actual para generar el texto decodificado.
*/
  formatText() {
    this.resultText = '';
    
    const arrayText = clone(toArray(this.originalText));
    arrayText.forEach((textItem) => {
        this.resultText = this.resultText + head(filter(this.combination.items, (item) => item.oLetter == textItem)).rLetter;
    });

    this.resultDistribution = {
      name: 'result',
      orderedDistribution: join(map(this.combination.items, 'rLetter'), '')
    };
  }

}

