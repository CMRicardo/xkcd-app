import Link from "next/link"

export function Header () {
  return (
    <header className="flex justify-evenly items-center py-4 max-w-xl m-auto" >
      <h1 className="font-bold transition hover:opacity-50" >
        <Link href="/" >
          <a>
            next <span className="font-light">xkcd</span>
          </a>
        </Link>
      </h1>
      <nav>
        <ul className="flex gap-4 align-middle" >
          <li className="m-0" >
            <Link href="/" ><a className="text-sm font-semibold">Home</a></Link>
          </li>
          <li className="m-0" >
            <Link href="/search" ><a className="text-sm font-semibold">Search</a></Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}