import { allStats }from '../models/StatDatabase';
import { allArmorTypes, ArmorType }from '../models/ArmorType';
import { Stat } from '../models/Stat';

export const parseOCR = (unclean: string) => {
	var loweredCase = unclean.toLowerCase();
	var results = [];
	var errors = [];
	var armorType: ArmorType = new ArmorType();
	var rarity = 0;

	// Find CS
	var finderCS = /cs:[0-9]+/g;
	results.push(new Stat("CS", loweredCase.match(finderCS)![0].split(":")[1]));

	// Chop off until "Random Stats" is found
	var finderRandomStats = /random[\s]*stats/g;
	var startingIndex = loweredCase.search(finderRandomStats);
	var choppedOff = startingIndex > -1 ? loweredCase.substring(startingIndex) : loweredCase;

	var count = 0;
	for(const element of allStats){
		if (count > 3){
			break;
		}
		var regexResult = choppedOff.match(element.regex!);
		if(regexResult != null){
			var result = regexResult[0].split("+")[1];
			result = element.noDot ? result.replace(".", "") : result;
				results.push(new Stat(
					element.name!,
					result,
					regexResult))

				// DELETE STAT FOUND
				var indexToDelete = choppedOff.search(regexResult[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
				choppedOff = choppedOff.substring(0, indexToDelete) + choppedOff.substring(indexToDelete + regexResult[0].length);
			count++;
		}
	}

	for(const type of allArmorTypes){
		var regex5Result = loweredCase.match(type.regex5!);
		if(regex5Result != null){
			armorType = type;
			rarity = 5;
			console.log("SSR " + armorType.type + " Detected")
		} else {
			var regex4Result = loweredCase.match(type.regex4!);
			if(regex4Result != null){
				armorType = type;
				rarity = 4;
				console.log("SR " + armorType.type + " Detected")
			}
		}
	}

	if(count !== 4){
		errors.push("not enough stats detected");
	}

	return {
		raw: loweredCase,
		ocrResults: results,
		armorType: armorType,
		rarity: rarity,
		errors: errors
	};

}