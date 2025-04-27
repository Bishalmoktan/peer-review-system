"use client";

import { Toaster } from "react-hot-toast";

import { UserProvider } from "@/context/UserContext";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-screen px-8 md:px-16 my-8 mx-auto">
          <SidebarTrigger />
          {children}
        </main>
        <Toaster />
      </SidebarProvider>
    </UserProvider>
  );
}
