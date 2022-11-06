import React from 'react';
import { Stat } from './models/Stat';

export function Results( { data } : {data : Stat[]}) {
	return (
		<div className="Results">
			<div>
				{data.map((elem, i) => {
					return (
						<h4>{elem.name} : {elem.result} </h4>
					)
				})}
			</div>
		</div>
	);
}