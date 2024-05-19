"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "../../util/cn";
import { Link } from 'react-router-dom';
import { withAuthInfo, useRedirectFunctions, useLogoutFunction } from '@propelauth/react';

const FloatingNavComponent = ({
  navItems,
  className,
  isLoggedIn,
  user,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  isLoggedIn: boolean;
  user: {
    email: string;
  };
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions();
  const logoutFunction = useLogoutFunction();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(true);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-4 pl-12 py-4 items-center justify-center space-x-6",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            to={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-2 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-lg">{navItem.name}</span>
          </Link>
        ))}
        {isLoggedIn ? (
          <div className="flex items-center space-x-6">
            <span className="text-lg">{user.email}</span>
            <button 
              className="border text-lg font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-6 py-3 rounded-full"
              onClick={() => redirectToAccountPage()}
            >
              Account
            </button>
            <button 
              className="border text-lg font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-6 py-3 rounded-full"
              onClick={() => logoutFunction(true)}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-6">
            <button 
              className="border text-lg font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-6 py-3 rounded-full"
              onClick={() => redirectToLoginPage()}
            >
              <span>Login</span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export const FloatingNav = withAuthInfo(FloatingNavComponent);
