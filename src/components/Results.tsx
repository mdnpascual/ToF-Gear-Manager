import React from 'react';
import { Stat } from '../models/Stat';

export function Results( { data, starDetected } : {data : Stat[], starDetected: number}) {
	return (
		<div className="Results">
			{data.length > 1 && <div>
				{data.map((elem, i) => {
					return (
						<h4>{elem.name} : {elem.result} {getAdditionalResult(elem)}</h4>
					)
				})}
				<h4> Efficiency: {computeEfficiency(data)}  </h4>
			</div>}
		</div>
	);
}

export const getAdditionalResult = (stat: Stat) => {
	if (stat.name === "CS"){
		return "";
	}
	return  "(" + stat.upgrades + " Upgrades, Efficiency: " + (stat.efficiency!*100) + "%)";
}

export const computeEfficiency = (stats: Stat[]) => {
	var total = 0;
	var count = 0;
	for (const stat of stats){
		if(stat.upgrades !== 0 && stat.name !== "CS"){
			total += (stat.efficiency ?? 0) * (stat.upgrades ?? 1);
			count+=stat.upgrades ?? 1;
		}
	}
	var avg = (total / count);
	return Math.ceil(avg*10000) / 100 + "%";
}