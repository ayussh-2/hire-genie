import Link from "next/link";
import React from "react";

export default function Footer() {
    return (
        <footer className="py-12">
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-manrope">
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/careers"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/help"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/feedback"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Feedback
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cookies"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Connect</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="https://twitter.com"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Twitter
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://linkedin.com"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    LinkedIn
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://facebook.com"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Facebook
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t text-center text-muted-foreground font-jakarta">
                    <p>© 2025 Hire Genie. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
