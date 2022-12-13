import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import { createWorker } from 'tesseract.js';
import { parseOCR }from './util/OCRParser';
import { gradeArmor }from './util/ArmorGrader';
import { getRarity }from './util/RarityParser';
import { getStarCount }from './util/StarParser';
import {Results} from './components/Results';
import { Stat } from './models/Stat';
import sample from "./sample.png";

export function OCRPage() {
	const parentRef = useRef<HTMLDivElement>(null);
	const divRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

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
			var starCount = await getStarCount(imageFile, canvasRef);
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
			e.preventDefault();
			e.stopPropagation();
		}
		const handleDragIn =  (e: Event) => {
			e.preventDefault();
			e.stopPropagation();
		}
		const handleDragOut =  (e: Event) => {
			e.preventDefault();
			e.stopPropagation();
		}
		const handleDrop =  (e: DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			var clipboardData = e.dataTransfer;
			setImageData(clipboardData!.files[0]);
		}
		const handlePaste = (e: ClipboardEvent) => {
			e.preventDefault();
			e.stopPropagation();
			console.log(e)
			var clipboardData = e.clipboardData;
			console.log(clipboardData!.files[0]);
			setImageData(clipboardData!.files[0]);
		}
		const handleClick = (e: MouseEvent) => {
			inputRef.current?.click();
		}
		const handleFileUpload = (e: Event) => {
			var files = inputRef.current?.files;
			if (files?.length == 1){
				setImageData(files[0]);
			}
		}

		const ocrElement = divRef.current;
		const inputElement = inputRef.current;
		const parentElement = parentRef.current

		ocrElement?.addEventListener('dragenter', handleDragIn);
		ocrElement?.addEventListener('dragleave', handleDragOut);
		ocrElement?.addEventListener('dragover', handleDrag);
		ocrElement?.addEventListener('drop', handleDrop);
		ocrElement?.addEventListener('click', handleClick);
		parentElement?.addEventListener('paste', handlePaste);
		inputElement?.addEventListener('change', handleFileUpload);

		return () => {
			ocrElement?.removeEventListener('dragenter', handleDragIn)
			ocrElement?.removeEventListener('dragleave', handleDragOut)
			ocrElement?.removeEventListener('dragover', handleDrag)
			ocrElement?.removeEventListener('drop', handleDrop)
			ocrElement?.removeEventListener('click', handleClick)
			parentElement?.removeEventListener('paste', handlePaste)
			inputElement?.removeEventListener('change', handleFileUpload);
		};
	}, [])
	return (
		<div ref={parentRef} className="OCRPage">
			<div>

				<div ref={divRef} className="input-section">
					<input ref={inputRef} type="file" style={{ display: "none" }}/>
					<img src={logo} className="App-logo" alt="logo" />
				</div>

				{statsArray.length == 1 && <div className="instructions">
					<p>CLICK, PASTE (Ctrl+V), OR DRAG SCREENSHOT IN SPINNY THING TO START ANALYZING SCREENSHOT</p>
					<img src={sample} className="sample" alt="sample" />
				</div>}
			</div>

			<div className="results-section">
				<Results data={statsArray} starDetected={starDetected}/>
			</div>

			<div className="debug-section">
				<canvas ref={canvasRef}/>
			</div>

		</div>
	)
}