"use client";
import { NavbarConfig, NavItem, NavSection } from "@/types/navbar";

import {
  Activity,
  Server,
  Lock,
  Home,
  Bell,
  Cloud,
  Terminal,
  Database,
  Zap,
  Globe,
  Folder,
  FileCode,
  Cpu,
  Layers,
  GitBranch,
  Bug,
  Users,
  Shield,
  Key,
  Settings,
  Cog,
  Palette,
  Wrench,
  Box,
  ChartLine,
  User,
} from "lucide-react";

// if you add role USER it will be hidden for admins
export const navItems: NavbarConfig = [
  {
    section: "Overview",
    items: [
      {
        label: "Dashboard",
        icon: <Home className="h-4 w-4" />,
        href: "/dashboard",
        subtitle: "System summary and analytics",
        badge: "new",
      },
      {
        label: "Activity",
        icon: <Activity className="h-4 w-4" />,
        href: "/activity",
        subtitle: "Recent system events",
      },
      {
        label: "Notifications",
        icon: <Bell className="h-4 w-4" />,
        href: "/notifications",
        badge: "12",
      },
    ],
  },
  {
    section: "Infrastructure",
    items: [
      {
        label: "Servers",
        icon: <Server className="h-4 w-4" />,
        href: "/servers",
        subtitle: "Deployed instances and resources",
        children: [
          {
            label: "Production",
            icon: <Cloud className="h-4 w-4" />,
            href: "/servers/production",
          },
          {
            label: "Staging",
            icon: <Cloud className="h-4 w-4" />,
            href: "/servers/staging",
          },
          {
            label: "Local",
            icon: <Terminal className="h-4 w-4" />,
            href: "/servers/local",
          },
        ],
      },
      {
        label: "Databases",
        icon: <Database className="h-4 w-4" />,
        href: "/databases",
        children: [
          {
            label: "PostgreSQL",
            icon: <Database className="h-4 w-4" />,
            href: "/databases/postgres",
          },
          {
            label: "Redis Cache",
            icon: <Zap className="h-4 w-4" />,
            href: "/databases/redis",
          },
        ],
      },
      {
        label: "Networking",
        icon: <Globe className="h-4 w-4" />,
        href: "/networking",
      },
    ],
  },
  {
    section: "Development",
    items: [
      {
        label: "Projects",
        icon: <Folder className="h-4 w-4" />,
        href: "/projects",
        subtitle: "Source-managed repositories",
        children: [
          {
            label: "Frontend",
            icon: <FileCode className="h-4 w-4" />,
            href: "/projects/frontend",
          },
          {
            label: "Backend",
            icon: <Cpu className="h-4 w-4" />,
            href: "/projects/backend",
          },
          {
            label: "Infrastructure",
            icon: <Layers className="h-4 w-4" />,
            href: "/projects/infrastructure",
          },
        ],
      },
      {
        label: "CI/CD Pipelines",
        icon: <GitBranch className="h-4 w-4" />,
        href: "/ci-cd",
        badge: "running",
      },
      {
        label: "Logs",
        icon: <Terminal className="h-4 w-4" />,
        href: "/logs",
      },
      {
        label: "Error Tracking",
        icon: <Bug className="h-4 w-4" />,
        href: "/errors",
        badge: "3",
      },
    ],
  },
  {
    section: "Security",
    items: [
      {
        label: "Users",
        icon: <Users className="h-4 w-4" />,
        href: "/users",
        children: [
          {
            label: "Roles",
            icon: <Shield className="h-4 w-4" />,
            href: "/users/roles",
          },
          {
            label: "Permissions",
            icon: <Key className="h-4 w-4" />,
            href: "/users/permissions",
          },
        ],
      },
      {
        label: "API Keys",
        icon: <Lock className="h-4 w-4" />,
        href: "/api-keys",
        subtitle: "Manage access tokens and scopes",
      },
      {
        label: "Audit Logs",
        icon: <FileCode className="h-4 w-4" />,
        href: "/audit",
      },
    ],
  },
  {
    section: "Administration",
    items: [
      {
        label: "Settings",
        icon: <Settings className="h-4 w-4" />,
        href: "/settings",
        children: [
          {
            label: "General",
            icon: <Cog className="h-4 w-4" />,
            href: "/settings/general",
          },
          {
            label: "Appearance",
            icon: <Palette className="h-4 w-4" />,
            href: "/settings/appearance",
          },
          {
            label: "Account",
            icon: <User className="h-4 w-4" />,
            href: "/settings/account",
          },
          {
            label: "System",
            icon: <Wrench className="h-4 w-4" />,
            href: "/settings/system",
            role: "ADMIN",
          },
        ],
      },
      {
        label: "Integrations",
        icon: <Box className="h-4 w-4" />,
        href: "/integrations",
        subtitle: "External APIs and tools",
      },
      {
        label: "Usage Reports",
        icon: <ChartLine className="h-4 w-4" />,
        href: "/reports",
      },
    ],
  },
];

// // function to insert/remove section/item/child

// export function insertSection(section: NavSection, position: number = 0) {
//   navItems.splice(position, 0, section)
// }

// export function insertItem(section: string, item: NavItem) {
//   navItems.find((item) => item.section === section)?.items.push(item)
// }

// export function insertChild(section: string, Item: string, child: NavItem) {
//   navItems.find((item) => item.section === section)?.items.find((item) => item.label == Item)?.children?.push(child)
// }

// export function removeSection(section: string) {
//   navItems.splice(navItems.findIndex((item) => item.section === section), 1)
// }

// export function removeItem(section: string, Item: string) {
//  const items = navItems.find((item) => item.section === section)?.items
//  items?.splice(items.findIndex((item) => item.label === Item), 1)
// }

// export function removeChild(section: string, Item: string, child: string) {
//   const items = navItems.find((item) => item.section === section)?.items
//   const children = items?.find((item) => item.label == Item)?.children
//   children?.splice(children.findIndex((item) => item.label === child), 1)
// }

// export function updateBadge(section: string, Item: string, badge: string) {
//   const items = navItems.find((item) => item.section === section)?.items
//   const target = items?.find((item) => item.label == Item)
//   if (target) target.badge = badge;

// }
