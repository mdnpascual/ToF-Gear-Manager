import { FastAverageColor } from 'fast-average-color';
import Color from 'colorjs.io';

export const getRarity = async (file : File)  => {
	var imageBitmap = await  createImageBitmap(file);

	const fac = new FastAverageColor();

	var dominantColor = await fac.getColorAsync(imageBitmap, {
			ignoredColor: [
				// [r,g,b,a,treshold (0-255)]
				[234, 234, 234, 255, 20],
				[214, 214, 214, 255, 20],
				[194, 194, 194, 255, 20],
				[174, 174, 174, 255, 20],
				[154, 154, 154, 255, 20],
				[134, 134, 134, 255, 20],
				[114, 114, 114, 255, 20],
				[94, 94, 94, 255, 20],
				[74, 74, 74, 255, 20],
				[54, 54, 54, 255, 20],
				[34, 34, 34, 255, 20],
				[14, 14, 14, 255, 20],
			],
			algorithm: "dominant"
		});

		return colorDistance(dominantColor.hex);
}

export const colorDistance = (hex: string) => {
	let purple = new Color("#a952d8")
	let gold = new Color("#cd9046");
	let incoming = new Color(hex);

	if(incoming.distance(purple, "lab") < 50){
		return 4;
	} else if (incoming.distance(gold, "lab") < 50){
		return 5;
	} else {
		return 0;
	}
}