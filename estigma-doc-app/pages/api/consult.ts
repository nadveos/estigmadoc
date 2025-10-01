import type { NextApiRequest, NextApiResponse } from 'next';
import { pb } from '@/lib/pocketbase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { patient_name, wound_type } = req.body;

    if (!patient_name || !wound_type) {
      return res.status(400).json({ message: 'Nombre del paciente y tipo de herida son requeridos.' });
    }

    const data = {
      patient_name,
      wound_type,
    };

    const record = await pb.collection('consultations').create(data);

    return res.status(201).json({ message: 'Consulta creada con éxito', record });

  } catch (error: any) {
    console.error('Error creating consultation:', error);
    // PocketBase a menudo devuelve errores detallados en error.data
    const pbError = error.data?.data || {};
    const errorMessage = Object.values(pbError).map((err: any) => err.message).join(', ');
    
    return res.status(500).json({ 
      message: `Error interno del servidor: ${errorMessage || error.message}`
    });
  }
}
