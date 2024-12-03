import React from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import DeleteIcon from '../../assets/Icons/DeleteIcon';

type SwipeToDeleteProps<T> = {
  data: T[];
  renderItem: ({item}: {item: T}) => React.ReactElement;
  onDelete: (key: string) => void;
};

const SwipeToDelete = <T extends {key: string}>({
  data,
  renderItem,
  onDelete,
}: SwipeToDeleteProps<T>) => {
  const rowTranslateAnimatedValues: {[key: string]: Animated.Value} = {};

  data.forEach(item => {
    rowTranslateAnimatedValues[item.key] = new Animated.Value(1);
  });

  let animationIsRunning = false;

  const onSwipeValueChange = (swipeData: {key: string; value: number}) => {
    const {key, value} = swipeData;
    if (value < -Dimensions.get('window').width && !animationIsRunning) {
      animationIsRunning = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        onDelete(key);
        animationIsRunning = false;
      });
    }
  };

  return (
    <SwipeListView
      disableRightSwipe
      data={data}
      renderItem={renderItem}
      renderHiddenItem={() => (
        <View style={styles.rowBack}>
          <DeleteIcon />
        </View>
      )}
      rightOpenValue={-Dimensions.get('window').width}
      onSwipeValueChange={onSwipeValueChange}
      useNativeDriver={false}
    />
  );
};

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    // backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default SwipeToDelete;