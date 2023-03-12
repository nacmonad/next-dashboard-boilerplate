// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import csv from 'csv-parser';

import { Location } from '@/types';





export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Location | Error | any>
) {
    try {
        const id: number  = parseInt(req.query.id);
        const results:Location[] = [];

        fs.createReadStream(process.env.PWD +'/src/data/locations.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.status(200).json({ location: results[id] })
        })
        .on('error', (e) => { 
            console.log(e)
            throw e; });
        

    } catch(error) {
        console.log(error)
        if(error instanceof Error) res.status(503).json(error);
        if(error !instanceof Error) res.status(503).json(error);
        
    }
}
