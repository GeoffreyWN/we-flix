export interface Movie  {
    backdrop_path: string,
    id: number,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    title: string,
    voter_average: number,
    voter_count: number,
    budget: number,
    runtime: number,
    revenue: number,
    release_date: number
}

export interface Movies  {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number,
}

export interface Credits  {
    id: number,
    cast: Cast[],
    crew: Crew[],
}

export interface Cast  {
    character: string,
    credit_id: string,
    name: string,
    profile_path: string,
}

export interface Crew  {
    job: string,
    credit_id: string,
    name: string,
}
