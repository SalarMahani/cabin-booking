// import NextAuth from 'next-auth'
// import Google from 'next-auth/providers/google'
// import { createGuest, getGuest } from '@/app/_lib/data-service'
//
// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],
//   callbacks: {
//     authorized({ auth, request }) {
//       return !!auth?.user
//     },
//     async signIn({ user, account, profile }) {
//       try {
//         const existingGuest = await getGuest(String(user.email))
//         if (!existingGuest) {
//           await createGuest({ email: user.email, fullName: user.name })
//         }
//         return true
//       } catch (err) {
//         console.error('Sign-in error:', err)
//         return false
//       }
//     },
//     async session({ session, user }) {
//       const guest = await getGuest(session.user.email)
//       session.user.guestId = guest.id
//       return session
//     },
//   },
//
//   pages: {
//     signIn: '/login',
//   },
// })
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { createGuest, getGuest } from '@/app/_lib/data-service'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(String(user.email))
        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name })
        }
        return true
      } catch (err) {
        console.error('Sign-in error:', err)
        return false
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email)
      session.user.guestId = guest.id
      return session
    },
  },

  pages: {
    signIn: '/login',
  },

  trustHost: true,
})
