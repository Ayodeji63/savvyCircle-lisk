"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart2,
  CreditCard,
  User,
  LucideIcon,
  Users,
  PiggyBank,
} from "lucide-react";

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, isActive }) => (
  <Link
    href={href}
    className={`flex flex-col items-center rounded-full p-2 ${isActive ? "bg-green-500" : ""}`}
  >
    <Icon size={24} color={isActive ? "white" : "black"} />
  </Link>
);

const FloatingNavBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 transform rounded-full bg-white px-4 py-2 shadow-lg">
      <ul className="flex space-x-8">
        <NavItem href="/dashboard" icon={Home} isActive={pathname === "/dashboard"} />
        <NavItem
          href="/group-savings"
          icon={Users}
          isActive={pathname === "/group-savings"}
        />
        <NavItem
          href="/cards"
          icon={PiggyBank}
          isActive={pathname === "/cards"}
        />
        <NavItem
          href="/profile"
          icon={User}
          isActive={pathname === "/profile"}
        />
      </ul>
    </nav>
  );
};

export default FloatingNavBar;
