import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const ThemeButton = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null; 
    }

    const handleChange = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div
            className="flex items-center justify-center w-10 h-10 cursor-pointer"
            onClick={handleChange}
        >
            {resolvedTheme === 'dark' ? <Moon className="text-white" /> : <Sun className="text-gray-800" />}
        </div>
    );
};

export default ThemeButton;
