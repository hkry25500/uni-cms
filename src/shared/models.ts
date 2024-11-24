import { IConfigIMDb, ITrackConfig } from './interfaces';


export class IMDbConfiguration implements IConfigIMDb
{
    id: string
    type: number
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

    constructor (
        id: string,
        type: number,
        title: string,
        category: string,
        rating: number,
        classification: string,
        interests: string[],
        description: string,
        casts: any[],
        director: string[],
        writers: string[],
        poster: { source?: string; url: string; },
        source: { url: string; },
        stream: { url: string; },
        tracks: ITrackConfig[]
    ) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.category = category;
        this.rating = rating;
        this.classification = classification;
        this.interests = interests;
        this.description = description;
        this.casts = casts;
        this.director = director;
        this.writers = writers;
        this.poster = poster;
        this.source = source;
        this.stream = stream;
        this.tracks = tracks;
    }
}