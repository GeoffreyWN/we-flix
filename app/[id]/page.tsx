import React, { Suspense } from 'react'
import { movieUrl, creditsUrl, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../../config'

import { Header, Breadcrumb, Actors, Spinner } from '../../components'

import type { Movie, Credits } from '../../api/types'
import MovieInfo from '../../components/MovieInfo'

interface Props {
    params: {
        id: string
    }
}

async function getMovieData(id: string) {
    const movie = await fetch(movieUrl(id))

    return (await movie.json()) as Movie
}

async function getCreditData(id: string) {
    const movie = await fetch(creditsUrl(id))

    return (await movie.json()) as Credits
}

const SingleMovie = async ({ params: { id } }: Props) => {
    const _movie = getMovieData(id)
    const _credits = getCreditData(id)

    const movie = await _movie

    return (
        <main>
            <Header />
            <Breadcrumb title={movie.original_title} />
            <Suspense fallback={<Spinner />} >
                <MovieInfo
                    creditsPromise={_credits}
                    thumbUrl={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : '/no_image.jpg'}
                    rating={movie.vote_average}
                    title={movie.original_title}
                    year={movie.release_date.split('-')[0]}
                    backgroundImgUrl={movie.backdrop_path ? IMAGE_BASE_URL + BACKDROP_SIZE + movie.backdrop_path : '/no_image.jpg'}
                    summary={movie.overview}
                    // directors={directors}
                    time={movie.runtime}
                    budget={movie.budget}
                    revenue={movie.revenue}

                />
                <Actors creditsPromise={_credits} />
            </Suspense>

        </main>
    )
}

export default SingleMovie


// export const getStaticPaths: GetStaticPaths = async () => {
//     return {
//         paths: [],
//         fallback: 'blocking'
//     }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//     const id = params?.id as string

//     const movieEndpoint: string = movieUrl(id)
//     const creditEndpoint: string = creditsUrl(id)

//     const movie = await basicFetch<Movie>(movieEndpoint)
//     const credits = await basicFetch<Credits>(creditEndpoint)

//     const directors = credits.crew.filter(member => member.job === 'Director')


//     return {
//         props: {
//             movie,
//             directors,
//             cast: credits.cast
//         },

//         revalidate: 60 * 60 * 24  // re-build page after every 24 hours
//     }
// }

