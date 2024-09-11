"use client";
import React from "react";
import { Button } from "@mui/material";
import Header from "@/components/Header";
import { useAppDispatch } from "@/redux/Hooks";
import Modal from "../../components/Modal";
import {
  setLoginCandidate,
  setLoginAdmin,
  setRegister,
  setContact,
} from "@/redux/slices/ModalSlice";

const RolesPage = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="sticky top-0 z-10">
        <Header page="roles" />
      </div>
      <div className="grid md:grid-cols-2 min-h-screen">
        <div className="bg-[radial-gradient(circle,#94CFFA,#F5FFF6)] dark:bg-[radial-gradient(circle,rgba(0,35,99,0.88),rgba(40,105,138,0.94))] flex justify-center items-center min-h-screen">
          <div className="w-[80%] flex flex-col items-center gap-10">
            <h1 className="text-3xl text-center">For Employee</h1>
            <p className="text-center">
              Log in to manage employee data, access essential resources, and
              streamline the hiring process!
            </p>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#F8FDFF",
                color: "#000",
                width: "120px",
                height: "40px",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#1565c0",
                  color: "white",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#1976d2",
                  color: "white",
                },
              }}
              onClick={() => dispatch(setLoginAdmin())}
            >
              Login
            </Button>
            <p className="text-center mt-5">
              Don’t have an account?{" "}
              <span
                className="text-blue-500 hover:underline hover:text-blue-700 hover:cursor-pointer"
                onClick={() => dispatch(setContact())}
              >
                Contact Admin
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-center dark:bg-slate-700 items-center min-h-screen">
          <div className="w-[80%] flex flex-col items-center gap-10">
            <h1 className="text-3xl text-center">For Candidate</h1>
            <p className="text-center">
              Apply with just a click and embark on an exciting journey into the
              future with us! Discover opportunities that match your skills,
              connect with our team, and take the first step toward building a
              rewarding career.
            </p>
            <Button
              variant="contained"
              sx={{
                width: "120px",
                height: "40px",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#1565c0",
                  color: "white",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#1976d2",
                  color: "white",
                },
              }}
              onClick={() => dispatch(setLoginCandidate())}
            >
              Login
            </Button>
            <p className="text-center mt-5">
              Don’t have an account?{" "}
              <span
                className="text-blue-500 hover:underline hover:text-blue-700 hover:cursor-pointer"
                onClick={() => dispatch(setRegister())}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>

      <Modal />
    </div>
  );
};

export default RolesPage;
