'use client';
import React from 'react'
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';

function ThemeToggle() {
    const {theme, setTheme} = useTheme();
  return (
    <>
    {theme === 'light' ? (
            <button className="btn" onClick={() => setTheme("dark")}>
                <MoonIcon />
            </button>
        ) : (
            <button className="btn" onClick={() => setTheme("light")}>
                <SunIcon />
            </button>
        )}
    </>

  )
}

export default ThemeToggle