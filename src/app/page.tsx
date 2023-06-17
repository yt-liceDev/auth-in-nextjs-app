import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Lists from "./components/Lists"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="grid justify-center items-center h-[80vh]">
      <div>
        <Lists />

        <pre>{JSON.stringify(session)}</pre>
      </div>
    </div>
  )
}
