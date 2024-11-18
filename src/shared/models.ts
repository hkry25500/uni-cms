<<<<<<< HEAD
import { IConfigIMDb, ITrackConfig } from './interfaces';
=======
import { IConfigIMDb } from './interfaces';
>>>>>>> 73c1c7f7a1fd44c26c0c4865207c1ce189abe1b3


export class IMDbConfiguration implements IConfigIMDb
{
<<<<<<< HEAD
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
    stream: { mp4: { url: string; }; }
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
=======
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
>>>>>>> 73c1c7f7a1fd44c26c0c4865207c1ce189abe1b3
        writers: string[],
        poster: { source?: string; url: string; },
        source: { url: string },
        stream: { mp4: { url: string }; },
<<<<<<< HEAD
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
=======
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
>>>>>>> 73c1c7f7a1fd44c26c0c4865207c1ce189abe1b3
    }
}