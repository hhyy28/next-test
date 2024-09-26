'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FilterPage() {
  const [makes, setMakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [make, setMake] = useState('');
  const [year, setYear] = useState('');
  const years = Array.from({ length: new Date().getFullYear() - 2014 }, (_, i) => 2015 + i);

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const res = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
        const data = await res.json();
        setMakes(data.Results);
      } catch (error) {
        console.error('Error fetching vehicle makes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMakes();
  }, []);

  return (
    <div className="container-centered">
      <h1 className="text-2xl font-bold mb-4">Select Vehicle Make and Year</h1>
      
      <div className="w-full max-w-xs mb-4">
        <label className="block text-lg mb-2">Select a Vehicle Make:</label>
        <select 
          className="input-style w-full"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        >
          <option value="">Select Make</option>
          {makes.map((makeItem) => (
            <option key={makeItem.MakeId} value={makeItem.MakeId}>
              {makeItem.MakeName}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full max-w-xs mb-6">
        <label className="block text-lg mb-2">Select a Year:</label>
        <select 
          className="input-style w-full"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Select Year</option>
          {years.map((yearItem) => (
            <option key={yearItem} value={yearItem}>
              {yearItem}
            </option>
          ))}
        </select>
      </div>

      <Link 
        href={make && year ? `/result/${make}/${year}` : '#'}
        className={`button-style ${make && year ? 'hover:bg-gray-900' : 'opacity-50 cursor-not-allowed'}`}
      >
        Next
      </Link>
    </div>
  );
}
