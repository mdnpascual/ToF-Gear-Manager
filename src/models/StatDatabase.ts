export class StatDatabase{
	constructor(init?: Partial<StatDatabase>){
		Object.assign(this, init);
	}
	name?: string;
	regex? : RegExp;
	noDot?: boolean;
	initVal5?: number;
	minVal5?: number;
	maxVal5?: number;
	initVal4?: number;
	minVal4?: number;
	maxVal4?: number;
}

const physDmgBoostJson = {
	name: "Physical Damage Boost",
	regex: /physical[\s]*damage[\s]*boost\+[0-9.]+%/g,
	initVal5: 0.65,
	minVal5: 0.72,
	maxVal5: 0.72,
	initVal4: 0.28,
	minVal4: 0.31,
	maxVal4: 0.31
}

export const physDmgBoost = new StatDatabase(physDmgBoostJson);

const frostDmgBoostJson = {
	name: "Frost Damage Boost",
	regex: /frost[\s]*damage[\s]*boost\+[0-9.]+%/g,
	initVal5: 0.65,
	minVal5: 0.72,
	maxVal5: 0.72,
	initVal4: 0.28,
	minVal4: 0.31,
	maxVal4: 0.31
}

export const frostDmgBoost = new StatDatabase(frostDmgBoostJson);

const flameDmgBoostJson = {
	name: "Flame Damage Boost",
	regex: /flame[\s]*damage[\s]*boost\+[0-9.]+%/g,
	initVal5: 0.65,
	minVal5: 0.72,
	maxVal5: 0.72,
	initVal4: 0.28,
	minVal4: 0.31,
	maxVal4: 0.31
}

export const flameDmgBoost = new StatDatabase(flameDmgBoostJson);

const voltDmgBoostJson = {
	name: "Volt Damage Boost",
	regex: /volt[\s]*damage[\s]*boost\+[0-9.]+%/g,
	initVal5: 0.65,
	minVal5: 0.72,
	maxVal5: 0.72,
	initVal4: 0.28,
	minVal4: 0.31,
	maxVal4: 0.31
}

export const voltDmgBoost = new StatDatabase(voltDmgBoostJson);

const physAtkPctJson = {
	name: "Physical Attack Percentage",
	regex: /physical[\s]*attack\+[0-9.]+%/g,
	initVal5: 1.26,
	minVal5: 1.44,
	maxVal5: 1.44,
	initVal4: 0.54,
	minVal4: 0.61,
	maxVal4: 0.61
}

export const physAtkStatPct = new StatDatabase(physAtkPctJson);

const frostAtkPctJson = {
	name: "Frost Attack Percentage",
	regex: /frost[\s]*attack\+[0-9.]+%/g,
	initVal5: 1.26,
	minVal5: 1.44,
	maxVal5: 1.44,
	initVal4: 0.54,
	minVal4: 0.61,
	maxVal4: 0.61
}

export const frostAtkStatPct = new StatDatabase(frostAtkPctJson);

const flameAtkPctJson = {
	name: "Flame Attack Percentage",
	regex: /flame[\s]*attack\+[0-9.]+%/g,
	initVal5: 1.26,
	minVal5: 1.44,
	maxVal5: 1.44,
	initVal4: 0.54,
	minVal4: 0.61,
	maxVal4: 0.61
}

export const flameAtkStatPct = new StatDatabase(flameAtkPctJson);

const voltAtkPctJson = {
	name: "Volt Attack Percentage",
	regex: /volt[\s]*attack\+[0-9.]+%/g,
	initVal5: 1.26,
	minVal5: 1.44,
	maxVal5: 1.44,
	initVal4: 0.54,
	minVal4: 0.61,
	maxVal4: 0.61
}

export const voltAtkStatPct = new StatDatabase(voltAtkPctJson);

const physResPctJson = {
	name: "Physical Resistance Percentage",
	regex: /physical[\s]*resistance\+[0-9.]+%/g,
	initVal5: 7.87,
	minVal5: 9.00,
	maxVal5: 9.00,
	initVal4: 3.35,
	minVal4: 3.83,
	maxVal4: 3.83
}

export const physResStatPct = new StatDatabase(physResPctJson);

const frostResPctJson = {
	name: "Frost Resistance Percentage",
	regex: /frost[\s]*resistance\+[0-9.]+%/g,
	initVal5: 7.87,
	minVal5: 9.00,
	maxVal5: 9.00,
	initVal4: 3.35,
	minVal4: 3.83,
	maxVal4: 3.83
}

export const frostResStatPct = new StatDatabase(frostResPctJson);

const flameResPctJson = {
	name: "Flame Resistance Percentage",
	regex: /flame[\s]*resistance\+[0-9.]+%/g,
	initVal5: 7.87,
	minVal5: 9.00,
	maxVal5: 9.00,
	initVal4: 3.35,
	minVal4: 3.83,
	maxVal4: 3.83
}

export const flameResStatPct = new StatDatabase(flameResPctJson);

const voltResPctJson = {
	name: "Volt Resistance Percentage",
	regex: /volt[\s]*resistance\+[0-9.]+%/g,
	initVal5: 7.87,
	minVal5: 9.00,
	maxVal5: 9.00,
	initVal4: 3.35,
	minVal4: 3.83,
	maxVal4: 3.83
}

export const voltResStatPct = new StatDatabase(voltResPctJson);

const hpPctJson = {
	name: "HP Percentage",
	regex: /hp\+[0-9.]+%/g,
	initVal5: 0.94,
	minVal5: 1.08,
	maxVal5: 1.08,
	initVal4: 0.40,
	minVal4: 0.46,
	maxVal4: 0.46
}

export const hpStatPct = new StatDatabase(hpPctJson);

const critPctJson = {
	name: "Crit Percentage",
	regex: /crit\+[0-9.]+%/g,
	initVal5: 1.05,
	minVal5: 1.19,
	maxVal5: 1.19,
	initVal4: 0.45,
	minVal4: 0.50,
	maxVal4: 0.50
}

export const critStatPct = new StatDatabase(critPctJson);

const atkJson = {
	name: "Attack",
	regex: /attack\+[0-9.]+/g,
	noDot: true,
	initVal5: 52,
	minVal5: 93,
	maxVal5: 234,
	initVal4: 29,
	minVal4: 40,
	maxVal4: 100
}

export const atkStat = new StatDatabase(atkJson);

const physAtkJson = {
	name: "Physical Attack",
	regex: /physical[\s]*attack\+[0-9.]+/g,
	noDot: true,
	initVal5: 69,
	minVal5: 125,
	maxVal5: 312,
	initVal4: 39,
	minVal4: 53,
	maxVal4: 133
}

export const physAtkStat = new StatDatabase(physAtkJson);

const frostAtkJson = {
	name: "Frost Attack",
	regex: /frost[\s]*attack\+[0-9.]+/g,
	noDot: true,
	initVal5: 69,
	minVal5: 125,
	maxVal5: 312,
	initVal4: 39,
	minVal4: 53,
	maxVal4: 133
}

export const frostAtkStat = new StatDatabase(frostAtkJson);

const flameAtkJson = {
	name: "Flame Attack",
	regex: /flame[\s]*attack\+[0-9.]+/g,
	noDot: true,
	initVal5: 69,
	minVal5: 125,
	maxVal5: 312,
	initVal4: 39,
	minVal4: 53,
	maxVal4: 133
}

export const flameAtkStat = new StatDatabase(flameAtkJson);

const voltAtkJson = {
	name: "Volt Attack",
	regex: /volt[\s]*attack\+[0-9.]+/g,
	noDot: true,
	initVal5: 69,
	minVal5: 125,
	maxVal5: 312,
	initVal4: 39,
	minVal4: 53,
	maxVal4: 133
}

export const voltAtkStat = new StatDatabase(voltAtkJson);

const resJson = {
	name: "Resistance",
	regex: /resistance\+[0-9.]+/g,
	noDot: true,
	initVal5: 64,
	minVal5: 117,
	maxVal5: 292,
	initVal4: 37,
	minVal4: 50,
	maxVal4: 124
}

export const resStat = new StatDatabase(resJson);

const physResJson = {
	name: "Physical Resistance",
	regex: /physical[\s]*resistance\+[0-9.]+/g,
	noDot: true,
	initVal5: 215,
	minVal5: 390,
	maxVal5: 974,
	initVal4: 122,
	minVal4: 166,
	maxVal4: 415
}

export const physResStat = new StatDatabase(physResJson);

const frostResJson = {
	name: "Frost Resistance",
	regex: /frost[\s]*resistance\+[0-9.]+/g,
	noDot: true,
	initVal5: 215,
	minVal5: 390,
	maxVal5: 974,
	initVal4: 122,
	minVal4: 166,
	maxVal4: 415
}

export const frostResStat = new StatDatabase(frostResJson);

const flameResJson = {
	name: "Flame Resistance",
	regex: /flame[\s]*resistance\+[0-9.]+/g,
	noDot: true,
	initVal5: 215,
	minVal5: 390,
	maxVal5: 974,
	initVal4: 122,
	minVal4: 166,
	maxVal4: 415
}

export const flameResStat = new StatDatabase(flameResJson);

const voltResJson = {
	name: "Volt Resistance",
	regex: /volt[\s]*resistance\+[0-9.]+/g,
	noDot: true,
	initVal5: 215,
	minVal5: 390,
	maxVal5: 974,
	initVal4: 122,
	minVal4: 166,
	maxVal4: 415
}

export const voltResStat = new StatDatabase(voltResJson);

const hpJson = {
	name: "HP",
	regex: /hp\+[0-9.]+/g,
	noDot: true,
	initVal5: 4125,
	minVal5: 7480,
	maxVal5: 18700,
	initVal4: 2343,
	minVal4: 3186,
	maxVal4: 7966
}

export const hpStat = new StatDatabase(hpJson);

const critJson = {
	name: "Crit",
	regex: /crit\+[0-9.]+/g,
	noDot: true,
	initVal5: 258,
	minVal5: 468,
	maxVal5: 1169,
	initVal4: 146,
	minVal4: 199,
	maxVal4: 498
}

export const critStat = new StatDatabase(critJson);

export const allStats = [
	physDmgBoost,
	frostDmgBoost,
	flameDmgBoost,
	voltDmgBoost,
	physAtkStatPct,
	frostAtkStatPct,
	flameAtkStatPct,
	voltAtkStatPct,
	physResStatPct,
	frostResStatPct,
	flameResStatPct,
	voltResStatPct,
	hpStatPct,
	critStatPct,
	physAtkStat,
	frostAtkStat,
	flameAtkStat,
	voltAtkStat,
	physResStat,
	frostResStat,
	flameResStat,
	voltResStat,
	hpStat,
	critStat,
	atkStat,
	resStat,
]

export const basicStats = [
	frostAtkStat,
	flameAtkStat,
	voltAtkStat,
	physResStat,
	frostResStat,
	flameResStat,
	voltResStat,
	hpStat,
	atkStat,
	resStat
]

export const pctStats = [
	physDmgBoost,
	frostDmgBoost,
	flameDmgBoost,
	voltDmgBoost,
	physAtkStatPct,
	frostAtkStatPct,
	flameAtkStatPct,
	voltAtkStatPct,
	physResStatPct,
	frostResStatPct,
	flameResStatPct,
	voltResStatPct,
	hpStatPct
]