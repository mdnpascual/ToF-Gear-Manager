import React, { useEffect, useRef } from 'react';
import { Box, Modal } from '@mui/material';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 0.8,
	border: '2px solid #000',
	boxShadow: 24,
	backgroundColor: 'rgba(0,0,0,0.6)',
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
			<Box sx={style}>
				<img src={imgSrc} className="sample" alt="sample" height="80%" />
			</Box>
		</Modal>
	);
}