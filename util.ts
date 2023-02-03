export function selectRandom<ListType>(list: ListType[]) {
return list[Math.floor(Math.random() * list.length)];
}