export class Stat{
	constructor(
		name: string,
		result: string,
		unclean?: RegExpMatchArray
	){
		this.name = name;
		this.unclean = unclean;
		this.result = result;
	}
	name: string;
	result: string;
	unclean? : RegExpMatchArray;
}