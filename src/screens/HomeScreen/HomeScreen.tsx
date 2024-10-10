import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TextInput,
    StyleSheet,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '@hooks/hooksRedux';
import { fetchMoviesRequest } from '@redux/slices/moviesSlice';
import Images from '@assets/Images';
import debounce from 'lodash.debounce'; // Sử dụng lodash.debounce cho debounce
import MovieList from '@components/MovieList';
const HomeScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const { allMovies, loading, error } = useAppSelector(state => state.movies);
    const [searchQuery, setSearchQuery] = useState('');

    // Dispatch fetchMoviesRequest khi component mount
    useEffect(() => {
        dispatch(fetchMoviesRequest());
    }, [dispatch]);

    // Hàm xử lý tìm kiếm với debounce
    const handleSearch = useCallback(
        debounce((query: string) => {
            setSearchQuery(query);
        }, 300),
        []
    );

    // Memoize filteredMovies để tránh lọc lại khi không cần thiết
    const filteredMovies = useMemo(() => {
        if (!searchQuery) return allMovies;
        return allMovies.filter(movie =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [allMovies, searchQuery]);

    // Render loading state
    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.statusText}>Đang tải...</Text>
            </View>
        );
    }

    // Render error state
    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.statusText}>Lỗi: {error}</Text>
            </View>
        );
    }
   
    return (
        <ImageBackground
            source={Images.bgrImgApp}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm phim..."
                    placeholderTextColor="#999"
                    onChangeText={handleSearch}
                    returnKeyType="search"
                    clearButtonMode="while-editing"
                    testID='searchInput'
                />
            </View>
            {filteredMovies.length > 0 ? (
                <MovieList 
                    type='movies'
                    movies={filteredMovies} />
            ) : (
                <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>Không tìm thấy phim nào.</Text>
                </View>
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusText: {
        fontSize: 16,
        color: '#333',
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Nền trắng nhẹ cho TextInput
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        fontSize: 16,
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsText: {
        fontSize: 18,
        color: '#666',
    },
});

export default React.memo(HomeScreen);
