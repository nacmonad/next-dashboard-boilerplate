// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import csv from 'csv-parser';

import { Locations } from '@/types';





export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Locations | Error | any>
) {
    try {
        
        const results:Location[] = [];

        fs.createReadStream(process.env.PWD +'/src/data/locations.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.status(200).json({ locations: results })
        })
        .on('error', (e) => { throw e; });
        

    } catch(error) {
        if(error instanceof Error) res.status(503).json(error);
        if(error !instanceof Error) res.status(503).json(error);
        
    }
}
