import { readdir, readFile, stat } from "fs/promises"
import { basename } from "path";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "components/Layout";

export default function Comic ({ img, alt, title, width, height, nextId, prevId, hasNext, hasPrevious }) {
  return (
    <>
      <Head>
        <title>XKCD | Comics for developers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <section className="max-w-lg m-auto" >
          <h1 className="font-bold text-center text-xl mb-4" >{title}</h1>
          <div className="max-w-sm m-auto" >
            <Image
              layout="responsive"
              width={width}
              height={height}
              src={img}
              alt={alt}
            />
          </div>
          <p className="mt-4" >{alt}</p>
          <div className="flex justify-between p-4 font-bold" >
            {hasPrevious && <Link href={`/comic/${prevId}`} >
              <a className="text-gray-900">← Previous</a>
            </Link>}
            {hasNext && <Link href={`/comic/${nextId}`} >
              <a className="text-gray-900">Next →</a>
            </Link>}
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticPaths ({ locales }) {
  const files = await readdir('./comics')
  let paths = []

  // locales -> ['en', 'es']
  locales.forEach(locale => {
    paths = paths.concat(files.map(file => {
      const id = basename(file, '.json')
      return { params: { id }, locale }
    }))
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps ({ params }) {
  const { id } = params

  const content = await readFile(`./comics/${id}.json`, 'utf-8')
  const comic = JSON.parse(content)
  const idNumber = +id
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`)
  ])

  const hasPrevious = prevResult.status === "fulfilled"
  const hasNext = nextResult.status === "fulfilled"

  return {
    props: {
      ...comic,
      hasNext,
      hasPrevious,
      nextId,
      prevId
    }
  }
}