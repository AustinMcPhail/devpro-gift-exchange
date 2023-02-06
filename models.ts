import { selectRandom } from "./util";

export enum Actions {
  TAKE_ONE = 'TAKE_ONE',
  TRADE = 'TRADE',
  SHIFT_LEFT = 'SHIFT_LEFT',
  SHIFT_RIGHT = 'SHIFT_RIGHT',
  STEAL = 'STEAL',
}

export class Player {
  id: string;
  gift: string;

  constructor(id: string) {
    this.id = id;
    this.gift = '';
  }

  swapGifts(otherPlayer: Player) {
    const otherPlayersGift = otherPlayer.gift;
    otherPlayer.gift = this.gift;
    this.gift = otherPlayersGift;
  }
}

export class Cup {
  id: string;
  action: Actions;
}

export class GiftExchange {
  players: Player[];
  cups: Cup[];
  gifts: string[];
  isDone = false;
  logResults = true;

  constructor(numberOfPlayers = 23) {
    this.players = Array.from({ length: numberOfPlayers }, (_, i) => new Player(`${i}`));

    this.gifts = this.players.map((_, i) => `gift-${i}`);

    this.cups = [
      {id: 'cup-0', action: Actions.TAKE_ONE},
      {id: 'cup-1', action: Actions.TRADE},
      {id: 'cup-2', action: Actions.SHIFT_LEFT},
      {id: 'cup-3', action: Actions.SHIFT_RIGHT},
      {id: 'cup-4', action: Actions.STEAL},
    ];
  }
  
  doRound(): void {
    for(const player of this.players) {
      this.selectCup(player.id);
      this.shuffleCups();
    }
    if (this.players.filter(p => !p.gift).length === 0) this.isDone = true;
  }

  private shuffleCups(): Cup[] {
    const shuffled = [] as Cup[];
    let copy = this.cups.map(c => ({...c}));
    while (copy.length) {
      let index = Math.floor(Math.random() * copy.length);
      shuffled.push(copy[index]);
      copy = copy.filter((_, i) => i !== index);
    }
    return shuffled;
  }

  private selectCup(playerId: string) {
    const player = this.players.find(p => p.id === playerId);
    if (!player) throw new Error('Invalid playerId: ' + playerId);
    const cup = selectRandom(this.cups);
    switch (cup.action) {
      case Actions.TAKE_ONE: {
        if (!player.gift) {
          player.gift = this.takeRandomGift();
          if (this.logResults)console.log(`P${playerId}-TAKE`, `Got gift ${player.gift}.`);
        } else {
          if (this.logResults)console.log(`P${playerId}-TAKE`, `Already has gift.`);
        }
        break;
      };
      case Actions.TRADE: {
        if (!player.gift) player.gift = this.takeRandomGift();
        const playersWithGifts = this.players.filter(p => p.id !== playerId && p.gift);
        if (!playersWithGifts.length) {
          if (this.logResults)console.log(`P${playerId}-TRADE`, 'There are no other players to trade with.')
          break;
        }
        const playerToTradeWith = selectRandom(playersWithGifts);
        player.swapGifts(playerToTradeWith);
        if (this.logResults)console.log(`P${playerId}-TRADE`, `Traded gifts with P${playerToTradeWith.id}, traded ${playerToTradeWith.gift} for ${player.gift}.`);
        break;
      };
      case Actions.SHIFT_LEFT: {
        const gifts = this.players.map(p => p.gift);
        this.players.forEach((p, i) => {
          if (i === gifts.length - 1) {
            p.gift = gifts[0];
          } else p.gift = gifts[i + 1]
        })
        if (this.logResults)console.log(`P${playerId}-LEFT`, 'All gifts have been passed to the right.')
        break;
      };
      case Actions.SHIFT_RIGHT: {
        const gifts = this.players.map(p => p.gift);
        this.players.forEach((p, i) => {
          if (i === 0) {
            p.gift = gifts[gifts.length - 1];
          } else p.gift = gifts[i - 1]
        })
        if (this.logResults)console.log(`P${playerId}-RIGHT`, 'All gifts have been passed to the left.')
        break;
      };
      case Actions.STEAL: {
        if (player.gift) {
          if (this.logResults)console.log(`P${playerId}-STEAL`, `Already has gift.`);
          break;
        }
        const playersWithGifts = this.players.filter(p => p.id !== playerId && p.gift);
        if (!playersWithGifts.length) {
          if (this.logResults)console.log(`P${playerId}-STEAL`, 'There are no other players to steal from.')
          break
        };
        const victim = selectRandom(playersWithGifts);
        player.swapGifts(victim);
        if (this.logResults)console.log(`P${playerId}-STEAL`, `Stole gift from P${victim.id}, got ${player.gift}.`);
        break;
      };
    }
  }

  private takeRandomGift(): string {
    const gift = selectRandom(this.gifts);
    this.gifts = this.gifts.filter(g => g !== gift);
    return gift;
  }
}