import { allStats }from '../models/StatDatabase';
import { Stat } from '../models/Stat';

export const gradeArmor = (data : Stat[], rarity: number, starCount: number) => {
	var totalEfficiency = 0;
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

	return {
		data: data,
		overallEfficiency: Math.ceil((totalEfficiency / count) * 100) / 100
	};
}