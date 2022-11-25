import Head from 'next/head'
import Grid from '../components/Grid'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Spinner from '../components/Spinner'
import { useState } from 'react'
import { useFetchMovies } from '../api/fetchHook'

import { BACKDROP_SIZE, IMAGE_BASE_URL } from '../config'


export default function Home() {
  const [query, setQuery] = useState('')

  const { data, fetchNextPage, isLoading, isFetching, error } = useFetchMovies(query)

  console.log(data)


  return (
    <>
      <Head>
        <title>WeFlix</title>
        <meta name="description" content="We watch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative h-screen overflow-y-scroll">
        <Header setQuery={setQuery} />

        {!query && data && data.pages ? (
          <Hero
            imgUrl={data.pages[0].results[0].backdrop_path ? IMAGE_BASE_URL + BACKDROP_SIZE + data.pages[0].results[0]?.backdrop_path : '/no_image.jpg'}
            title={data.pages[0].results[0].title}
            text={data.pages[0].results[0].overview}
          />
        ) : null}



        <Grid />
        <Card />
        <Spinner />
      </main>

    </>
  )
}
