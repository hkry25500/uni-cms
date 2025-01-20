import { char, datetime, float, int, longtext, mysqlEnum, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";


export const usersTable = mysqlTable('users', {
    uid: int().autoincrement().primaryKey(),
    email: varchar({ length: 255 }).notNull().unique(),
    name: varchar({ length: 255 }).notNull(),
    password: char({ length: 255 }).notNull(),
    avatar: longtext()
});

export const moviesTable = mysqlTable('movies', {
    id: varchar('id', { length: 255 }).unique(),
    type: mysqlEnum('type', ['movie', 'series', 'episode']).notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    rating: float('rating').notNull(),
    classification: mysqlEnum('classification', ['G', 'PG', 'PG-13', 'R', 'NC-17']).notNull(),
    description: text('description').notNull(),
    casts: longtext('casts').notNull(),
    director: longtext('director').notNull(),
    writers: longtext('writers').notNull(),
    poster: longtext('poster').notNull(),
    source: longtext('source').notNull(),
    stream: longtext('stream').notNull(),
    tracks: longtext('tracks').notNull(),
});

export const commentsTable = mysqlTable('comments', {
    movieId: varchar('movie_id', { length: 255 }).notNull(),
    userId: int('user_id').notNull(),
    content: text('content').notNull(),
    createdAt: datetime('created_at').notNull(),
});
