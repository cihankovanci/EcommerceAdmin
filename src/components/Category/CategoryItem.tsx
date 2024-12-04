import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Colors, SCREEN_WIDTH} from '../../constants/styles';

type CategoryItemProps = {
  name: string;
  imageUrl?: string | null;
  onPress: () => void;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  name,
  imageUrl,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {imageUrl ? (
        <Image source={{uri: `https:${imageUrl}`}} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: SCREEN_WIDTH,
    backgroundColor: Colors.white,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CategoryItem;
