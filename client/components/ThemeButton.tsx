import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@mui/material';
import { Brightness7, Brightness4 } from '@mui/icons-material';

const ThemeButton = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null; // Avoid rendering during the initial mount
    }

    const handleChange = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Switch
            color="primary"
            checked={resolvedTheme === 'dark'}
            onChange={handleChange}
            icon={<Brightness7 />}
            checkedIcon={<Brightness4 />}
        />
    );
};

export default ThemeButton;