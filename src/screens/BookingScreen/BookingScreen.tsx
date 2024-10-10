import React, { useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/RootNavigator';
import { useAppSelector, useAppDispatch } from '@hooks/hooksRedux';
import { bookMovie } from '@redux/slices/bookedSlice';
import Button from '@components/common/Button';
import ImageCus from '@components/common/ImageCus';
import { COLORS } from '@utils/styles';

type BookingScreenRouteProp = RouteProp<RootStackParamList, 'Booking'>;

const BookingScreen: React.FC = () => {
    const route = useRoute<BookingScreenRouteProp>();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { width } = useWindowDimensions();

    const { movieId } = route.params;
    const movie = useAppSelector(state =>
        state.movies.allMovies.find(m => m.id === movieId)
    );

    const handleConfirmBooking = useCallback(() => {
        if (movie) {
            dispatch(bookMovie(movie));
            navigation.navigate('Tabs', { screen: 'Booked' } as never);
        }
    }, [dispatch, movie, navigation]);

    const thumbnailStyle = useMemo(() => [
        styles.thumbnail,
        { width: width - 32 }
    ], [width]);

    const buttonStyle = useMemo(() =>
        movie?.booked ? styles.buttonDisabled : styles.buttonActive,
        [movie?.booked]);

    if (!movie) {
        return null;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent} testID='BookingScreen'>
            <View style={styles.container}>
                <ImageCus uri={movie.thumbnail} style={thumbnailStyle} />
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.description}>{movie.description}</Text>
                <Button
                    title={movie.booked ? 'Đã xem' : 'Đặt vé'}
                    onPress={handleConfirmBooking}
                    disabled={movie.booked}
                    style={buttonStyle}
                    testID={`ConfirmBookingButton`}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    thumbnail: {
        height: 300,
        borderRadius: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
    },
    buttonActive: {
        backgroundColor: COLORS.active,
    },
    buttonDisabled: {
        backgroundColor: COLORS.disabled,
    },
});

export default React.memo(BookingScreen);
