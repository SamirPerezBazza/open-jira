
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Pendiente: This is the first entry',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'En-progreso: This is the Second entry',
      status: 'in-Progress',
      createdAt: Date.now() - 1000,
    },
    {
      description: 'Finalizada: This is the third entry',
      status: 'finished',
      createdAt: Date.now() - 10000,
    },
  ]
}