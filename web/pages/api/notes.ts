import { NextApiRequest, NextApiResponse } from 'next';


interface RowType {
    task: string,
    desc: string
}

let userData: RowType[] = [
    {
        task: '',
        desc: ''
    }
];

export default function notes(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json(userData);
    
      } else if (req.method === 'PUT') {
    
        const { task, desc } = req.body;
    
        if (!task || !desc ) {
          res.status(400).json({ error: "Missing required fields" });
    
        } else {
          res.status(200).json(userData);
        }
    
    } 
}