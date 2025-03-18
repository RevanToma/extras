"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"



const StyledNavBar = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme()

    const currentTheme = theme === "dark"
        ? "bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300"
        : "bg-gradient-to-r from-emerald-300 to-sky-400 text-white"


    return (

        <nav className={cn('p-4 shadow-lg flex justify-between items-center', currentTheme)}>
            {children}
        </nav>
    )




}

export default StyledNavBar