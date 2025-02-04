import React from 'react';
import EditProjects from './editProjects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Projects',
};

const AdminProjectsPage = () => {
  return <EditProjects />;
};

export default AdminProjectsPage;
