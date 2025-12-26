"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/config/navbarConfig";
import {
  ArrowRight,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const { data: session, status } = useSession();
  const userRole = session?.user?.role;
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newOpenState: Record<string, boolean> = {};
    navItems.forEach((section) => {
      section.items.forEach((item) => {
        if (item.children) {
          const uniqueKey = `${section.section}-${item.label}`;
          const isChildActive = item.children.some(
            (child) => pathname === child.href || pathname.startsWith(child.href + "/")
          );
          if (isChildActive) newOpenState[uniqueKey] = true;
        }
      });
    });
    setOpenSubmenus(newOpenState);
  }, [pathname]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleSubmenu = (key: string) => {
    const currentScroll = document.querySelector(".sidebar-scroll")?.scrollTop ?? 0;
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));
    requestAnimationFrame(() => {
      const container = document.querySelector(".sidebar-scroll");
      if (container) container.scrollTop = currentScroll;
    });
  };


  const SidebarContent = () => {
    const MemoizedSections = useMemo(
      () =>
        navItems
          .filter((item) => !item.role || userRole === item.role)
          .map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-6 px-6">
              <h3 className="text-xs font-semibold text-foreground/60 uppercase mb-3">
                {section.section}
              </h3>
              <ul className="space-y-1">
                {section.items
                  ?.filter((i) => !i.role || userRole === i.role)
                  .map((item, itemIdx) => {
                    const isActive = pathname === item.href;
                    const hasChildren = !!item.children;
                    const uniqueKey = `${section.section}-${item.label}`;
                    const isSubmenuOpen = openSubmenus[uniqueKey] || false;

                    return (
                      <li key={itemIdx}>
                        <div className="relative">
                          <Button
                            variant="ghost"
                            className={`w-full justify-start gap-3 px-3 py-2 rounded-md ${isActive
                              ? "bg-primary/10 text-primary"
                              : "text-foreground/80 hover:bg-muted/50 hover:text-foreground"
                              }`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (hasChildren) toggleSubmenu(uniqueKey);
                            }}
                          >
                            <span
                              className={`h-4 w-4 ${isActive ? "text-primary" : "text-foreground/60"
                                }`}
                            >
                              {item.icon}
                            </span>
                            <span className="flex-1 text-left">{item.label}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                {item.badge}
                              </Badge>
                            )}
                            {hasChildren &&
                              (isSubmenuOpen ? (
                                <ChevronDown className="h-4 w-4 rotate-180 transition-transform" />
                              ) : (
                                <ArrowRight className="h-4 w-4 transition-transform" />
                              ))}
                          </Button>

                          {hasChildren && (
                            <ul
                              className={`ml-4 mt-1 space-y-1 overflow-hidden transition-all duration-200 ease-in-out ${isSubmenuOpen
                                ? "max-h-96 opacity-100"
                                : "max-h-0 opacity-0 pointer-events-none"
                                }`}
                            >
                              {item.children
                                ?.filter((child) => !child.role || userRole === child.role)
                                .map((child, childIdx) => {
                                  const childIsActive = pathname === child.href;
                                  return (
                                    <li key={childIdx}>
                                      <Link
                                        href={child.href}
                                        scroll={false}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${childIsActive
                                          ? "bg-primary/10 text-primary"
                                          : "text-foreground/80 hover:bg-muted/50 hover:text-foreground"
                                          }`}
                                      >
                                        <span
                                          className={`h-4 w-4 ${childIsActive
                                            ? "text-primary"
                                            : "text-foreground/60"
                                            }`}
                                        >
                                          {child.icon}
                                        </span>
                                        <span className="flex-1">{child.label}</span>
                                      </Link>
                                    </li>
                                  );
                                })}
                            </ul>
                          )}
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )),
      [openSubmenus, pathname, userRole]
    );

    return (
      <div className="flex flex-col h-full w-72 border-r border-border bg-linear-to-b from-sidebar to-background">
        <Link href="/home">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="font-bold text-lg text-primary">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </span>
            <span className="text-xs text-foreground/60">
              v{process.env.NEXT_PUBLIC_APP_VERSION}
            </span>
          </div>
        </Link>

        {status === "authenticated" && (
          <div
            className="flex-1 overflow-y-auto py-4 sidebar-scroll"
            style={{ scrollBehavior: "auto" }}
          >
            {MemoizedSections}
          </div>
        )}

        {status === "authenticated" && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user.image ?? ""} alt="User" />
                  <AvatarFallback className="bg-muted text-foreground">
                    {session.user.name?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {session.user.name}
                  </div>
                  <div className="text-xs text-foreground/60">
                    {session.user.email.length > 20
                      ? session.user.email.slice(0, 20) + "..."
                      : session.user.email}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/60 hover:text-foreground"
                onClick={async () => await signOut()}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!isMobile) return <SidebarContent />;

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
          ☰
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
