import React from 'react';
import { Query } from 'react-apollo';
import { moviesQuery } from '../queries';

const Movies = () => {
    return (
        <Query query={moviesQuery}>
            {
                ({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div>Error :(</div>;

                    return (
                        <ul>
                            {
                                data.movies && data.movies.map(movie => (
                                    <li key={movie.id}>{movie.name}</li>
                                ))
                            }
                        </ul>
                    )
                }
            }
        </Query>
    )
}

export default Movies;