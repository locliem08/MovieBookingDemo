import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieListProps {
    movies: Movie[];
    isBooked?: boolean;
    ListEmptyComponent?: React.ReactElement;
}

const MovieList: React.FC<MovieListProps> = ({ movies, isBooked, ListEmptyComponent }) => {
    const renderItem = React.useCallback(({ item }: { item: Movie }) => (
        <MovieCard movie={item} isBooked={isBooked} />
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
            initialNumToRender={10}
            maxToRenderPerBatch={15}
            windowSize={31}
            removeClippedSubviews={true}
        />
    );
};

const styles = StyleSheet.create({
    // Thêm styles nếu cần
});

export default React.memo(MovieList);
