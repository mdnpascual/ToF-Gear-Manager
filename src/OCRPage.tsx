import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import { createScheduler, createWorker } from 'tesseract.js';

const worker = createWorker({
	logger: m => console.log(m)
});

const ocrWorker = (async () => {
	await worker.load();
	await worker.loadLanguage('eng');
	await worker.initialize('eng');
	const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
	console.log(text);
	await worker.terminate();
})()

export function OCRPage() {
	const divRef = useRef<HTMLDivElement>(null);

	const [count, setImageData] = React.useState(0);

	useEffect(() => {
		const handleDrag = (e: Event) => {
			e.preventDefault()
			e.stopPropagation()
			console.log("handleDrag")
		}
		const handleDragIn =  (e: Event) => {
			e.preventDefault()
			e.stopPropagation()
			console.log("handleDragIn")
		}
		const handleDragOut =  (e: Event) => {
			e.preventDefault()
			e.stopPropagation()
			console.log("handleDragOut")
		}
		const handleDrop =  (e: Event) => {
			e.preventDefault()
			e.stopPropagation()
			console.log("handleDrop")
			console.log(e)
		}
		const handlePaste = (e: ClipboardEvent) => {
			e.preventDefault()
			e.stopPropagation()
			console.log("handlePaste")
			console.log(e)
			var items = e.clipboardData?.items;
  			console.log(JSON.stringify(items)); // will give you the mime types
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
				<p>DROP SCREENSHOT ON IMAGE</p>
			</div>
		</div>

	)
}