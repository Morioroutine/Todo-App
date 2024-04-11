import type { NextApiRequest, NextApiResponse } from 'next';

let clientReferenceId: string | null = null; 

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ clientReferenceId: clientReferenceId || 'Not available' });
  }

  return res.status(405).end();
}

