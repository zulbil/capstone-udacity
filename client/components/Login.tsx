import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"

function Login() {
  return (
    <div className="grid place-items-center">
        <Image
          src="https://links.papareact.com/t4i" 
          width={300} 
          height={300} 
          alt="Next Facebook"
        />
        <h1 
        onClick={() => signIn()}
        className="p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer"
        >
            Login with Auth0
        </h1>
    </div>
  )
}

export default Login