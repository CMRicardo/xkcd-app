import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useRef } from "react"

export function Header () {
  const [results, setResults] = useState([])
  const searchRef = useRef()
  const { locale, locales } = useRouter()

  const getValue = () => searchRef.current?.value

  const handleChange = () => {
    const q = getValue()

    if (!q) return [];
    fetch(`/api/search?q=${q}`)
      .then(res => res.json())
      .then(searchResults => {
        setResults(searchResults)
      })
  }

  const restOfLocales = locales.filter(l => l !== locale)

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
            <Link href='/' locale={restOfLocales[0]} >
              <a className="text-sm font-semibold">{restOfLocales[0]}</a>
            </Link>
          </li>
          <li className="m-0" >
            <input
              ref={searchRef}
              type="text"
              className="rounded border-slate-300 border-2 px-2"
              onChange={handleChange}
            />
            <div className="relative z-10">
              {
                Boolean(results.length) && <div className="absolute top-0 left-0" >
                  <ul className="w-full border-2 border-slate-300 rounded shadow-xl bg-white overflow-hidden" >
                    <Link href={`/search?q=${getValue()}`} >
                      <a
                        className="text-sm font-semibold text-ellipsis px-2 py-1 whitespace-nowrap rounded hover:bg-slate-200 w-full text-gray-600 italic"
                      >
                        Ver {results.length} resultados
                      </a>
                    </Link>
                    {
                      results.map(result => {
                        return (
                          <li
                            className="m-0"
                            key={result.id}
                          >
                            <Link href={`/comic/${result.id}`} >
                              <a
                                className="text-sm font-semibold text-ellipsis px-2 py-1 whitespace-nowrap rounded hover:bg-slate-200 w-full"
                              >
                                {result.title}
                              </a>
                            </Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              }
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}