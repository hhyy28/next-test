'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ResultPage() {
  const router = useRouter();
  const { makeId, year } = router.query;  
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      if (!makeId || !year) return;

      try {
        const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
        const result = await res.json();
        if (result.Results) {
          setModels(result.Results);
        } else {
          setError('No models found');
        }
      } catch (err) {
        console.error('Error fetching vehicle models:', err);
        setError('Failed to fetch models');
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [makeId, year]);

  if (loading) return <p>Loading models...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container-centered">
      <h1 className="text-4xl font-bold mb-4">Vehicle Models for {makeId} in {year}</h1>
      {models.length > 0 ? (
        <ul className="list-disc list-inside">
          {models.map((model, index) => (
            <li key={index}>{model.Model_Name}</li>
          ))}
        </ul>
      ) : (
        <p>No models found for the selected make and year.</p>
      )}
    </div>
  );
}
