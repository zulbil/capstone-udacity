import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"

export default NextAuth({
    providers: [
      Auth0Provider({
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
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
        session({ session, token, user }) {
            session.accessToken = token.accessToken
            session.idToken = token.idToken
            session.user.id = token.id

            return session 
        }
    }
})