"use client"
import React, { useState } from 'react';
import {
  Drawer,
  Avatar,
  IconButton,
} from '@mui/material';
import { 
  Work, 
  Description, 
  BarChart, 
  AddBox,
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

import Link from 'next/link';

interface NavItem {
  text: string;
  link: string
  icon: React.ReactElement;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItem[] = [
    { text: 'All Jobs', link: "/alljobs",  icon: <Work /> },
    { text: 'All Applications', link: "/allapplications", icon: <Description /> },
    { text: 'Statistics', link:"/statistics", icon: <BarChart /> },
    { text: 'Add Jobs', link: "/postjob", icon: <AddBox /> },
  ];

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
      <Drawer
        variant="permanent"
        sx={{
          width: isOpen ? 240 : 72,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: isOpen ? 240 : 72, 
            boxSizing: 'border-box', 
            borderRight: 'none', 
            background: 'linear-gradient(180deg,rgba(116, 200, 242, 0.65),#FFFFFF)',
            zIndex: 1 
          },
        }}
      >
        <div>
          <div className='justify-center py-4'>
            <div className={`flex items-center w-full px-4 ${isOpen? "justify-between": "center"}` }>
              {isOpen && (
                <>
                  <Avatar sx={{ width: 32, height: 32 }} />
                  <h2 className='text-base font-normal ml-4'>User Name</h2>
                  <IconButton size="small">
                    <ExpandMoreIcon />
                  </IconButton>
                </>
              )}
              <IconButton onClick={toggleDrawer} sx={{ textAlign: 'center', ml: isOpen ? 'auto' : 0 }}>
                <MenuIcon />
              </IconButton>
            </div>
          </div>

          {navItems.map((item) => (
            <li 
                key={item.text} 
                className={`flex items-center ${isOpen ? 'justify-start px-4' : 'justify-center'} py-4`}
            > 
                <Link href={item.link}>
                    <div className="flex items-center hover:text-blue-600">
                    <div className={`${isOpen ? 'mr-4' : 'mr-0'} text-blue-600`}>
                        {item.icon}
                    </div>
                    {isOpen && (
                        <span>{item.text}</span>
                    )}
                    </div>
                </Link>
            </li>
        ))}

        </div>
        <div className={`mt-auto p-4 ${isOpen ? 'text-left' : 'text-center'}`}>
            {isOpen && <p className="text-base">useremail@gmail.com</p>}
        </div>
      </Drawer>
  );
};

export default Sidebar;
