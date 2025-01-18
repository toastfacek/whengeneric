'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

// Sample data (we'll replace this with API data later)
const patentData = [
  {
    id: 1,
    name: 'Humira',
    genericName: 'adalimumab',
    patentExpiration: '2024-01-31',
    indication: 'Rheumatoid Arthritis',
    category: 'Immunology',
    manufacturer: 'AbbVie',
    currentPrice: 6800.00,
    estimatedSavings: '70-85%',
    estimatedGenericPrice: 1200.00,
    significance: 'high',
    status: 'Patent Protected'
  },
  {
    id: 2,
    name: 'Xarelto',
    genericName: 'rivaroxaban',
    patentExpiration: '2024-09-30',
    indication: 'Blood Thinner',
    category: 'Cardiovascular',
    manufacturer: 'Janssen',
    currentPrice: 509.99,
    estimatedSavings: '65-80%',
    estimatedGenericPrice: 149.99,
    significance: 'high',
    status: 'Patent Protected'
  }
    type DrugData = {
    id: number;
    name: string;
    genericName: string;
    patentExpiration: string;
    indication: string;
    category: string;
    manufacturer: string;
    currentPrice: number;
    estimatedSavings: string;
    estimatedGenericPrice: number;
    significance: string;
    status: string;
}
};

// Update the patentData constant declaration
const patentData: DrugData[] = [
  // ... existing data ...
];


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrug, setSelectedDrug] = useState(null);

  const filteredDrugs = useMemo(() => {
    return patentData.filter(drug => {
      return drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             drug.genericName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  // Group drugs by year
  // Group drugs by year
const groupedDrugs = useMemo(() => {
  return filteredDrugs.reduce<Record<number, typeof patentData>>((acc, drug) => {
    const year = new Date(drug.patentExpiration).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(drug);
    return acc;
  }, {});
}, [filteredDrugs]);

 const getMonthsUntil = (date: string) => {
  const targetDate = new Date(date);
  const currentDate = new Date();
  const diff = targetDate.getTime() - currentDate.getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24 * 30.44)));
};

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Track When Your Medications Go Generic
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Save up to 85% by knowing when brand-name drugs become available as generics
          </p>
          
          {/* Search Section */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by drug name..."
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Year Groups */}
        <div className="space-y-8">
          {Object.entries(groupedDrugs).map(([year, drugs]) => (
            <div key={year} className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-blue-800">{year}</h2>
                <div className="h-px flex-1 bg-blue-200"></div>
              </div>

              <div className="grid gap-4">
                {drugs.map(drug => (
                  <div 
                    key={drug.id}
                    className="border-l-4 border-blue-500 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      {/* Drug Name and Time Until Generic */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-xl text-blue-900">{drug.name}</h3>
                          <p className="text-gray-600">{drug.genericName}</p>
                        </div>
                        <div className="text-right bg-blue-50 px-4 py-2 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">
                            {getMonthsUntil(drug.patentExpiration)}
                          </p>
                          <p className="text-sm text-blue-800">months until generic</p>
                        </div>
                      </div>

                      {/* Category and Indication */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                          {drug.category}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                          {drug.indication}
                        </span>
                      </div>

                      {/* Additional Details */}
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <div>
                          Manufacturer: <span className="font-medium">{drug.manufacturer}</span>
                        </div>
                        <div>
                          Patent Expires: {" "}
                          <span className="font-medium">
                            {new Date(drug.patentExpiration).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
