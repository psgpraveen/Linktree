'use client'

import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa'
import { SiNextdotjs, SiTailwindcss } from 'react-icons/si'
import { MdEmail } from 'react-icons/md'

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8 px-4 mt-12">
      <div className="max-w-5xl mx-auto grid gap-4 md:grid-cols-2">
        {/* Left side */}
        <div>
          <h2 className="text-lg font-semibold mb-2">TreeLink by Praveen</h2>
          <p className="text-sm mb-4">
            A modern Linktree alternative built using Next.js, Tailwind CSS, and hosted on Vercel.
            Easily manage and share your personal links.
          </p>
          <div className="flex items-center space-x-4 text-gray-500 text-sm">
            <span className="flex items-center gap-1">
              <SiNextdotjs className="text-lg" /> Next.js
            </span>
            <span className="flex items-center gap-1">
              <SiTailwindcss className="text-lg" /> Tailwind CSS
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col md:items-end justify-between space-y-2">
          <div className="flex items-center gap-4">
            <a href="https://github.com/psgpraveen" target="_blank" rel="noopener noreferrer" title="GitHub">
              <FaGithub className="text-xl hover:text-black dark:hover:text-white" />
            </a>
            <a href="https://www.linkedin.com/in/psgpraveen" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <FaLinkedin className="text-xl hover:text-blue-700" />
            </a>
            <a href="https://psgpraveen.github.io/port/" target="_blank" rel="noopener noreferrer" title="Portfolio">
              <FaGlobe className="text-xl hover:text-green-600" />
            </a>
            <a href="mailto:adm21002947@rmlau.ac.in" title="Email">
              <MdEmail className="text-xl hover:text-red-500" />
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            &copy; {new Date().getFullYear()} Psgpraveen . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
