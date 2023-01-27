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
        async jwt({ token, account, profile }) {
            if (account) {
              token.idToken = account.id_token
              token.accessToken = account.access_token
              token.id = profile?.sub
            }
            
            return token
        },
        session({ session, token }) {
            session.user.accessToken = token.accessToken as string
            session.user.idToken = token.idToken as string
            session.user.id = token.id as string

            return session 
        }
    }
})