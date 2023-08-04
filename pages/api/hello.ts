import { NextApiRequest, NextApiResponse } from 'next';

export default function hello(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      res.status(200).send('hello');
    }
  } catch (err) {
    console.log(err, '💥');
  }
}
