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
    type: string
    title: string
    category: string
    rating: number
    classification: string
    interests: string[]
    description: string
    casts: any[]
    director: string[]
    writers: string[]
    poster: { source?: string; url: string; }
    source: { url: string; }
    stream: { url: string; }
    tracks: ITrackConfig[]
}

export interface ITrackConfig {
    kind: string
    src: string
    srcLang: string
    label: string
    default?: boolean
}