"use client";
import { useState } from "react";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import SidebarItem from "./SidebarItem";
import Details from "../shared/Details";

const SidebarLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <SidebarItem open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-col md:pl-64 min-h-screen">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-gray-900 shadow border-b border-purple-950">
          <button
            type="button"
            className="border-l border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 flex flex-col lg:flex-row bg-gray-900 min-h-full">
          <div className="py-6 w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex flex-col">
              {children}
            </div>
          </div>
          <div className="hidden py-6 bg-gray-900  border-l-2 border-gray-800 lg:flex lg:w-96 lg:flex-col lg:items-center px-4">
            <Details />
          </div>
        </main>
      </div>
    </>
  );
};

export default SidebarLayout;
