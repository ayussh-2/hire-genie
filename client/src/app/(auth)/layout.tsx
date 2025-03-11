import Link from "next/link";
import React from "react";

export default function Layout({ children }: React.PropsWithChildren<object>) {
    return (
        <>
            <div className="flex items-start w-full px-20 py-10">
                <Link href={"/"} className="font-jakarta text-4xl">
                    Hire Ginie
                </Link>
            </div>
            {children}
        </>
    );
}
