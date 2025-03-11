"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
// import { ModeToggle } from "@/components/theme/mode-toggle";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full py-5 bg-background/50 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-xl font-manrope">
                            HireGenie
                        </span>
                    </Link>

                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/dashboard" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            pathname === "/dashboard" &&
                                                "text-primary",
                                            "font-manrope"
                                        )}
                                    >
                                        Dashboard
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link href="/jobs" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            pathname === "/jobs" &&
                                                "text-primary",
                                            "font-manrope"
                                        )}
                                    >
                                        Jobs
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="font-manrope">
                                    Resources
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        <li className="row-span-3 font-manrope">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                    href="/resources/guides"
                                                >
                                                    <div className="mb-2 mt-4 text-lg font-medium">
                                                        Guides
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        Comprehensive guides to
                                                        help you in your job
                                                        search
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem
                                            href="/resources/resume"
                                            title="Resume Tips"
                                        >
                                            Optimize your resume for maximum
                                            impact
                                        </ListItem>
                                        <ListItem
                                            href="/resources/interview"
                                            title="Interview Prep"
                                        >
                                            Prepare for your upcoming interviews
                                        </ListItem>
                                        <ListItem
                                            href="/resources/networking"
                                            title="Networking"
                                        >
                                            Build your professional network
                                            effectively
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center gap-4">
                    {/* <ModeToggle /> */}
                    <div className="hidden md:flex gap-4">
                        <Button
                            variant="outline"
                            asChild
                            className="hover:text-white"
                        >
                            <Link href="/login">Sign In</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/register">Register</Link>
                        </Button>
                    </div>

                    {/* User Avatar (show when logged in) */}
                    {/*
                    <Avatar>
                      <AvatarImage src="/avatars/user.png" alt="User" />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    */}

                    {/* Hamburger Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </Button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="fixed inset-0 top-[5rem] z-50 md:hidden">
                    <div className="p-6 space-y-6 bg-white">
                        <nav className="space-y-4">
                            <Link
                                href="/dashboard"
                                className={cn(
                                    "block py-2 px-4 text-lg font-manrope transition-colors rounded-md hover:bg-accent",
                                    pathname === "/dashboard" &&
                                        "text-primary font-medium"
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/jobs"
                                className={cn(
                                    "block py-2 px-4 text-lg font-manrope transition-colors rounded-md hover:bg-accent",
                                    pathname === "/jobs" &&
                                        "text-primary font-medium"
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Jobs
                            </Link>
                            <div className="py-2 px-4">
                                <h3 className="text-lg font-manrope mb-2">
                                    Resources
                                </h3>
                                {/* <div className="pl-4 space-y-2">
                                    <Link
                                        href="/resources/guides"
                                        className="block py-1 px-2 text-sm transition-colors rounded-md hover:bg-accent"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Guides
                                    </Link>
                                    <Link
                                        href="/resources/resume"
                                        className="block py-1 px-2 text-sm transition-colors rounded-md hover:bg-accent"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Resume Tips
                                    </Link>
                                    <Link
                                        href="/resources/interview"
                                        className="block py-1 px-2 text-sm transition-colors rounded-md hover:bg-accent"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Interview Prep
                                    </Link>
                                    <Link
                                        href="/resources/networking"
                                        className="block py-1 px-2 text-sm transition-colors rounded-md hover:bg-accent"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Networking
                                    </Link>
                                </div> */}
                            </div>
                        </nav>
                        <div className="flex flex-col space-y-3">
                            <Button
                                variant="outline"
                                className="w-full"
                                asChild
                            >
                                <Link
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                            </Button>
                            <Button className="w-full" asChild>
                                <Link
                                    href="/register"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Register
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground font-manrope",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
