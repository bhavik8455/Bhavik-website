import { Heart } from "lucide-react";
import React, { JSX, useState } from "react";
import ProjectCard from "../ProjectCard";
import ProjectModal from "../ProjectModal"; // ⬅️ You must have this file
import { jetbrainsMono } from "@/app/font";

import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTypescript, SiNextdotjs, SiPostgresql } from "react-icons/si";

import { SiSqlite, SiMysql } from "react-icons/si";
import { FaJava } from "react-icons/fa6";

export const techIconMap: Record<string, JSX.Element> = {
  react: <FaReact className="text-cyan-300" />,
  node: <FaNodeJs className="text-green-500" />,
  express: <SiExpress className="text-white" />,
  mongo: <SiMongodb className="text-green-400" />,
  ts: <SiTypescript className="text-blue-500" />,
  next: <SiNextdotjs className="text-white" />,
  postgres: <SiPostgresql className="text-sky-500" />,
  sqlite: <SiSqlite className="text-blue-400" />,
  mysql: <SiMysql className="text-blue-600" />,
  java: <FaJava className="text-red-500" />,
};

const projects = [
  {
    title: "Pulp - Text and Image Sharing Platform",
    description: "Quickly share codes and images with a unique five-digit code. Effortlessly edit and update shared content. Share content securely without the need for login credentials.",
    thumbnail: "/pulp.png",
    techStack: ["next", "ts", "sqlite"],
    gradient: "#51fbfb, rgb(13, 1, 60)",
    github: "https://github.com/bhavik8455/pulp",
    live: "https://pulpx.vercel.app/",
  },
  {
    title: "ERP System for Ecommerce",
    description: "Built using Java MVC2 architecture, this ERP system enables users to purchase products and provide reviews. Admin features include product management, sales trend analysis, sales forecasting, and inventory turnover ratio tracking.",
    thumbnail: "/erp2.png",
    techStack: ["java", "mysql"],
    gradient: "#ff7e5f, #0b1020",
    github: "https://github.com/bhavik8455/Erp-System-Project.git",
    live: "https://tinyurl.com/pirate-app",
  },
  {
    title: "PirateX - Treasure Hunt Game",
    description: "Developed for SFIT College's Codex Committee, this interactive treasure hunt game supports 200+ concurrent users. Built with Next.js and Cloudflare SQLite, featuring real-time updates, in-app haptics, and audio feedback.",
    thumbnail: "/piratex1.png",
    techStack: ["next", "sqlite"],
    gradient: "#14f195, rgb(13, 1, 60)",
    github: "https://github.com/bhavik8455/PirateX.git",
    live: "https://piratex-sfit.vercel.app/",
  },
  {
    title: "Assignment Submission System",
    description: "A comprehensive system developed for SFIT College faculty to manage assignments, submissions, and grading. Features include real-time submission tracking, automated grading workflows, and planned integration with College ERP.",
    thumbnail: "/AssignmentEvaluationSystem.png",
    techStack: ["next", "sqlite"],
    gradient: "#64e, rgb(13, 1, 60)",
    github: "https://github.com/Viraj2722/AssessEase.git",
    live: "",
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <div id="projects" className={`  ${jetbrainsMono.className} flex flex-col gap-10 items-center justify-center px-4 pb-20 w-full max-w-4xl`}>
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="flex gap-2 text-[#e8390d]">
          Made with <Heart />
        </p>
        <h1 className="text-4xl md:text-6xl text-center font-bold">
          My Projects
        </h1>
      </div>

      {/* Cards */}
      <div className={`${jetbrainsMono.className} flex flex-col gap-6 w-full `}>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          {...selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
