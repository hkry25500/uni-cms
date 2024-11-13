import { IConfigIMDb } from './interfaces';


export class IMDbConfiguration implements IConfigIMDb
{
    id: string;
    name: string;
    rating: number;
    classification: string;
    description: string;
    director: string | string[];
    writers: string[];
    poster: { source?: string; url: string; };
    source: { url: string; };
    stream: { mp4: { url: string; }; };
    tracks: { subtitle: any; };

    constructor (
        id: string,
        name: string,
        rating: number,
        classification: string,
        description: string,
        director: string | string[],
        writers: string[],
        poster: { source?: string; url: string; },
        source: { url: string },
        stream: { mp4: { url: string }; },
        tracks: { subtitle: any }
    ) {
        this.id = id
        this.name = name
        this.rating = rating
        this.classification = classification
        this.description = description
        this.director = director
        this.writers = writers
        this.poster = poster
        this.source = source
        this.stream = stream
        this.tracks = tracks
    }
}