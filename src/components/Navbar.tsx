"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type KeyboardEvent } from "react";
import Brand from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { siteNavigation } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const menuIsOpen = openOnPath === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setOpenOnPath(null);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && menuIsOpen) {
      closeMenu();
      toggleRef.current?.focus();
    }
  }

  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl"
      onKeyDown={handleKeyDown}
    >
      <div className="site-container flex min-h-[4.5rem] items-center justify-between gap-5">
        <Brand onClick={closeMenu} />
        <button
          ref={toggleRef}
          type="button"
          aria-controls="site-navigation"
          aria-expanded={menuIsOpen}
          aria-label={menuIsOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setOpenOnPath(menuIsOpen ? null : pathname)}
          className="grid size-11 place-items-center rounded-xl border border-border text-foreground lg:hidden"
        >
          {menuIsOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav
          id="site-navigation"
          aria-label="Main"
          className={cn(
            "absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-border bg-background p-4 lg:static lg:flex lg:max-h-none lg:items-center lg:gap-5 lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0",
            menuIsOpen ? "block" : "hidden",
          )}
        >
          <ul className="flex flex-col gap-1 lg:flex-row lg:items-center xl:gap-3">
            {siteNavigation.map(({ name, href }) => {
              const isCurrent = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeMenu}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:text-foreground",
                      isCurrent ? "bg-primary/10 text-primary" : "text-muted-foreground",
                      name === "Campaign" && !isCurrent && "text-secondary",
                    )}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button asChild size="sm" className="mt-3 w-full lg:mt-0 lg:w-auto">
            <Link href="/contact" onClick={closeMenu}>
              Start a Project <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
