'use client';

import { useState } from 'react';

// Define the DrugData interface
interface DrugData {
  id: number;
  name: string;
  patentExpiration: string;
  description?: string;
}

// Define the type for grouped drugs
interface GroupedDrugs {
  [key: number]: DrugData[];
}

// Sample patent data
const patentData: DrugData[] = [
  {
    id: 1,
    name: "Drug A",
    patentExpiration: "2025-01-01",
    description: "Treatment for condition A"
  },
  // ... other drug entries
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExpired, setShowExpired] = useState(false);

  // Filter drugs based on search term and expiration
  const filteredDrugs = patentData.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase());
    const expirationDate = new Date(drug.patentExpiration);
    const isExpired = expirationDate < new Date();
    return matchesSearch && (showExpired || !isExpired);
  });

  // Group drugs by year with proper typing
  const groupedDrugs = filteredDrugs.reduce((acc: { [key: number]: DrugData[] }, drug) => {
    const year = new Date(drug.patentExpiration).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(drug);
    return acc;
  }, {});

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Drug Patent Expiration Tracker</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search drugs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded mr-4"
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showExpired}
            onChange={(e) => setShowExpired(e.target.checked)}
            className="mr-2"
          />
          Show Expired Patents
        </label>
      </div>

      {Object.entries(groupedDrugs)
        .sort(([yearA], [yearB]) => Number(yearA) - Number(yearB))
        .map(([year, drugs]) => (
          <div key={year} className="mb-6">
            <h2 className="text-xl font-semibold mb-3">{year}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drugs.map(drug => (
                <div key={drug.id} className="p-4 border rounded">
                  <h3 className="font-bold">{drug.name}</h3>
                  <p>Patent Expires: {new Date(drug.patentExpiration).toLocaleDateString()}</p>
                  {drug.description && <p className="mt-2">{drug.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
    </main>
  );
}
