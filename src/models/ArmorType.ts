import { StatDatabase, basicStats, pctStats, critStat,  allStats } from "./StatDatabase";

export class ArmorType{
	constructor(init?: Partial<ArmorType>){
		Object.assign(this, init);
	}
	type?: string;
	name4?: string;
	name5?: string;
	regex4?: RegExp;
	regex5?: RegExp;
	allowedStats?: StatDatabase[];
}

const bracerJson = {
	type: "Bracer",
	name4: "Elite Armbands",
	name5: "Fortress Bracers",
	regex4: /armban/g,
	regex5: /bracer/g
}

export const bracer = new ArmorType(bracerJson);
bracer.allowedStats = basicStats

const helmJson = {
	type: "Helm",
	name4: "Elite Combat Helmet",
	name5: "Fortress Helm",
	regex4: /at[\s]*helm/g,
	regex5: /ss[\s]*helm/g
}

export const helm = new ArmorType(helmJson);
helm.allowedStats = basicStats

const glovesJson = {
	type: "Gloves",
	name4: "Elite Gloves",
	name5: "Fortress Handguards",
	regex4: /glove/g,
	regex5: /handgu/g
}

export const gloves = new ArmorType(glovesJson);
gloves.allowedStats = [...basicStats, critStat]

const beltJson = {
	type: "Belt",
	name4: "Elite Combat Belt",
	name5: "Fortress Belt",
	regex4: /at[\s]*belt/g,
	regex5: /ss[\s]*belt/g
}

export const belt = new ArmorType(beltJson);
belt.allowedStats = basicStats

const shoulderJson = {
	type: "Shoulder",
	name4: "Elite Shoulderguards",
	name5: "Fortress Spaulders",
	regex4: /shoulder/g,
	regex5: /spauld/g
}

export const shoulder = new ArmorType(shoulderJson);
shoulder.allowedStats = basicStats

const bootsJson = {
	type: "Boots",
	name4: "Elite Combat Boots",
	name5: "Fortress Sabatons",
	regex4: /boot/g,
	regex5: /sabat/g
}

export const boots = new ArmorType(bootsJson);
boots.allowedStats = [...basicStats, critStat]

const pantsJson = {
	type: "Pants",
	name4: "Elite Combat Leggings",
	name5: "Fortress Legguards",
	regex4: /gging/g,
	regex5: /gguard/g
}

export const pants = new ArmorType(pantsJson);
pants.allowedStats = basicStats

const chestJson = {
	type: "Chest",
	name4: "Elite Combat Suit",
	name5: "Fortress Armor",
	regex4: /at[\s]*suit/g,
	regex5: /ss[\s]*arm/g
}

export const chest = new ArmorType(chestJson);
chest.allowedStats = basicStats

const visorJson = {
	type: "Visor",
	name4: "Elite Tactics Eyepiece",
	name5: "Fortress Tactics Eyepiece",
	regex4: /te[\s]*tac/g,
	regex5: /ss[\s]*tac/g
}

export const visor = new ArmorType(visorJson);
visor.allowedStats = allStats

const engineJson = {
	type: "Engine",
	name4: "Elite Combat Engine",
	name5: "Fortress Combat Engine",
	regex4: /te[\s]*com/g,
	regex5: /ss[\s]*com/g
}

export const engine = new ArmorType(engineJson);
engine.allowedStats = [...basicStats, ...pctStats]

export const allArmorTypes = [
	bracer,
	helm,
	gloves,
	belt,
	shoulder,
	boots,
	pants,
	chest,
	visor,
	engine
]