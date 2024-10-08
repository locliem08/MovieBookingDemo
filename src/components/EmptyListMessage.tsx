import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyListMessageProps {
    message: string;
}

const EmptyListMessage: React.FC<EmptyListMessageProps> = ({ message }) => (
    <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{message}</Text>
    </View>
);

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        marginVertical: 20,
        fontSize: 16,
        color: '#666',
    },
});

export default EmptyListMessage;