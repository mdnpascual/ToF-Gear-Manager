import { allStats }from '../models/StatDatabase';
import { Stat } from '../models/Stat';

export const gradeArmor = (data : Stat[], rarity: number, starCount: number) => {
	var totalEfficiency = 0;
	var totalStarCount = 0;
	var count = 0;
	data.forEach(element => {
		var entry = allStats.find((stat) => {
			return stat.name === element.name;
		})

		if (entry !== undefined){
			var finalAmount = 0
			var upgradedAmount = 0
			var averageUpgrade = 0

			switch (rarity) {
				case 5:
				case 0:
					// 5 star
					if(Number(element.result) === entry.initVal5){
						element.upgrades = 0;
						element.efficiency = 1.0;
					} else {
						finalAmount = Number(element.result.replace("%", ""));
						upgradedAmount = finalAmount - (entry.initVal5 ?? 0)
						averageUpgrade = ((entry.maxVal5 ?? 0) + (entry.minVal5 ?? 0)) / 2;
						element.upgrades = Math.ceil(upgradedAmount / averageUpgrade);
						totalStarCount += element.upgrades;
						element.efficiency = element.upgrades === 0 ?
							1.0 :
							Math.ceil((upgradedAmount / ((entry.maxVal5 ?? 0) * element.upgrades)) * 10000) / 10000;
					}
					break;

				case 4:
					// 4 star
					if(Number(element.result) === entry.initVal4){
						element.upgrades = 0;
						element.efficiency = 1.0;
					} else {
						finalAmount = Number(element.result.replace("%", ""));
						upgradedAmount = finalAmount - (entry.initVal4 ?? 0)
						averageUpgrade = ((entry.maxVal4 ?? 0) + (entry.minVal4 ?? 0)) / 2;
						element.upgrades = Math.ceil(upgradedAmount / averageUpgrade);
						totalStarCount += element.upgrades;
						element.efficiency = element.upgrades === 0 ?
							1.0 :
							Math.ceil((upgradedAmount / ((entry.maxVal4 ?? 0) * element.upgrades)) * 10000) / 10000;
					}

					break;

				default:
					break;
			}
		}

		totalEfficiency += (element.efficiency ?? 0);
		count++;
	});

	if(totalStarCount < starCount){
		bumpUp(data, starCount - totalStarCount, rarity);
	} else {
		bumpDown(data, totalStarCount - starCount, rarity);
	}

	return {
		data: data,
		overallEfficiency: Math.ceil((totalEfficiency / count) * 100) / 100
	};
}

export const getEfficiency = (data: Stat, rarity: number) => {
	var entry = allStats.find((stat) => {
		return stat.name === data.name;
	})

	var finalAmount = 0;
	var upgradedAmount = 0;
	if (entry !== undefined){
		switch (rarity) {
			case 5:
			case 0:
				// 5 star
				finalAmount = Number(data.result.replace("%", ""));
				upgradedAmount = finalAmount - (entry.initVal5 ?? 0)
				return data.upgrades === 0 ?
					1.0 :
					Math.ceil((upgradedAmount / ((entry.maxVal5 ?? 0) * data.upgrades!)) * 10000) / 10000;
			case 4:
				// 4 star
				finalAmount = Number(data.result.replace("%", ""));
				upgradedAmount = finalAmount - (entry.initVal4 ?? 0)
				return data.upgrades === 0 ?
					1.0 :
					Math.ceil((upgradedAmount / ((entry.maxVal4 ?? 0) * data.upgrades!)) * 10000) / 10000;
			default:
				break;
		}
	}

}

export const bumpDown = (data: Stat[], difference: number,  rarity: number) => {
	console.log("bumping down");
	while(difference !== 0){
		// Get minimum efficiency
		var minVal = Math.min.apply(null, data.map((e) => {
			if(e.upgrades === 1)
				return 9999;
			return e.efficiency ?? 9999
		}))

		// Bump upgrade stars (increase efficiency)
		var minValIndex = data.findIndex(e => e.efficiency === minVal);
		var minStat = data[minValIndex];
		minStat.upgrades = (minStat.upgrades ?? 0) - 1;
		minStat.efficiency = getEfficiency(minStat, rarity);
		difference--;
	}
}

export const bumpUp = (data: Stat[], difference: number,  rarity: number) => {
	console.log("bumping up");
	while(difference !== 0){
		// Get maximum efficiency
		var maxVal = Math.max.apply(null, data.map((e) => e.efficiency ?? -1));

		// Bump upgrade stars (increase efficiency)
		var maxValIndex = data.findIndex(e => e.efficiency === maxVal);
		var maxStat = data[maxValIndex];
		maxStat.upgrades = (maxStat.upgrades ?? 0) + 1;
		maxStat.efficiency = getEfficiency(maxStat, rarity);
		difference--;
	}
}