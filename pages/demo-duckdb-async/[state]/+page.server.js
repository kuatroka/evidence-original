import { Database } from "duckdb-async";

const conso_duckdb_file = '../../needful_things.duckdb';


export async function load({ params }) {
	const db = await Database.create(conso_duckdb_file);
	const state = params.state;

    const query_duckdb = `
    SELECT state, sum(sales) as sales
    FROM orders 
    WHERE state = '${state}'
    GROUP BY state 
    LIMIT 3
    `;

	console.time(query_duckdb);
	const entries = await db.all(query_duckdb);
	console.timeEnd(query_duckdb);
	
	await db.close();
	// console.log(entries.slice(0, 3));

	return { entries }  
};

