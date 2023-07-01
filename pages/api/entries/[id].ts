import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'


type Data =
  | { message: string; }
  | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Not a valid Id ' })
  }


  switch (req.method) {
    case 'GET':
      return getEntry(req, res);

    case 'PUT':
      return putEntries(req, res);

    default:
      return res.status(400).json({ message: 'Method not allowed' });
  }
}


const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entry = await Entry.findById(id);

  if (!entry) {
    await db.disconnect();
    return res.status(404).json({ message: 'Entry not found' });
  }

  await db.disconnect();
  return res.status(200).json(entry);

}


const putEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryUpdate = await Entry.findById(id);

  if (!entryUpdate) {
    await db.disconnect();
    return res.status(404).json({ message: `No entry with id: ${id}` })
  }


  const {
    description = entryUpdate.description,
    status = entryUpdate.status,
  } = req.body;

  try {
    const entry = await Entry.findByIdAndUpdate(id, {
      description,
      status
    },
      {
        runValidators: true,
        new: true,
      }
    );

    await db.disconnect();

    return res.status(202).json(entry!);
  } catch (error: any) {
    console.log(error);


    await db.disconnect();

    return res.status(400).json({ message: error.errors.status.message })
  }


}