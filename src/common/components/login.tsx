import type { Session } from "next-auth";
import { signOut, signIn } from "next-auth/react";

const Login: React.FC<{ sessionData: Session | null }> = ({ sessionData }) => {
  return (
    <div className="flex flex-col items-center justify-center px-3">
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default Login;
