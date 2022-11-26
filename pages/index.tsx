import Head from 'next/head'
import { useState } from 'react'
import { useFetchMovies } from '../api/fetchHook'
import { Grid, Header, Hero, Card, Spinner } from '../components'

import { BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE } from '../config'
import Link from 'next/link'


export default function Home() {
  const [query, setQuery] = useState('')

  const { data, fetchNextPage, isLoading, isFetching, error } = useFetchMovies(query)

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget

    if (scrollHeight - scrollTop === clientHeight) fetchNextPage()
  }

  if (error) return <div>SOrry error occurred</div>

  return (
    <>
      <Head>
        <title>WeFlix</title>
        <meta name="description" content="We watch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative h-screen overflow-y-scroll" onScroll={handleScroll}>
        <Header setQuery={setQuery} />

        {!query && data && data.pages ? (
          <Hero
            imgUrl={data.pages[0].results[0].backdrop_path ? IMAGE_BASE_URL + BACKDROP_SIZE + data.pages[0].results[0]?.backdrop_path : '/no_image.jpg'}
            title={data.pages[0].results[0].title}
            text={data.pages[0].results[0].overview}
          />
        ) : null}



        <Grid
          className="p-4 max-w-7xl m-auto"
          title={query ? `Search Results: ${data?.pages[0].total_results}` : 'Popular Movies'}>
          {
            data && data.pages ? data.pages.map(page =>
              page.results.map(movie =>
                <Link key={movie.id} href={`/${movie.id}`}  >
                  <div className="cursor-pointer hover:opacity-80 duration-300" >
                    <Card
                      imgUrl={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : '/no_image.jpg'}
                      title={movie.original_title}
                    />
                  </div>
                </Link>


              ))
              : null}
        </Grid>

        {isLoading || isFetching ? <Spinner /> : null}
      </main>

    </>
  )
}
