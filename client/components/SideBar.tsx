"use client";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  IconButton,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import {
  Work,
  Description,
  BarChart,
  AddBox,
  Menu as MenuIcon,
  ExpandMore,
} from "@mui/icons-material";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { RootState } from "@/redux/Store";
import { logout, resetSuccess } from "@/redux/slices/AdminSlice";
import { useRouter } from "next/navigation";
import { FileClock } from "lucide-react";
import ThemeButton from "./ThemeButton";
import { useTheme } from "next-themes";

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
    { text: "All Jobs", link: "/admin/alljobs", icon: <Work /> },
    {
      text: "All Applications",
      link: "/admin/allapplications",
      icon: <Description />,
    },
    { text: "Statistics", link: "/admin/statistics", icon: <BarChart /> },
    { text: "Add Jobs", link: "/admin/postjob", icon: <AddBox /> },
  ]);

  const { resolvedTheme } = useTheme()
  useEffect(() => {
    if (user.loggedInUser?.role === "super admin") {
      setNavItems((prevNavItems) => {
        const waitListExists = prevNavItems.find(
          (item) => item.text === "Wait List"
        );

        if (!waitListExists) {
          return [
            ...prevNavItems,
            {
              text: "Wait List",
              link: "/superadmin/toapprove",
              icon: <FileClock />,
            },
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
        transition: "width 0.3s ease", // Animation for expanding and collapsing
        [`& .MuiDrawer-paper`]: {
          width: isOpen ? 240 : 72,
          boxSizing: "border-box",
          borderRight: "none",
          background:
            resolvedTheme === "dark" ? "linear-gradient(0deg, #1f265f 0%, rgba(0, 35, 99, 0.88) 55%, rgba(40, 105, 138, 0.94) 100%)" : "linear-gradient(180deg,rgba(116, 200, 242, 0.65),#FFFFFF)",
          zIndex: 1,
          transition: "width 0.3s ease", // Animation for drawer paper
        },
      }}
    >
      <div className="flex flex-col h-full">
        <div className="justify-center py-4">
          <div
            className={`flex items-center w-full px-4 ${
              isOpen ? "justify-between" : "justify-center"
            }`}
          >
            {isOpen && (
              <>
                <div>
                  <Button
                    onClick={handleMenuOpen}
                    className="flex items-center dark:text-blue-400 space-x-2"
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>{user.loggedInUser?.name}</span>
                    <ExpandMore />
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      style: {
                        transform: "translateY(-20px)", // Moves the menu up by 20px
                      },
                    }}
                  >
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
            <IconButton
              onClick={toggleDrawer}
              sx={{ textAlign: "center", ml: isOpen ? "auto" : 0, color: resolvedTheme === "dark" ? "white" : "black" }}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </div>

        <div className="flex-grow">
          {navItems.map((item) => (
            <li
              key={item.text}
              className={`flex items-center ${
                isOpen ? "justify-start px-4" : "justify-center"
              } py-4 transition duration-200 ease-in-out hover:bg-blue-100`} // Changed hover effect to background color
            >
              <Link href={item.link}>
                <div className="flex items-center text-black dark:text-white hover:text-blue-600">
                  <div
                    className={`${
                      isOpen ? "mr-4" : "mr-0"
                    } text-blue-600 dark:text-blue-400 transition duration-200 ease-in-out`}
                  >
                    {item.icon}
                  </div>
                  {isOpen && <span>{item.text}</span>}
                </div>
              </Link>
            </li>
          ))}
        </div>
        <div className=" flex justify-center items-center w-full">
          <ThemeButton />
        </div>
        <div
          className={`
          p-4
          ${
            isOpen
              ? "mx-4 mb-4 rounded-lg shadow-md text-white bg-blue-400"
              : "w-full flex justify-center items-center"
          }
        `}
        >
          <div
            className={`${
              isOpen ? "hidden" : "block"
            } w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium cursor-pointer`}
            onClick={handleMenuOpen} // Click handler for dropdown in collapsed state
          >
            {user.loggedInUser?.email
              ? user.loggedInUser.email[0].toUpperCase()
              : "?"}
          </div>
          {isOpen ? (
            <p className="text-sm truncate">{user.loggedInUser?.email}</p>
          ) : (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  transform: "translateY(-20px)", // Moves the menu up by 20px
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link href="/admin/profile">Profile</Link>
              </MenuItem>
              {user.isLoading ? (
                <CircularProgress size={24} className="text-white" />
              ) : (
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              )}
            </Menu>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;
