import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"

export default NextAuth({
    providers: [
      Auth0Provider({
          clientId: process.env.CLIENT_ID || '',
          clientSecret: process.env.CLIENT_SECRET || '',
          issuer: process.env.AUTH0_DOMAIN
      })
    ],
    callbacks: {
        session({ session, token, user }) {
            return session // The return type will match the one returned in `useSession()`
        }
    }
})