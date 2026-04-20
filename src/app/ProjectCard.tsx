"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { motion, Variants } from "framer-motion";

import { Project } from "./Project";

interface ProjectCardProps {
  id: string;
  project: Project;
}

const cardVariants: Variants = {
  offscreen: {
    y: 100,
    opacity: 0,
    scale: 0.9,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

const imageVariants: Variants = {
  rest: {
    scale: 1,
    filter: "brightness(1)",
  },
  hover: {
    scale: 1.1,
    filter: "brightness(0.7)",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const overlayVariants: Variants = {
  rest: {
    opacity: 0,
    y: 20,
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function ProjectCard(props: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.1 }}
      id="outer_wrapper"
    >
      <motion.div
        className="w-full aspect-square relative overflow-hidden rounded-xl"
        variants={cardVariants}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Link href={`/projects/${encodeURIComponent(props.id)}`}>
          <motion.div
            className="relative w-full h-full"
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
          >
            {/* Image with zoom effect */}
            <motion.div
              className="relative w-full h-full"
              variants={imageVariants}
            >
              <Image
                src={props.project.imagePath}
                alt={props.project.name}
                fill={true}
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="h-full"
              />
              {/* Award Badge */}
              {props.project.award && (
                <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border border-yellow-300/50">
                  {props.project.award}
                </div>
              )}
            </motion.div>

            {/* Gradient overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Description overlay with animation */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-end items-center p-4 z-10"
              variants={overlayVariants}
              initial="rest"
              animate={isHovered ? "hover" : "rest"}
            >
              <div className="text-white text-sm leading-relaxed text-center line-clamp-6 mb-2">
                {props.project.description}
              </div>
              <div className="mt-2 px-4 py-2 bg-emerald-500 text-white font-semibold rounded-full text-sm hover:bg-emerald-600 transition-colors">
                View Details →
              </div>
            </motion.div>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
