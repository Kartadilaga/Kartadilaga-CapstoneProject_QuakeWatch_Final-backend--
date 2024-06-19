import prisma from "@/libs/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import md5 from "md5"

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { username, password } = credentials
                console.log('Authenticating user with username : ' + username)
                try {
                    const user = await prisma.users.findMany({
                        where: { username: username }
                    })

                    if (username === user[0].username) {
                        console.log('User found with username: ' + username + ', password: ' + password)
                        if (md5(password) === user[0].password) {
                            console.log('Password match!')
                            return user[0]
                        } else {
                            console.log('Password not match!')
                            return null
                        }
                    } else {
                        console.log('User not found!')
                        return null
                    }
                } catch (err) {
                    console.log('Error authenticating: ' + err)
                    return null
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60 // 2 Days Expire
    },
    pages: {
        signIn: "/dashboard",
        signOut: "/"
    },
    callbacks: {
        async session({ session, token, user }) {
            session.user.userid = token.sub
            session.user.name = token.name
            session.user.username = token.username

            return session
        },
        jwt(params) {
            // Update Token
            if (params.user?.username) {
                params.token.username = params.user.username
            }

            // Return Final Token
            return params.token
        }
    }
})

export { handler as GET, handler as POST }