"use client"
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";



const Logo = () => {
    const { theme } = useTheme(),
        logo = theme === 'light' ? ' bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent drop-shadow-lg' : 'bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent';


    return (
        <Link
            href='/'
            className={cn('text-2xl font-bold tracking-widest ', logo)}
        >
            MoneyMate
        </Link>
    )
}

export default Logo