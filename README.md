# Problem
This year for the company Christmas party, the party planning committee decided to spice up the Christmas gift exchange by adding some additional parameters to the game. 

Everyone who brought a gift will be joining the circle. In the centre of the circle are 5 cups. Under each cup is a different action that the player must take. After a cup has been chosen the cups are shuffled around. The game proceeds in rounds as each player takes turns choosing a cup from the table and completing the action. When a round comes to an end, if every player has a gift, the gift exchange is over. If any players are missing a gift the game continues. 

One huge miscalculation was made and there is only two action out of the 5 that lets a player get a gift from the table, leading to incredibly long games. 

Write an object oriented solution that will simulate the game and count how many rounds it will take for the game to end. 

## Parameters
Number of players: 23

Action Cups:
- Take one: if the player doesn’t currently have a gift, take one from the table. If the player already has a gift do nothing
- Trade: Exchange gifts with another player. If the player doesn’t have a gift they can grab one from the table and then must trade it with - another player who has a gift.
- Shift Left: All gifts are passed to the person to the left
- Shift Right: All gifts are passed to the person to the right
- Steal: If the current player doesn’t have a gift they may steal a gift from a player who does. If they have a gift, do nothing.

## Bonus

Write a simulator that will run the game 1,000 times and calculate the average amount of rounds it takes for the game to complete.
