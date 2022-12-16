import { Stat } from '../models/Stat';

export const getAdditionalResult = (stat: Stat) => {
	if (stat.name === "CS"){
		return "";
	}
	return  "(" + stat.upgrades + " Upgrades, Efficiency: " + Math.ceil(stat.efficiency!*10000) / 100 + "%)";
}

export const computeOverallEfficiency = (stats: Stat[], starDetected: number) => {
	if(starDetected === 0){
		return "100%"
	}
	var total = 0;
	var count = 0;
	for (const stat of stats){
		if(stat.upgrades !== 0 && stat.name !== "CS"){
			total += (stat.efficiency ?? 0) * (stat.upgrades ?? 1);
			count+=stat.upgrades ?? 1;
		}
	}
	var avg = (total / count);
	return Math.ceil(avg*10000) / 100 + "%";
}

export const computeEfficiency = (stat: Stat, starDetected: number) => {
	if(starDetected === 0){
		return "100%"
	}
	return Math.ceil(stat.efficiency!*10000) / 100 + "%";
}