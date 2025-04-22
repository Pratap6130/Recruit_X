// "use client"
import React, { useEffect, useState } from "react"
import { getTechLogos } from "@/lib/utils"
import Image from "next/image"
import { cn } from "@/lib/utils"

const DisplayTechicons = ({ techStack }: TechIconProps) => {
  const [techIcons, setTechIcons] = useState<{tech: string, url: string}[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Ensure this runs only on client side
    if (typeof window !== 'undefined') {
      const loadIcons = async () => {
        const icons = await getTechLogos(techStack)
        setTechIcons(icons)
        setIsLoading(false)
      }
      loadIcons()
    }
  }, [techStack])

  if (isLoading) {
    // Return a skeleton loader that matches the final layout
    return (
      <div className="flex flex-row">
        {Array(3).fill(0).map((_, index) => (
          <div 
            key={index} 
            className={cn(
              "relative bg-dark-300 rounded-full p-2 flex-center",
              index >= 1 && '-ml-3'
            )}
          >
            <div className="size-5 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-row">
      {techIcons.slice(0,3).map(({tech, url}, index) => (
        <div 
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex-center",
            index >= 1 && '-ml-3'
          )} 
          key={tech}
        >
          <span className="tech-tooltip">{tech}</span>
          <Image 
            src={url} 
            alt={tech} 
            width={20} 
            height={20} 
            className="size-5"
            priority // Add if these are above-the-fold images
          />
        </div>
      ))}
    </div>
  )
}

export default DisplayTechicons