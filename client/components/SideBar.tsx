"use client"
import React, { useEffect, useState } from 'react';
import {
  Drawer,
  IconButton,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { 
  Work, 
  Description, 
  BarChart, 
  AddBox,
  Menu as MenuIcon,
  ExpandMore,
} from '@mui/icons-material';

import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/Hooks';
import { RootState } from '@/redux/Store';
import { logout, resetSuccess } from '@/redux/slices/AdminSlice';
import { useRouter } from 'next/navigation';
import { FileClock } from 'lucide-react';

interface NavItem {
  text: string;
  link: string;
  icon: React.ReactElement;
}

const Sidebar = () => {
  const user = useAppSelector((state: RootState) => state.admin);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [navItems, setNavItems] = useState<NavItem[]>([
    { text: 'All Jobs', link: "/admin/alljobs", icon: <Work /> },
    { text: 'All Applications', link: "/admin/allapplications", icon: <Description /> },
    { text: 'Statistics', link: "/admin/statistics", icon: <BarChart /> },
    { text: 'Add Jobs', link: "/admin/postjob", icon: <AddBox /> },
  ]);

  useEffect(() => {
    if (user.loggedInUser?.role === "super admin") {
      setNavItems((prevNavItems) => {
        const waitListExists = prevNavItems.find(item => item.text === "Wait List");
  
        if (!waitListExists) {
          return [
            ...prevNavItems,
            { text: "Wait List", link: "/superadmin/toapprove", icon: <FileClock /> },
          ];
        }
        
        return prevNavItems;
      });
    }
  }, [user]);
  
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(resetSuccess());
    router.push("/");
    handleMenuClose();
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
          zIndex: 1,
        },
      }}
    >
      <div className="flex flex-col h-full">
        <div className='justify-center py-4'>
          <div className={`flex items-center w-full px-4 ${isOpen ? "justify-between" : "justify-center"}`}>
            {isOpen && (
              <>
                <div>
                  <Button onClick={handleMenuOpen} className='flex items-center space-x-2'>
                    <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>{user.loggedInUser?.name}</span>
                    <ExpandMore />
                  </Button>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={handleMenuClose}>
                      <Link href="/admin/profile">Profile</Link>
                    </MenuItem>
                    {user.isLoading ? (
                      <CircularProgress size={24} className="text-white" />
                    ) : (
                      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                    )}
                  </Menu>
                </div>
              </>
            )}
            <IconButton onClick={toggleDrawer} sx={{ textAlign: 'center', ml: isOpen ? 'auto' : 0 }}>
              <MenuIcon />
            </IconButton>
          </div>
        </div>

        <div className="flex-grow">
          {navItems.map((item) => (
            <li key={item.text} className={`flex items-center ${isOpen ? 'justify-start px-4' : 'justify-center'} py-4`}>
              <Link href={item.link}>
                <div className="flex items-center hover:text-blue-600">
                  <div className={`${isOpen ? 'mr-4' : 'mr-0'} text-blue-600`}>
                    {item.icon}
                  </div>
                  {isOpen && <span>{item.text}</span>}
                </div>
              </Link>
            </li>
          ))}
        </div>

        <div className={`
          p-4
          transition-all duration-300 ease-in-out
          ${isOpen 
            ? 'mx-4 mb-4 bg-white rounded-lg shadow-md' 
            : 'w-full flex justify-center items-center'
          }
        `}>
          {isOpen ? (
            <p className="text-sm text-gray-600 truncate">
              {user.loggedInUser?.email}
            </p>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
              {user.loggedInUser?.email ? user.loggedInUser.email[0].toUpperCase() : '?'}
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;