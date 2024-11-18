import { NodeCacheType } from "./enums"


export interface IMovieParams
{
    quality?: string
}

export interface INodeCacheObject
{
    type: NodeCacheType,
    value: any
}

export interface IConfigIMDb
{
    id: string
<<<<<<< HEAD
    type: number
    title: string
    category: string
    rating: number
    classification: string
    interests: string[]
    description: string
    casts: any[]
    director: string[]
=======
    name: string
    rating: number
    classification: string
    description: string
    director: string | string[]
>>>>>>> 73c1c7f7a1fd44c26c0c4865207c1ce189abe1b3
    writers: string[]
    poster: { source?: string; url: string; }
    source: { url: string; }
    stream: { mp4: { url: string; } }
<<<<<<< HEAD
    tracks: ITrackConfig[]
}

export interface ITrackConfig {
    kind: string
    src: string
    srcLang: string
    label: string
    default?: boolean
=======
    tracks: { subtitle: any; }
>>>>>>> 73c1c7f7a1fd44c26c0c4865207c1ce189abe1b3
}