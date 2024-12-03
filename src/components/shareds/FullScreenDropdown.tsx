import React, { FC, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    SafeAreaView,
    Dimensions,
    StyleSheet,
} from 'react-native';


import { Colors, FontSize, FontWeight, SCREEN_WIDTH, Spacing } from '../../constants/styles';

type DropdownDataItemProps = {
    label: string;
    value: number;
};

type DropdownProps = {
    placeholer: string;
    value: DropdownDataItemProps;
    data: Array<DropdownDataItemProps>;
    onSelect: (value: DropdownDataItemProps) => void;
    children: React.ReactNode;
};


const FullScreenDropDown: FC<DropdownProps> = props => {
    const [modalShow, setModalShow] = useState(false);

    const handleSelectItem = (item: DropdownDataItemProps) => {
        setModalShow(false);
        props.onSelect(item);
    };

    const handleButtonClick = () => {
        setModalShow(true);
    };

    const RenderListItem = ({ item }: { item: DropdownDataItemProps }) => {
        const isSelected = props.value?.value === item.value;

        return (
            <TouchableOpacity
                onPress={() => handleSelectItem(item)}
                style={[
                    styles.listItem,
                    isSelected && styles.selectedItem,
                ]}>
                <Text
                    style={[styles.listItemLabel, isSelected && styles.selectedItemText]}>
                    {item.label}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <TouchableOpacity style={{ marginBottom: 15 }} onPress={handleButtonClick}>
                {props.children}
            </TouchableOpacity>
            <Modal visible={modalShow} animationType="slide">
                <SafeAreaView style={{ flex: 1, }}>
                    <Text style={[styles.modalTitle]}>{props.placeholer}</Text>
                    <FlatList
                        style={{ flex: 1 }}
                        data={props.data || []}
                        renderItem={RenderListItem}
                    />
                </SafeAreaView>
            </Modal>
        </>
    );
};

export default FullScreenDropDown;

export const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        height: SCREEN_WIDTH * 0.15,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        backgroundColor: '#FFF',
    },
    selectedItem: {
        backgroundColor: Colors.primary,
    },
    selectedItemText: {
        color: Colors.white,
        fontSize: FontSize.md,
        fontWeight: FontWeight.md,
    },
    listItemLabel: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.md,

        paddingLeft: Spacing.md,
    },
    modalTitle: {
        fontSize: FontSize.xl,
        fontWeight: FontWeight.md,
        color: Colors.black,
        paddingLeft: Spacing.md,
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
});
