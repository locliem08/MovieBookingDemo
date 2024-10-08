import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../../hooks/hooksRedux';
import MovieList from '../../components/MovieList';
import EmptyListMessage from '../../components/EmptyListMessage';

const FavoritesScreen: React.FC = () => {
  const favorites = useAppSelector(state => state.favorites.favorites);

  return (
    <View style={styles.container}>
      <MovieList
        movies={favorites}
        ListEmptyComponent={<EmptyListMessage message="Không có phim yêu thích nào." />} />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
