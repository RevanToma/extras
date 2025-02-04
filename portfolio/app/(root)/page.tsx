'use client';
import { PortfolioContext } from '@/context/PortfolioContext';
import { JSX, useContext } from 'react';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  const portfolioContext = useContext(PortfolioContext);

  if (!portfolioContext) return <p>Loading...</p>;

  const { projects, techSkills } = portfolioContext;

  const skillIcons: Record<string, JSX.Element> = {
    MongoDB: <SiMongodb size={40} color='#4DB33D' />,
    Express: <SiExpress size={40} color='#FFFFFF' />,
    React: <SiReact size={40} color='#61DBFB' />,
    NodeJS: <SiNodedotjs size={40} color='#68A063' />,
  };

  return (
    <main className='text-white min-h-screen px-6 md:px-16 lg:px-24'>
      <section className='flex flex-col items-center text-center py-5'>
        <h1 className='text-4xl md:text-5xl font-bold'>
          Hi 👋, I'm <span className='text-blue-500'>Revan</span>
        </h1>
        <p className='text-lg mt-4'>I build things for the web.</p>
      </section>
      <section className='mt-10'>
        <h2 className='text-3xl font-semibold text-center'>My Tech Stack</h2>
        <div className='flex flex-wrap justify-center gap-6 mt-8 group'>
          {techSkills.length > 0 ? (
            techSkills.map((skill, index) => (
              <div
                key={index}
                className='bg-gray-800 px-4 py-2 rounded-lg flex flex-col items-center transition-all duration-300 ease-in-out
            group-hover:blur-sm hover:!blur-none hover:scale-110 cursor-pointer'
              >
                {skillIcons[skill] || <span className='text-sm'>{skill}</span>}
                <span className='mt-2 text-sm'>{skill}</span>
              </div>
            ))
          ) : (
            <p>No skills available.</p>
          )}
        </div>
      </section>

      <section className='mt-20'>
        <h2 className='text-3xl font-semibold text-center'>Projects</h2>
        <p className='text-center text-gray-400'>Things I've built so far</p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
          {projects.map((project, idx) => (
            <Card key={project.id + idx} className='bg-gray-900 text-white'>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex gap-2 mt-2'>
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className='bg-gray-700 px-2 py-1 rounded text-sm'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className='flex justify-between mt-4'>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-400 hover:underline flex items-center gap-1'
                    >
                      Live Preview <FaExternalLinkAlt />
                    </a>
                  )}
                  {project.repoLink && (
                    <a
                      href={project.repoLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-400 hover:underline flex items-center gap-1'
                    >
                      View Code <FaGithub />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className='mt-20 text-center'>
        <h2 className='text-3xl font-semibold'>Contact</h2>
        <p className='text-gray-400 mt-2'>Feel free to reach out!</p>
        <p className='mt-4'>📧 info@example.com</p>
      </section>
    </main>
  );
}
