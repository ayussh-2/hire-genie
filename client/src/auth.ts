import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/token`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: credentials.email as string,
                                password: credentials.password as string,
                            }),
                        }
                    );

                    const data = await response.json();

                    console.log(data);

                    if (response.ok && data?.status == "success") {
                        return {
                            id: data.data.user.id,
                            email: data.data.user.email,
                            accessToken: data.data.access_token,
                            role: data.data.user.role,
                            name: data.data.user.name,
                        };
                    }

                    return null;
                } catch (error) {
                    console.error("Authentication error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.accessToken = (user as any).accessToken;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.accessToken = token.accessToken;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 60,
    },
    pages: {
        signIn: "/login",
        error: "/error",
    },
});
