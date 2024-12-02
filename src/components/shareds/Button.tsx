import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'



interface ButtonProps {
    title: string;
    onPress: () => void
}
const Button: React.FC<ButtonProps> = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        backgroundColor: '#2b71fa',
        paddingHorizontal: 16,
        margin: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFFFFF'
    }
})