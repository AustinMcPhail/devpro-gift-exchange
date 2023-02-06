import { GiftExchange } from "./models/GIftExchange";

play(true);

console.log('Playing 1000 times to get the average rounds per game...')
const roundsPerGame: number[] = [];
for (let i = 0; i < 1000; i+=1) {
  roundsPerGame.push(play(false))
}
const average = roundsPerGame.reduce((p, c) => p + c, 0) / roundsPerGame.length;
console.log('Average rounds per game is: ' + average);

function play(logResults = false) {
  const exchange = new GiftExchange();
  exchange.logResults = logResults;
  let rounds = 0;
  while(!exchange.isDone) {
    exchange.doRound();
    rounds += 1;
  }
  return rounds;
}