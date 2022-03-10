
export default function Search () {
  return (
    <div>index</div>
  )
}

export async function getServerSideProps ( context ) {
  const { query } = context
  const { search } = query
  // Call Algolia's api to find results
  return {
    props: {

    }
  }
}