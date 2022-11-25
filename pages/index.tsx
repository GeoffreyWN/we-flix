import Head from 'next/head'
import Grid from '../components/Grid'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Spinner from '../components/Spinner'
import { useState } from 'react'
import { useFetchMovies } from '../api/fetchHook'

import { BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE } from '../config'


export default function Home() {
  const [query, setQuery] = useState('')

  const { data, fetchNextPage, isLoading, isFetching, error } = useFetchMovies(query)

  // console.log(data)

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget

    if (scrollHeight - scrollTop === clientHeight) fetchNextPage()
  }




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
            data && data.pages ? data.pages.map(
              page => page.results.map(
                movie => <div key={movie.id} >

                  <Card
                    imgUrl={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : '/no_image.jpg'}
                    title={movie.original_title}
                  />

                </div>
              ))
              : null}
        </Grid>

        {isLoading || isFetching ? <Spinner /> : null}
      </main>

    </>
  )
}
