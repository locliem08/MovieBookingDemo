import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieListProps {
    movies: Movie[];
    isBooked?: boolean;
    type: 'movies' | 'favorite' | 'booked';
    ListEmptyComponent?: React.ReactElement;
}

const MovieList: React.FC<MovieListProps> = ({ movies, isBooked, ListEmptyComponent, type }) => {
    const renderItem = React.useCallback(({ item, index }: { item: Movie, index: number }) => (
        <MovieCard movie={item} index={index} type={type} isBooked={isBooked} />
    ), []);

    return (
        <FlatList
            data={movies}
            renderItem={renderItem}
            ListEmptyComponent={ListEmptyComponent}
            keyExtractor={item => item.id.toString()}
            getItemLayout={(data, index) => (
                { length: 170, offset: 170 * index, index }
            )}
            initialNumToRender={6}
            maxToRenderPerBatch={12}
            windowSize={22}
            testID={`MovieList-${type}`}
            removeClippedSubviews={true}
        />
    );
};

const styles = StyleSheet.create({
    // Thêm styles nếu cần
});

export default React.memo(MovieList);
