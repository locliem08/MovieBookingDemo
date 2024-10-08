import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../../hooks/hooksRedux';
import MovieList from '../../components/MovieList';
import EmptyListMessage from '../../components/EmptyListMessage';

const BookedScreen: React.FC = () => {
  const booked = useAppSelector(state => state.booked.booked);

  return (
    <View style={styles.container}>
      <MovieList
        movies={booked}
        isBooked={true}
        ListEmptyComponent={<EmptyListMessage message="Không có phim nào đã đặt vé." />} />
    </View>
  );
};

export default BookedScreen;

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
