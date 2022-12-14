import React, { useEffect, useRef } from 'react';
import { createWorker } from 'tesseract.js';
import { parseOCR }from './util/OCRParser';
import { gradeArmor }from './util/ArmorGrader';
import { getRarityByColor }from './util/RarityImageParser';
import { getStarCount }from './util/StarParser';
import {ArmorEdit} from './components/ArmorEdit';
import { Stat } from './models/Stat';
import { ArmorType } from './models/ArmorType';

export function OCRPage() {
	const parentRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	const [imageFile, setImageData] = React.useState(new File([""], "filename"));
	const [statsArray, setStatsArray] = React.useState([new Stat("", "")]);
	const [starDetected, setStarDetected] = React.useState(0);
	const [armorType, setArmorType] = React.useState(new ArmorType());
	const [armorRarity, setRarity] = React.useState(5);

	const worker = createWorker({
		// logger: m => console.log(m)
	});

	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 0.8,
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};

	useEffect(() => {
		const ocrWorker = (async () => {
			await worker.load();
			await worker.loadLanguage('eng');
			await worker.initialize('eng');
			await worker.setParameters({
				tessedit_char_whitelist: '0123456789+:%.ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
			});
			const { data: { text } } = await worker.recognize(imageFile);
			var { raw, ocrResults, armorType, rarity } = parseOCR(text);

			rarity = rarity === 0 ? await getRarityByColor(imageFile) : rarity;
			var starCount = await getStarCount(imageFile, canvasRef);
			var {data, overallEfficiency} = gradeArmor(ocrResults, rarity, starCount);

			console.log(raw);
			console.log(armorType);
			console.log(rarity);
			console.log(data);
			console.log(overallEfficiency);
			setStarDetected(starCount);
			setStatsArray(ocrResults);
			setArmorType(armorType);
			setRarity(rarity);
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

		const ocrElement = canvasRef.current;
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

			<ArmorEdit
				data={statsArray}
				starDetected={starDetected}
				armorType={armorType}
				armorRarity={armorRarity}
				canvasRef={canvasRef}
				inputRef={inputRef}/>

				<input ref={inputRef} type="file" style={{ display: "none" }}/>

		</div>
	)
}