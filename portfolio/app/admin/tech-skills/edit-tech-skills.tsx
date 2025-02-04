'use client';

import { useContext, useState } from 'react';
import { PortfolioContext } from '@/context/PortfolioContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EditTechSkills = () => {
  const portfolioContext = useContext(PortfolioContext),
    [newSkill, setNewSkill] = useState('');

  if (!portfolioContext) return <p>Loading...</p>;

  const { techSkills, addTechSkill, removeTechSkill } = portfolioContext;

  return (
    <main className='min-h-screen text-white p-6'>
      <h1 className='text-3xl font-bold mb-6'>Edit Tech Skills</h1>
      <div className='flex gap-4 flex-wrap'>
        {techSkills.map((skill, index) => (
          <Card
            key={index}
            className='p-4 rounded-md bg-[#1E1E1E] text-white w-fit'
          >
            <CardHeader>
              <CardTitle>{skill}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => removeTechSkill(skill)}
                className='bg-red-500 hover:bg-red-600'
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className='mt-8'>
        <h2 className='text-2xl font-semibold'>Add New Skill</h2>
        <input
          type='text'
          className='p-2 border border-gray-600 rounded-md bg-gray-800 text-white mt-2 mx-2'
          placeholder='Skill Name'
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <Button
          onClick={() => {
            if (newSkill.trim() !== '') {
              addTechSkill(newSkill.trim());
              setNewSkill('');
            }
          }}
          className='mt-4 bg-green-500 hover:bg-green-600'
        >
          Add Skill
        </Button>
      </div>
    </main>
  );
};

export default EditTechSkills;
