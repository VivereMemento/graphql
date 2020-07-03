const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} = require('graphql');

const { MovieType, movies } = require('./movies');

const { createMap } = require('../utils');

const directors = [
    {id: '1', name: 'Quentin Tarantino', age: 55}, // 5ef865c7a665d0ff64d4b2f6
    {id: '2', name: 'Michael Radford', age: 72}, // 5ef865fca665d0ff64d4b2f7
    {id: '3', name: 'James McTeigue', age: 51}, // 5ef86634a665d0ff64d4b2f8
    {id: '4', name: 'Guy Ritchie', genre: 50}, // 5ef86668a665d0ff64d4b2f9
];

const directorsMap = new Map();
createMap(directors, directorsMap);


const DirectorsType = new GraphQLObjectType({
    name: 'Directors',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent) {
                return movies.filter(movie => movie.directorId === parent.id)
            }
        }
    }),
});

module.exports = {
    directorsMap,
    DirectorsType,
    director: {
        type: DirectorsType,
        args: { id: { type: GraphQLString } },
        resolve: (parent, args) => {
            return directorsMap.get(args.id);
        },
    }
};