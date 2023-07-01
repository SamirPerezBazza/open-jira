import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
  | { message: string }
  | { entries: IEntry[] }
  | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);

    case 'POST':
      return postEntries(req, res);

    default:
      return res.status(400).json({ message: 'Method not allowed' });
  }
}


const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();

  const entries = await Entry.find({}).sort({ createdAt: 'asc' });

  await db.disconnect();


  res.status(200).json({ entries });
};

const postEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { description = '' } = req.body;

  const entry = new Entry({
    description,
    createdAt: Date.now(),

  })

  try {

    await db.connect();

    await entry.save();

    await db.disconnect();

    return res.status(201).json(entry);

  } catch (error) {
    await db.disconnect();

    console.log(error);

    return res.status(500).json({ message: 'For security reasons, check the server console' })

  }

};
