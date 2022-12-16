import React, { useEffect, useRef } from 'react';
import { Grid, Modal } from '@mui/material';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: "80%",
	height: "80%",
	border: '2px solid #000',
	boxShadow: 24,
	backgroundColor: 'rgba(0,0,0,0.6)',
	display: "flex",
	p: 4,
};

export function InstructionModal( {open, onClose, imgSrc} : {
	open: boolean,
	onClose: () => void,
	imgSrc: string
} ){
	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Grid sx={style}>
				<img src={imgSrc} className="instruction" alt="instruction"/>
			</Grid>
		</Modal>
	);
}