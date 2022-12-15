import React from 'react';
import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

export function ArmorEditSelect( {
	id,
	label,
	value,
	onChange,
	options,
	propertyToDisplay,
	disabled = false
} : {
	id: string,
	label: string,
	value: string,
	onChange: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void),
	options: any[],
	propertyToDisplay: string,
	disabled?: boolean
} ){
	return (
		<FormControl fullWidth disabled={disabled}>
			<InputLabel id={id} sx={{color: 'white'}}>{label}</InputLabel>
			<Select
				labelId={id}
				value={value}
				label={label}
				onChange={onChange}
				sx={{color: 'white', backgroundColor: '#1976d2', xs: "12"}}>
					{
						options.map((option) => (
							<MenuItem
								key={option[propertyToDisplay]}
								value={option[propertyToDisplay]}
							>
								{option[propertyToDisplay]}
							</MenuItem>
						))
					}
					<MenuItem
						key={"None"}
						value={"None"}
					>
						{"None"}
					</MenuItem>
			</Select>
		</FormControl>
	);
}