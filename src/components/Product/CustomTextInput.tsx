import React from 'react';
import { StyleSheet, Text, TextInput, View, TextInputProps } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
    title: string;
    info:string;
    value: string | number;
    onChangeText: (text: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    title,
    info,
    value,
    onChangeText,
    ...props
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}<Text style={styles.info}> {info}</Text></Text>
            <TextInput
                style={styles.input}
                defaultValue={String(value)}
                onChangeText={onChangeText}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 14,
        backgroundColor: '#f9f9f9',
    },
    info: {
        fontWeight: '400',
        color: '#212121'
    }
});

export default CustomTextInput;
