import React from 'react';
import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

export function ArmorEditUpgrade( {
	id,
	value,
	disabled,
	label,
	onChange
} : {
	id: string,
	value: string,
	disabled: boolean,
	label: string,
	onChange: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void)} ){
	return (
		<FormControl fullWidth disabled={disabled}>
			<InputLabel id={id} sx={{color: 'white'}}>{label}</InputLabel>
			<Select
				labelId={id}
				value={value}
				label={label}
				onChange={onChange}
				sx={{color: 'white', backgroundColor: '#1976d2', xs: "12"}}>
					<MenuItem key={"0"} value={"0"}> 0 </MenuItem>
					<MenuItem key={"1"} value={"1"}> 1 </MenuItem>
					<MenuItem key={"2"} value={"2"}> 2 </MenuItem>
					<MenuItem key={"3"} value={"3"}> 3 </MenuItem>
					<MenuItem key={"4"} value={"4"}> 4 </MenuItem>
					<MenuItem key={"5"} value={"5"}> 5 </MenuItem>
			</Select>
		</FormControl>
	);
}