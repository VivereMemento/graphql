const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');
const mongoose = require('mongoose');

const moviesSchema = require('../models/movies');
const directorsSchema = require('../models/directors');
const Movie = mongoose.model('Movie', moviesSchema);
const Director = mongoose.model('Director', directorsSchema);

// const { movie, movies, moviesMap, MovieType } = require('../queries/movies');
// const { directorsMap, director, DirectorsType } = require('../queries/directors');

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve: (parent) => {
                // return directorsMap.get(parent.id);
                return Director.findById(parent.directorId);
            },
        }
    }),
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent) {
                // return movies.filter(movie => movie.directorId === parent.id)
                return Movie.find({ directorId: parent.id })
            }
        }
    }),
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMovie: {
            type: MovieType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                genre: { type: GraphQLNonNull(GraphQLString) },
                directorId: { type: GraphQLString },
            },
            resolve(parent, args) {
                const movie = new Movie({
                    name: args.name,
                    genre: args.genre,
                    directorId: args.directorId,
                });

                return movie.save();
            }
        },
        removeMovie: {
            type: MovieType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return Movie.findByIdAndDelete(args.id);
            }
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLString },
                name: { type: GraphQLNonNull(GraphQLString) },
                genre: { type: GraphQLNonNull(GraphQLString) },
                directorId: { type: GraphQLString },
            },
            resolve(parent, args) {
                return Movie.findByIdAndUpdate(
                    args.id,
                    { $set: { name: args.name, genre: args.genre, directorId: args.directorId } },
                    { new: true }
                );
            }
        },
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                const director = new Director({
                    name: args.name,
                    age: args.age,
                });

                return director.save();
            }
        },
        removeDirector: {
            type: DirectorType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return Director.findByIdAndDelete(args.id);
            }
        },
        updateDirector: {
            type: DirectorType,
            args: {
                id: { type: GraphQLString },
                name: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                return Director.findByIdAndUpdate(
                    args.id,
                    { $set: { name: args.name, age: args.age } },
                    { new: true }
                );
            }
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        // movie,
        // director,
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLString } },
            resolve: (parent, args) => {
                // return moviesMap.get(args.id);
                return Movie.findById(args.id);
            },
        },
        movies: {
            type:  new GraphQLList(MovieType),
            resolve: (parent, args) => {
                // return moviesMap.get(args.id);
                return Movie.find({});
            },
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLString } },
            resolve: (parent, args) => {
                // return directorsMap.get(args.id);
                return Director.findById(args.id);
            },
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve: (parent, args) => {
                // return directorsMap.get(args.id);
                return Director.find({});
            },
        }
    },
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});