import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import React from "react";

export default function Layout({ children }: React.PropsWithChildren<object>) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
