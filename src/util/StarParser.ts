import cv from "@techstark/opencv-js"
import star from "../../src/star.png";
const { loadImage } = require('canvas');

export const getStarCount = async (
	file : File,
	canvasRef : React.RefObject<HTMLCanvasElement>,
	starCanvasRef : React.RefObject<HTMLCanvasElement>) => {

		var count = 0;

		// LOAD
		var test = URL.createObjectURL(file);
		var starFile = await loadImage(star);
		var inputFile = await loadImage(test);

		// CV READ
		var inputImg = cv.imread(inputFile);
		var starImg = cv.imread(starFile);

		// GRAYSCALE  INPUT
		var inputGray = new cv.Mat();
		cv.cvtColor(inputImg, inputGray, cv.COLOR_BGR2GRAY);

		// LOOP SCALE
		for (const scale of resolutionScales){
			// GRAYSCALE TEMPLATE
			var starGray = new cv.Mat();
			cv.cvtColor(starImg, starGray, cv.COLOR_BGR2GRAY);
			// TODO: Can we precompute this part?

			// SCALE TEMPLATE
			var starScaled = new cv.Mat(starGray.rows * scale, starGray.cols * scale, 1);
			cv.resize(starGray, starScaled, starScaled.size(), starGray.rows * scale, starGray.cols * scale, cv.INTER_LANCZOS4)

			count = await matchTemplateGetStarCount(inputGray, starScaled, canvasRef, starCanvasRef);
			if(count !== 0){
				console.log("Scaled used: " + scale);
				break;
			}
		}

		// cv.imshow(canvasRef.current!, inputImg);
		URL.revokeObjectURL(test);
		return count;
}

export const matchTemplateGetStarCount = async (
	inputImg : cv.Mat,
    starImg : cv.Mat,
	canvasRef : React.RefObject<HTMLCanvasElement>,
	starCanvasRef : React.RefObject<HTMLCanvasElement>) => {
		// TEMPLATE MATCHING
		var result = new cv.Mat();
		cv.matchTemplate(inputImg, starImg, result, 5);

		let color = new cv.Scalar(0, 0, 0, 255);

		var newDst: any[][] = [];
		var largestXCoords = 0;
		var start = 0;
		var end = result.cols;
		var count = 0;

		for (var y = 0; y < result.rows; y++) {

			newDst[y] = [];
			for (var x = 0; x < result.cols; x++) {

				newDst[y][x] = result.data32F[start];

				if (newDst[y][x] > 0.55 && x > largestXCoords + starImg.cols * 0.4) {

					largestXCoords = x;
					let maxPoint = {
						"x": x,
						"y": y
					}

					console.log("Score: " + newDst[y][x]);
					let point = new cv.Point(x + starImg.cols, y + starImg.rows);
					cv.rectangle(inputImg, maxPoint, point, color, 1, cv.LINE_8, 0);

					count++
				}
				start++;
			}
			start = end;
			end = end + result.cols;
		}

		if(count !== 0){
			console.log("Star Count: " + count);
		}

		cv.imshow(canvasRef.current!, inputImg);
		cv.imshow(starCanvasRef.current!, starImg);

		return count;
}

export const resolutionScales = [
	1.0,
	0.49,
	0.66,
	0.3333,
	0.405
]