import Head from 'next/head'
import Grid from '../components/Grid'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Spinner from '../components/Spinner'
import { useState } from 'react'
import { useFetchMovies } from '../api/fetchHook'


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
        <Hero />
        <Grid />
        <Card />
        <Spinner />
      </main>

    </>
  )
}
