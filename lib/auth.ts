import { Lucia, TimeSpan } from "lucia"
import prisma from "@/lib/db"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma"

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // we don't need to expose the password hash!
      email: attributes.email,
      name: attributes.name,
    }
  },
})

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  email: string
  name: string
}
