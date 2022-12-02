import { allStats }from '../models/StatDatabase';
import { Stat } from '../models/Stat';

export const parseOCR = (unclean: string) => {
	var loweredCase = unclean.toLowerCase();
	var results = [];
	var errors = [];

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
				results.push(new Stat(
					element.name!,
					regexResult[0].split("+")[1],
					regexResult))

				// DELETE STAT FOUND
				var indexToDelete = choppedOff.search(regexResult[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
				choppedOff = choppedOff.substring(0, indexToDelete) + choppedOff.substring(indexToDelete + regexResult[0].length);
			count++;
		}
	}

	if(count !== 4){
		errors.push("not enough stats detected");
	}

	return {
		raw: loweredCase,
		ocrResults: results,
		errors: errors
	};

}