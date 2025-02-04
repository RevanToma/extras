'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import { PortfolioContext } from '@/context/PortfolioContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EditProjects = () => {
  const portfolioContext = useContext(PortfolioContext),
    [editIndex, setEditIndex] = useState<string | null>(null),
    [editedProject, setEditedProject] = useState({
      title: '',
      description: '',
      techStack: '',
      liveLink: '',
      repoLink: '',
    }),
    editContainerRef = useRef<HTMLDivElement>(null);

  if (!portfolioContext) return <p>Loading...</p>;

  const { projects, addProject, editProject, deleteProject } = portfolioContext;

  const handleEditClick = (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      setEditIndex(id);
      setEditedProject({
        title: project.title,
        description: project.description,
        techStack: project.techStack.join(', '),
        liveLink: project.liveLink || '',
        repoLink: project.repoLink || '',
      });
    }
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedProject = {
        id: editIndex,
        title: editedProject.title,
        description: editedProject.description,
        techStack: editedProject.techStack
          .split(', ')
          .map((tech) => tech.trim()),
        liveLink: editedProject.liveLink.trim(),
        repoLink: editedProject.repoLink.trim(),
      };

      const projectIndex = projects.findIndex((p) => p.id === editIndex);
      editProject(projectIndex, updatedProject);
      setEditIndex(null);
      setEditedProject({
        title: '',
        description: '',
        techStack: '',
        liveLink: '',
        repoLink: '',
      });
    }
  };

  useEffect(() => {
    if (editIndex !== null && editContainerRef.current) {
      editContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [editIndex]);

  return (
    <main className='min-h-screen text-white p-6'>
      <h1 className='text-3xl font-bold mb-6'>Edit Projects</h1>

      <div className='space-y-4'>
        {projects.map((project, idx) => (
          <Card
            key={project.id + idx}
            className='p-4 rounded-md bg-[#1E1E1E] text-white'
          >
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex gap-2 mt-2'>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className='bg-gray-800 px-2 py-1 rounded-md text-white'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className='flex gap-2'>
              <Button
                onClick={() => handleEditClick(project.id)}
                className='bg-blue-500 hover:bg-blue-600'
              >
                Edit
              </Button>
              <Button
                onClick={() => deleteProject(Number(project.id))}
                className='bg-red-500 hover:bg-red-600'
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {editIndex !== null && (
        <div className='mt-8 p-6 bg-gray-800 rounded-md' ref={editContainerRef}>
          <h2 className='text-2xl font-semibold mb-4'>Edit Project</h2>
          <input
            type='text'
            className='w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white'
            placeholder='Title'
            value={editedProject.title}
            onChange={(e) =>
              setEditedProject({ ...editedProject, title: e.target.value })
            }
          />
          <textarea
            className='w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white mt-2'
            placeholder='Description'
            value={editedProject.description}
            onChange={(e) =>
              setEditedProject({
                ...editedProject,
                description: e.target.value,
              })
            }
          />
          <input
            type='text'
            className='w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white mt-2'
            placeholder='Tech Stack (comma separated)'
            value={editedProject.techStack}
            onChange={(e) =>
              setEditedProject({ ...editedProject, techStack: e.target.value })
            }
          />
          <input
            type='text'
            className='w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white mt-2'
            placeholder='Live Link (e.g., https://example.com)'
            value={editedProject.liveLink}
            onChange={(e) =>
              setEditedProject({ ...editedProject, liveLink: e.target.value })
            }
          />
          <input
            type='text'
            className='w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white mt-2'
            placeholder='Repo Link (e.g., https://github.com/user/project)'
            value={editedProject.repoLink}
            onChange={(e) =>
              setEditedProject({ ...editedProject, repoLink: e.target.value })
            }
          />
          <div className='flex gap-4 mt-4'>
            <Button
              onClick={handleSave}
              className='bg-green-500 hover:bg-green-600'
            >
              Save
            </Button>
            <Button
              onClick={() => setEditIndex(null)}
              className='bg-gray-500 hover:bg-gray-600'
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className='mt-8'>
        <h2 className='text-2xl font-semibold'>Add New Project</h2>
        <input
          type='text'
          className='w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white mt-2'
          placeholder='Title'
          value={editedProject.title}
          onChange={(e) =>
            setEditedProject({ ...editedProject, title: e.target.value })
          }
        />
        <textarea
          className='w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white mt-2'
          placeholder='Description'
          value={editedProject.description}
          onChange={(e) =>
            setEditedProject({ ...editedProject, description: e.target.value })
          }
        />
        <input
          type='text'
          className='w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white mt-2'
          placeholder='Tech Stack (comma separated)'
          value={editedProject.techStack}
          onChange={(e) =>
            setEditedProject({ ...editedProject, techStack: e.target.value })
          }
        />
        <input
          type='text'
          className='w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white mt-2'
          placeholder='Live Link (e.g., https://example.com)'
          value={editedProject.liveLink}
          onChange={(e) =>
            setEditedProject({ ...editedProject, liveLink: e.target.value })
          }
        />
        <input
          type='text'
          className='w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white mt-2'
          placeholder='Repo Link (e.g., https://github.com/user/project)'
          value={editedProject.repoLink}
          onChange={(e) =>
            setEditedProject({ ...editedProject, repoLink: e.target.value })
          }
        />
        <Button
          onClick={() => {
            addProject({
              ...editedProject,
              id: Date.now().toString(),
              techStack: editedProject.techStack
                .split(', ')
                .map((tech) => tech.trim()),
            });
            setEditedProject({
              title: '',
              description: '',
              techStack: '',
              liveLink: '',
              repoLink: '',
            });
          }}
          className='mt-4 bg-green-500 hover:bg-green-600'
        >
          Add Project
        </Button>
      </div>
    </main>
  );
};

export default EditProjects;
