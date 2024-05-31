import { NextApiRequest, NextApiResponse } from 'next';

let userData = {
  first_name: 'John',
  middle_name:'',
  last_name:'Doe',
  email: 'Ooga@gmail.com',
  age: '50',
  desc: 'Change me',
};

export default function users(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(userData);

  } else if (req.method === 'PUT') {

    const { first_name, middle_name, last_name, email, age, desc } = req.body;

    if (!first_name || !last_name || !email || !age ) {
      res.status(400).json({ error: "Missing required fields" });

    } else {
      userData = { first_name, middle_name, last_name, email, age, desc };
      res.status(200).json(userData);
    }

  } 
}