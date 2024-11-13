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
    name: string
    rating: number
    classification: string
    description: string
    director: string | string[]
    writers: string[]
    poster: { source?: string; url: string; }
    source: { url: string; }
    stream: { mp4: { url: string; } }
    tracks: { subtitle: any; }
}