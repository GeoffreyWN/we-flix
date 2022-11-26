import React from 'react'
import { movieUrl, creditsUrl, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../config'
import { basicFetch } from '../api/fetchFuntions'

import { Grid, Header, Hero, Card, Thumb, Breadcrumb } from '../components'

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import type { Movie, Credits, Crew, Cast } from '../api/types'
import MovieInfo from '../components/MovieInfo'

interface Props {
    movie: Movie
    directors: Crew[]
    cast: Cast[]
}

const SingleMovie: NextPage<Props> = ({ movie, cast, directors }) => {
    return (
        <main>
            <Header />
            <Breadcrumb title={movie.original_title} />
            <MovieInfo
                thumbUrl={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : '/no_image.jpg'}
                rating={movie.vote_average}
                title={movie.original_title}
                year={movie.release_date.split('-')[0]}
                backgroundImgUrl={movie.backdrop_path ? IMAGE_BASE_URL + BACKDROP_SIZE + movie.backdrop_path : '/no_image.jpg'}
                summary={movie.overview}
                directors={directors}
                time={movie.runtime}
                budget={movie.budget}
                revenue={movie.revenue}

            />
            <Grid className="p-4 max-w-7xl m-auto" title="Actors">
                {
                    cast.map(actor => (
                        <Card
                            key={actor.credit_id}
                            imgUrl={actor.profile_path ? IMAGE_BASE_URL + BACKDROP_SIZE + actor.profile_path : '/no_image.jpg'}
                            title={actor.name}
                            subtitle={actor.character}
                        />

                    ))
                }
            </Grid>
        </main>
    )
}

export default SingleMovie


export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params?.id as string

    const movieEndpoint: string = movieUrl(id)
    const creditEndpoint: string = creditsUrl(id)

    const movie = await basicFetch<Movie>(movieEndpoint)
    const credits = await basicFetch<Credits>(creditEndpoint)

    const directors = credits.crew.filter(member => member.job === 'Director')


    return {
        props: {
            movie,
            directors,
            cast: credits.cast
        },

        revalidate: 60 * 60 * 24  // re-build page after every 24 hours
    }
}

