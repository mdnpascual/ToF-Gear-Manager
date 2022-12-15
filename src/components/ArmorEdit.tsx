import React, { useEffect, useState } from 'react';
import cv from "@techstark/opencv-js"
import { ArmorType, allArmorTypes } from "../models/ArmorType";
import { Stat } from "../models/Stat";
import { Box, Grid, Button, SelectChangeEvent, FilledInput, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import SaveIcon from '@mui/icons-material/Save';
import sample from "../sample.png";
import dragdrop from "../dragdrop.png";
import { allStats } from '../models/StatDatabase';
import { ArmorEditSelect } from './ArmorEditSelect';
import { InstructionModal } from './InstructionModal';

const { loadImage } = require('canvas');

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

export function ArmorEdit ( {data, starDetected, armorType, armorRarity, canvasRef, inputRef} : {
	data: Stat[],
	starDetected: number,
	armorType: ArmorType,
	armorRarity: number,
	canvasRef: React.RefObject<HTMLCanvasElement>,
	inputRef: React.RefObject<HTMLInputElement>
} ){

	const [armorTypeInput, setArmorType] = useState("None");
	const [armorRarityInput, setArmorRarity] = useState("None");

	const [substat1Input, setSubstat1] = useState("None");
	const [substat2Input, setSubstat2] = useState("None");

	const [openTut, setOpenTut] = useState(false);

	const handleOpenTut = () => setOpenTut(true);
	const handleCloseTut = () => setOpenTut(false);

	const handleArmorTypeChange = (event: SelectChangeEvent) => {
		setArmorType(event.target.value as string);
	};
	const handleArmorRarityChange = (event: SelectChangeEvent) => {
		setArmorRarity(event.target.value as string);
	};

	const handleSubStat1Change = (event: SelectChangeEvent) => {
		setSubstat1(event.target.value as string);
	};
	const handleSubStat2Change = (event: SelectChangeEvent) => {
		setSubstat2(event.target.value as string);
	};

	const getArmorType = (type: string) => {
		if (type !== "None"){
			var armorType = allArmorTypes.find((typeArmor) => typeArmor.type === type);
			return armorType ? armorType.allowedStats! : allStats;
		} else {
			return allStats;
		}
	}

	useEffect(() => {
		if(canvasRef.current && data.length === 1){
			const fillCanvas = async () => {
				var dragDropImage = await loadImage(dragdrop);
				if (cv.getBuildInformation!){
					cv.imshow(canvasRef.current!, cv.imread(dragDropImage));
				} else {
					cv['onRuntimeInitialized']=()=>{
						cv.imshow(canvasRef.current!, cv.imread(dragDropImage));
					}
				}

			}
			fillCanvas();
		}

		if(data.length > 1){
			setSubstat1(data[1].name);
			setSubstat2(data[2].name);
		}

		if(armorRarity != null){
			if(armorRarity === 5){
				setArmorRarity("SSR")
			}
			if(armorRarity === 4){
				setArmorRarity("SR")
			}
		}

		if(armorType.type){
			setArmorType(armorType.type);
		}
	}, [canvasRef, data, armorType])

	return (
		<Box sx={style}>
			<InstructionModal
				open={openTut}
				onClose={handleCloseTut}
				imgSrc={sample} />
			{/* START GRID */}
			<Grid container spacing={2} >
				{/* LEFT SIDE: CANVAS, UPLOAD AND TUTORIAL BUTTON */}
				<Grid xs={4}>
					<Box sx={{border: '2px solid #000'}}>
						<canvas ref={canvasRef} width="100%"/>
					</Box>
					<Grid container spacing={2} sx={{paddingTop: 4}}>
						<Grid xs={10}>
							<Button
								onClick={() => {inputRef.current?.click();}}
								variant="contained"
								endIcon={<ImageIcon />}>
								Upload Image
							</Button>
						</Grid>
						<Grid xs={2}>
							<Button
								onClick={handleOpenTut}
								variant="contained"
								sx={{p: 1}}>
									{"?"}
							</Button>
						</Grid>
					</Grid>
				</Grid>
				{/* RIGHT SIDE: ALL INPUTS AND SAVE BUTTON */}
				<Grid xs={8} sx={{p: 2, paddingRight: 0}}>
					{/* ROW 1 */}
					<Grid container spacing={2} sx={{p: 2, paddingRight: 0}}>
						<Grid xs={4} sx={{p: 2}}>
							<ArmorEditSelect
								id="armor-type"
								label="Armor Type"
								value={armorTypeInput === "None" ? armorType.type ?? "None" : armorTypeInput}
								onChange={handleArmorTypeChange}
								options={allArmorTypes}
								propertyToDisplay="type"
							/>
						</Grid>
						<Grid xs container spacing={0} sx={{p: 0}}>
							<Grid xs={8} sx={{p: 2, paddingRight: 0}}>
								<ArmorEditSelect
									id="substat-1"
									label="Substat 1"
									value={substat1Input}
									onChange={handleSubStat1Change}
									options={getArmorType(armorTypeInput)}
									propertyToDisplay="name"
									disabled={armorTypeInput === "None"}
								/>
							</Grid>
							<Grid xs={4} sx={{p: 2, paddingLeft: 0}}>
								<FilledInput
									fullWidth
									disabled={substat1Input === "None"}
									value={data.length > 1 ? data[1].result : ""}
									sx={{input: {
										textAlign: "right",
										verticalAlign: "middle",
										color: "white",
										backgroundColor: "#1976d2"}}} />
							</Grid>
						</Grid>
					</Grid>
					{/* ROW 2 */}
					<Grid container spacing={2} sx={{p: 2, paddingRight: 0}}>
						<Grid xs={4} sx={{p: 2}}>
							<FormControl fullWidth disabled={armorTypeInput === "None"}>
								<InputLabel id="armor-rarity" sx={{color: 'white'}}>Armor Rarity</InputLabel>
								<Select
									labelId="armor-rarity"
									value={armorRarityInput}
									label="Armor Rarity"
									onChange={handleArmorRarityChange}
									sx={{color: 'white', backgroundColor: '#1976d2', xs: "12"}}>
										<MenuItem
											key={"SSR"}
											value={"SSR"}
										>{"SSR"}</MenuItem>
										<MenuItem
											key={"SR"}
											value={"SR"}
										>{"SR"}</MenuItem>
										<MenuItem
											key={"None"}
											value={"None"}
										>{"None"}</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid xs container spacing={0} sx={{p: 0}}>
							<Grid xs={8} sx={{p: 2, paddingRight: 0}}>
								<ArmorEditSelect
									id="substat-2"
									label="Substat 2"
									value={substat2Input}
									onChange={handleSubStat2Change}
									options={getArmorType(armorTypeInput)}
									propertyToDisplay="name"
									disabled={armorTypeInput === "None"}
								/>
							</Grid>
							<Grid xs={4} sx={{p: 2, paddingLeft: 0}}>
								<FilledInput
									fullWidth
									disabled={substat2Input === "None"}
									value={data.length > 1 ? data[2].result : ""}
									sx={{input: {
										textAlign: "right",
										verticalAlign: "middle",
										color: "white",
										backgroundColor: "#1976d2"}}} />
							</Grid>
						</Grid>
					</Grid>
					{/* Armor type - stat1
					Rarity - stat2
					Number of upgrades - stat3
					total efficiency- stat4 */}
					<Button
							variant="contained"
							endIcon={<SaveIcon sx={{width: '100%'}}/>}>
							Save
						</Button>
				</Grid>
			</Grid>
		</Box>
	);
}