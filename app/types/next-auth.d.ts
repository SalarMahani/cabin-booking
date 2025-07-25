declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      guestId?: string
    }
  }
}
