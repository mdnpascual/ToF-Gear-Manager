import React, { useEffect, useState } from 'react';
import cv from "@techstark/opencv-js"
import { ArmorType, allArmorTypes } from "../models/ArmorType";
import { Stat } from "../models/Stat";
import {
	Box,
	Grid,
	Button,
	SelectChangeEvent,
	FilledInput,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import sample from "../sample.png";
import dragdrop from "../dragdrop.png";
import { allStats } from '../models/StatDatabase';
import { ArmorEditSelect } from './ArmorEditSelect';
import { InstructionModal } from './InstructionModal';
import { ArmorEditUpgrade } from './ArmorEditUpgrade';
import { computeEfficiency, computeOverallEfficiency } from '../util/Results';

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
	const [armorUpgradeCountInput, setArmorUpgradeCount] = useState("0");

	const [substat1Input, setSubstat1] = useState("None");
	const [substat2Input, setSubstat2] = useState("None");
	const [substat3Input, setSubstat3] = useState("None");
	const [substat4Input, setSubstat4] = useState("None");

	const [upgrade1Input, setUpgrade1] = useState("0");
	const [upgrade2Input, setUpgrade2] = useState("0");
	const [upgrade3Input, setUpgrade3] = useState("0");
	const [upgrade4Input, setUpgrade4] = useState("0");

	const [value1Input, setValue1] = useState(0);
	const [value2Input, setValue2] = useState(0);
	const [value3Input, setValue3] = useState(0);
	const [value4Input, setValue4] = useState(0);

	const [openTut, setOpenTut] = useState(false);

	const handleOpenTut = () => setOpenTut(true);
	const handleCloseTut = () => setOpenTut(false);

	const handleArmorTypeChange = (event: SelectChangeEvent) => {
		setArmorType(event.target.value as string);
	};
	const handleArmorRarityChange = (event: SelectChangeEvent) => {
		setArmorRarity(event.target.value as string);
	};
	const handleArmorUpgradeCountChange = (event: SelectChangeEvent) => {
		setArmorUpgradeCount(event.target.value as string);
	};

	const handleSubStat1Change = (event: SelectChangeEvent) => {
		setSubstat1(event.target.value as string);
	};
	const handleSubStat2Change = (event: SelectChangeEvent) => {
		setSubstat2(event.target.value as string);
	};
	const handleSubStat3Change = (event: SelectChangeEvent) => {
		setSubstat3(event.target.value as string);
	};
	const handleSubStat4Change = (event: SelectChangeEvent) => {
		setSubstat4(event.target.value as string);
	};

	const handleUpgrade1Change = (event: SelectChangeEvent) => {
		setUpgrade1(event.target.value as string);
	};
	const handleUpgrade2Change = (event: SelectChangeEvent) => {
		setUpgrade2(event.target.value as string);
	}
	const handleUpgrade3Change = (event: SelectChangeEvent) => {
		setUpgrade3(event.target.value as string);
	};
	const handleUpgrade4Change = (event: SelectChangeEvent) => {
		setUpgrade4(event.target.value as string);
	};

	const handleValue1Change = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setValue1(parseFloat(event.target.value));
	};
	const handleValue2Change = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setValue2(parseFloat(event.target.value));
	};
	const handleValue3Change = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setValue3(parseFloat(event.target.value));
	};
	const handleValue4Change = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setValue4(parseFloat(event.target.value));
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
			setSubstat3(data[3].name);
			setSubstat4(data[4].name);
			setUpgrade1(data[1].upgrades!.toString());
			setUpgrade2(data[2].upgrades!.toString());
			setUpgrade3(data[3].upgrades!.toString());
			setUpgrade4(data[4].upgrades!.toString());
			setValue1(parseFloat(data[1].result));
			setValue2(parseFloat(data[2].result));
			setValue3(parseFloat(data[3].result));
			setValue4(parseFloat(data[4].result));
			setArmorUpgradeCount(data.reduce((sum, elem) => sum + (elem.upgrades ?? 0), 0).toString());
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
				<Grid xs={3}>
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
				<Grid xs={9} sx={{p: 2, paddingRight: 0}}>
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
							<Grid xs={8} sx={{p: 2, paddingRight: 0, paddingBottom: 0}}>
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
							<Grid xs={4} sx={{p: 2, paddingLeft: 0, paddingBottom: 0}}>
								<FilledInput
									fullWidth
									disabled={substat1Input === "None"}
									onChange={handleValue1Change}
									value={value1Input}
									sx={{input: {
										textAlign: "right",
										verticalAlign: "middle",
										color: "white",
										backgroundColor: "#1976d2"}}} />
							</Grid>
							<Grid xs={2} sx={{p: 0, paddingLeft: 2}}>
								<ArmorEditUpgrade
										id="upgrade-count-1"
										value={upgrade1Input}
										disabled={armorTypeInput === "None"}
										label="Upgrades"
										onChange={handleUpgrade1Change} />
							</Grid>
							<Grid xs={6} sx={{p: 0}}></Grid>
							<Grid xs={2} alignItems="center" display="flex"
								sx={{p: 0, paddingLeft: 2, paddingRight: 2, textAlign: "right"}}>
								<Typography variant="subtitle1"> Efficiency: </Typography>
							</Grid>
							<Grid xs={2} sx={{p: 0, paddingRight: 2}}>
								<FilledInput
										fullWidth
										value={data.length > 1 ? computeEfficiency(data[1], starDetected) : "0%"}
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
							<Grid xs={8} sx={{p: 2, paddingRight: 0, paddingBottom: 0}}>
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
							<Grid xs={4} sx={{p: 2, paddingLeft: 0, paddingBottom: 0}}>
								<FilledInput
									fullWidth
									disabled={substat2Input === "None"}
									onChange={handleValue2Change}
									value={value2Input}
									sx={{input: {
										textAlign: "right",
										verticalAlign: "middle",
										color: "white",
										backgroundColor: "#1976d2"}}} />
							</Grid>
							<Grid xs={2} sx={{p: 0, paddingLeft: 2}}>
								<ArmorEditUpgrade
									id="upgrade-count-2"
									value={upgrade2Input}
									disabled={armorTypeInput === "None"}
									label="Upgrades"
									onChange={handleUpgrade2Change} />
							</Grid>
							<Grid xs={6} sx={{p: 0}}></Grid>
							<Grid xs={2} alignItems="center" display="flex"
								sx={{p: 0, paddingLeft: 2, paddingRight: 2, textAlign: "right"}}>
								<Typography variant="subtitle1"> Efficiency: </Typography>
							</Grid>
							<Grid xs={2} sx={{p: 0, paddingRight: 2}}>
								<FilledInput
										fullWidth
										value={data.length > 1 ? computeEfficiency(data[2], starDetected) : "0%"}
										sx={{input: {
											textAlign: "right",
											verticalAlign: "middle",
											color: "white",
											backgroundColor: "#1976d2"}}} />
							</Grid>
						</Grid>
					</Grid>
					{/* ROW 3 */}
					<Grid container spacing={2} sx={{p: 2, paddingRight: 0}}>
						<Grid xs={4} sx={{p: 2}}>
							<FormControl fullWidth disabled={armorTypeInput === "None"}>
								<InputLabel id="upgrade-count" sx={{color: 'white'}}>Upgrade Count</InputLabel>
								<Select
									labelId="upgrade-count"
									value={armorUpgradeCountInput}
									label="Upgrade Count"
									onChange={handleArmorUpgradeCountChange}
									sx={{color: 'white', backgroundColor: '#1976d2', xs: "12"}}>
										<MenuItem key={"0"} value={"0"}> ☆☆☆☆☆ </MenuItem>
										<MenuItem key={"1"} value={"1"}> ★☆☆☆☆ </MenuItem>
										<MenuItem key={"2"} value={"2"}> ★★☆☆☆ </MenuItem>
										<MenuItem key={"3"} value={"3"}> ★★★☆☆ </MenuItem>
										<MenuItem key={"4"} value={"4"}> ★★★★☆ </MenuItem>
										<MenuItem key={"5"} value={"5"}> ★★★★★ </MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid xs container spacing={0} sx={{p: 0}}>
							<Grid xs={8} sx={{p: 2, paddingRight: 0, paddingBottom: 0}}>
								<ArmorEditSelect
									id="substat-3"
									label="Substat 3"
									value={substat3Input}
									onChange={handleSubStat3Change}
									options={getArmorType(armorTypeInput)}
									propertyToDisplay="name"
									disabled={armorTypeInput === "None"}
								/>
							</Grid>
							<Grid xs={4} sx={{p: 2, paddingLeft: 0, paddingBottom: 0}}>
								<FilledInput
									fullWidth
									disabled={substat2Input === "None"}
									onChange={handleValue3Change}
									value={value3Input}
									sx={{input: {
										textAlign: "right",
										verticalAlign: "middle",
										color: "white",
										backgroundColor: "#1976d2"}}} />
							</Grid>
							<Grid xs={2} sx={{p: 0, paddingLeft: 2}}>
								<ArmorEditUpgrade
									id="upgrade-count-3"
									value={upgrade3Input}
									disabled={armorTypeInput === "None"}
									label="Upgrades"
									onChange={handleUpgrade3Change} />
							</Grid>
							<Grid xs={6} sx={{p: 0}}></Grid>
							<Grid xs={2} alignItems="center" display="flex"
								sx={{p: 0, paddingLeft: 2, paddingRight: 2, textAlign: "right"}}>
								<Typography variant="subtitle1"> Efficiency: </Typography>
							</Grid>
							<Grid xs={2} sx={{p: 0, paddingRight: 2}}>
								<FilledInput
										fullWidth
										value={data.length > 1 ? computeEfficiency(data[3], starDetected) : "0%"}
										sx={{input: {
											textAlign: "right",
											verticalAlign: "middle",
											color: "white",
											backgroundColor: "#1976d2"}}} />
							</Grid>
						</Grid>
					</Grid>
					{/* ROW 4 */}
					<Grid container spacing={2} sx={{p: 2, paddingRight: 0}}>
						<Grid xs={4} sx={{p: 2}}>
							<FormControl fullWidth>
								<InputLabel id="total-efficiency" sx={{color: 'white'}}>Overall Efficiency</InputLabel>
								<FilledInput
									fullWidth
									value={data.length > 1
										? computeOverallEfficiency(data, starDetected)
										: "0%"}
									sx={{input: {
										textAlign: "center",
										verticalAlign: "middle",
										color: "white",
										backgroundColor: "#1976d2"}}} />
							</FormControl>
						</Grid>
						<Grid xs container spacing={0} sx={{p: 0}}>
							<Grid xs={8} sx={{p: 2, paddingRight: 0, paddingBottom: 0}}>
								<ArmorEditSelect
									id="substat-4"
									label="Substat 4"
									value={substat4Input}
									onChange={handleSubStat4Change}
									options={getArmorType(armorTypeInput)}
									propertyToDisplay="name"
									disabled={armorTypeInput === "None"}
								/>
							</Grid>
							<Grid xs={4} sx={{p: 2, paddingLeft: 0, paddingBottom: 0}}>
								<FilledInput
									fullWidth
									disabled={substat2Input === "None"}
									onChange={handleValue4Change}
									value={value4Input}
									sx={{input: {
										textAlign: "right",
										verticalAlign: "middle",
										color: "white",
										backgroundColor: "#1976d2"}}} />
							</Grid>
							<Grid xs={2} sx={{p: 0, paddingLeft: 2}}>
								<ArmorEditUpgrade
									id="upgrade-count-4"
									value={upgrade4Input}
									disabled={armorTypeInput === "None"}
									label="Upgrades"
									onChange={handleUpgrade4Change} />
							</Grid>
							<Grid xs={6} sx={{p: 0}}></Grid>
							<Grid xs={2} alignItems="center" display="flex"
								sx={{p: 0, paddingLeft: 2, paddingRight: 2, textAlign: "right"}}>
								<Typography variant="subtitle1"> Efficiency: </Typography>
							</Grid>
							<Grid xs={2} sx={{p: 0, paddingRight: 2}}>
								<FilledInput
										fullWidth
										value={data.length > 1 ? computeEfficiency(data[4], starDetected) : "0%"}
										sx={{input: {
											textAlign: "right",
											verticalAlign: "middle",
											color: "white",
											backgroundColor: "#1976d2"}}} />
							</Grid>
						</Grid>
					</Grid>
					{/* TODO: SAVE BUTTON */}
					{/* <Button
						variant="contained"
						endIcon={<SaveIcon sx={{width: '100%'}}/>}>
						Save
					</Button> */}
				</Grid>
			</Grid>
		</Box>
	);
}