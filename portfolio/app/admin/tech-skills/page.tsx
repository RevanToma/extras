import React from 'react';
import EditTechSkills from './edit-tech-skills';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin Tech Skills',
};
const AdminTechSkillsPage = () => {
  return <EditTechSkills />;
};

export default AdminTechSkillsPage;
