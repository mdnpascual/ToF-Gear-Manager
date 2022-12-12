import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import { createWorker } from 'tesseract.js';
import { parseOCR }from './util/OCRParser';
import { gradeArmor }from './util/ArmorGrader';
import { getRarity }from './util/RarityParser';
import { getStarCount }from './util/StarParser';
import {Results} from './components/Results';
import { Stat } from './models/Stat';

export function OCRPage() {
	const divRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const starCanvasRef = useRef<HTMLCanvasElement>(null)

	const [imageFile, setImageData] = React.useState(new File([""], "filename"));
	const [statsArray, setstatsArray] = React.useState([new Stat("", "")]);
	const [starDetected, setstarDetected] = React.useState(0);

	const worker = createWorker({
		// logger: m => console.log(m)
	});

	useEffect(() => {
		const ocrWorker = (async () => {
			await worker.load();
			await worker.loadLanguage('eng');
			await worker.initialize('eng');
			await worker.setParameters({
				tessedit_char_whitelist: '0123456789+:%.ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
			});
			const { data: { text } } = await worker.recognize(imageFile);
			var {raw, ocrResults, errors} = parseOCR(text);

			var rarity = await getRarity(imageFile);
			var starCount = await getStarCount(imageFile, canvasRef, starCanvasRef);
			var {data, overallEfficiency} = gradeArmor(ocrResults, rarity, starCount);


			console.log(raw);
			console.log(rarity);
			console.log(data);
			console.log(overallEfficiency);
			setstarDetected(starCount);
			setstatsArray(ocrResults);
			await worker.terminate();
		})()
	}, [imageFile]);

	useEffect(() => {
		const handleDrag = (e: Event) => {
			e.preventDefault()
			e.stopPropagation()
		}
		const handleDragIn =  (e: Event) => {
			e.preventDefault()
			e.stopPropagation()
		}
		const handleDragOut =  (e: Event) => {
			e.preventDefault()
			e.stopPropagation()
		}
		const handleDrop =  (e: DragEvent) => {
			e.preventDefault()
			e.stopPropagation()
			var clipboardData = e.dataTransfer;
			setImageData(clipboardData!.files[0]);
		}
		const handlePaste = (e: ClipboardEvent) => {
			e.preventDefault()
			e.stopPropagation()
			console.log(e)
			var clipboardData = e.clipboardData;
			console.log(clipboardData!.files[0]);
			setImageData(clipboardData!.files[0]);
		}

		const ocrElement = divRef.current;

		ocrElement?.addEventListener('dragenter', handleDragIn)
		ocrElement?.addEventListener('dragleave', handleDragOut)
		ocrElement?.addEventListener('dragover', handleDrag)
		ocrElement?.addEventListener('drop', handleDrop)
		ocrElement?.addEventListener('paste', handlePaste)

		return () => {
			ocrElement?.removeEventListener('dragenter', handleDragIn)
			ocrElement?.removeEventListener('dragleave', handleDragOut)
			ocrElement?.removeEventListener('dragover', handleDrag)
			ocrElement?.removeEventListener('drop', handleDrop)
			ocrElement?.removeEventListener('paste', handlePaste)
		};
	}, [])
	return (
		<div ref={divRef} className="OCRPage">
			<div>
				<img src={logo} className="App-logo" alt="logo" />
				<p>DROP SCREENSHOT ON SPINNY THING</p>
			</div>
			<Results data={statsArray} starDetected={starDetected}/>
			<canvas ref={canvasRef}/>
			<canvas ref={starCanvasRef}/>
		</div>
	)
}