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
import { LogOut, Menu, User, X } from "lucide-react";
// import { ModeToggle } from "@/components/theme/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

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
                    <div className="hidden md:flex gap-4">
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src={user?.image}
                                            alt={user?.name || "User"}
                                        />
                                        <AvatarFallback>
                                            {user?.name?.charAt(0) ||
                                                user?.email?.charAt(0) ||
                                                "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        {user?.name || user?.email}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/dashboard"
                                            className="cursor-pointer"
                                        >
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="cursor-pointer"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>

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
                                {/* Resource links commented out */}
                            </div>
                        </nav>
                        <div className="flex flex-col space-y-3">
                            {isAuthenticated ? (
                                <>
                                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                                        <Avatar>
                                            <AvatarImage
                                                src={user?.image}
                                                alt={user?.name || "User"}
                                            />
                                            <AvatarFallback>
                                                {user?.name?.charAt(0) ||
                                                    user?.email?.charAt(0) ||
                                                    "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-sm font-medium truncate">
                                                {user?.name || user?.email}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        className="w-full"
                                        onClick={async () => {
                                            setMobileMenuOpen(false);
                                            await handleLogout();
                                        }}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        asChild
                                    >
                                        <Link
                                            href="/login"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            Sign In
                                        </Link>
                                    </Button>
                                    <Button className="w-full" asChild>
                                        <Link
                                            href="/register"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            Register
                                        </Link>
                                    </Button>
                                </>
                            )}
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
