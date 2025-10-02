import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/Models/usermodel";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Add other configurations like callbacks, database, etc., as needed
  callbacks: {
    async signIn({ user: googleUser }) {
      await connectDB();

      const existing = await User.findOne({ email: googleUser.email });
      if (!existing) {
        await User.create({
          name: googleUser.name,
          email: googleUser.email,
          image: googleUser.image,
          role: "user",
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      // Runs when a new JWT is created or updated
      if (user) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.id = dbUser._id.toString(); 
          token.role = dbUser.role; 
        }
      }
      return token;
    },
    async session({ session, token }) {
      
      if (token) {
        session.user.id = token.id; 
        session.user.role = token.role; 
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as POST, handler as GET };
