import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Movie } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/hooksRedux';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import Button from './common/Button';
import ImageCus from './common/ImageCus';

interface MovieCardProps {
    movie: Movie;
    isBooked?: boolean;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tabs'>;

const MovieCard: React.FC<MovieCardProps> = ({ movie, isBooked }) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<NavigationProp>();
    const favorites = useAppSelector(state => state.favorites.favorites);
    const isFavorite = favorites.some(fav => fav.id === movie.id);

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavorite(movie.id));
        } else {
            dispatch(addFavorite(movie));
        }
    };

    const handleBook = () => {
        navigation.navigate('Booking', { movieId: movie.id });
    };

    return (
        <TouchableOpacity onPress={handleBook} style={styles.card}>
            <ImageCus uri={movie.thumbnail} style={styles.thumbnail} />
            <View style={styles.info}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.description} numberOfLines={3}>
                    {movie.description}
                </Text>
                <View style={styles.buttons}>
                    <Button
                        title={movie.booked ? 'Đã xem' : 'Đặt vé'}
                        onPress={handleBook}
                        disabled={movie.booked}
                        style={movie.booked ? styles.buttonDisabled : styles.buttonActive}
                    />
                    <Button
                        title="Yêu thích"
                        onPress={handleFavorite}
                        style={isFavorite ? styles.buttonFavorite : styles.buttonActive}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    thumbnail: {
        width: 120,
        height: 150,
        borderRadius: 8,
    },
    info: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        flexWrap: 'wrap',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonActive: {
        backgroundColor: 'blue',
    },
    buttonDisabled: {
        backgroundColor: 'gray',
    },
    buttonFavorite: {
        backgroundColor: 'red',
    },
});

export default React.memo(MovieCard);
