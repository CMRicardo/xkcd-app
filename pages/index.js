import { Footer } from "components/Footer"
import { Header } from "components/Header"
import fs from 'fs/promises'
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

export default function Home ( { latestComics } ) {
  return (
    <>
      <Head>
        <title>XKCD | Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <h2 className="text-4xl font-bold text-center" >Latest Comics</h2>
        <section className="max-w-3xl m-auto grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3" >
          {
            latestComics.map( comic => {
              return (
                <Link href={ `/comic/${comic.id}` } key={ comic.id } >
                  <a className="pb-4 m-auto mb-4">
                    <h3 className="text-lg font-semibold text-center" >{ comic.title }</h3>
                    <Image
                      width={ comic.width }
                      height={ comic.height }
                      src={ comic.img }
                      alt={ comic.alt }
                    />
                  </a>
                </Link>
              )
            } )
          }
        </section>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps ( context ) {
  const files = await fs.readdir( './comics' )
  const latestComicsFiles = files.slice( -8, files.length )

  const promisesReadFiles = latestComicsFiles.map( async ( file ) => {
    const content = await fs.readFile( `./comics/${file}`, 'utf-8' )
    return JSON.parse( content )
  } )
  const latestComics = await Promise.all( promisesReadFiles )
  console.log( latestComics );

  return {
    props: {
      latestComics
    }
  }
}
