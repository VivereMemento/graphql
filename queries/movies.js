const {
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');

const { DirectorsType, directorsMap } = require('./directors');

const { createMap } = require('../utils');

const movies = [
    {id: '1', name: 'Pulp fiction', genre: 'Crime', directorId: '1'},
    {id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2'},
    {id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId: '3'},
    {id: '4', name: 'Reservoir Dogs', genre: 'Crime', directorId: '1'},
    {id: '5', name: 'The Hateful Eight', genre: 'Crime', directorId: '1'},
    {id: '6', name: 'Inglourious Basterds', genre: 'Crime', directorId: '1'},
    {id: '7', name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId: '4'},
    {id: '8', name: 'Snatch', genre: 'Crime-Comedy', directorId: '4'},
];
const moviesMap = new Map();
createMap(movies, moviesMap);

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorsType,
            resolve: (parent) => {
                return directorsMap.get(parent.id);
            },
        }
    }),
});

module.exports = {
    MovieType,
    movies,
    moviesMap,
    movie: {
        type: MovieType,
        args: { id: { type: GraphQLString } },
        resolve: (parent, args) => {
            return moviesMap.get(args.id);
        },
    }
};