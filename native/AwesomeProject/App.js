import React from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Button,
  Text,
  View,
  SectionList
} from 'react-native';
import BlinkRender from './components/blinkRender';

export default function App() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <BlinkRender />

        <Button
          onPress={() => {
            alert('You tapped the button!');
          }}
          title="Press Me"
        />
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>
          hello ScrollViews can be configured to allow paging through views
          using swiping gestures by using the pagingEnabled props. Swiping
          horizontally between views can also be implemented on Android using
          the ViewPager component. On iOS a ScrollView with a single item can be
          used to allow the user to zoom content. Set up the maximumZoomScale
          and minimumZoomScale props and your user will be able to use pinch and
          expand gestures to zoom in and out.
        </Text>
        <Text>
          hello ScrollViews can be configured to allow paging through views
          using swiping gestures by using the pagingEnabled props. Swiping
          horizontally between views can also be implemented on Android using
          the ViewPager component. On iOS a ScrollView with a single item can be
          used to allow the user to zoom content. Set up the maximumZoomScale
          and minimumZoomScale props and your user will be able to use pinch and
          expand gestures to zoom in and out.
        </Text>
        <Text>
          hello ScrollViews can be configured to allow paging through views
          using swiping gestures by using the pagingEnabled props. Swiping
          horizontally between views can also be implemented on Android using
          the ViewPager component. On iOS a ScrollView with a single item can be
          used to allow the user to zoom content. Set up the maximumZoomScale
          and minimumZoomScale props and your user will be able to use pinch and
          expand gestures to zoom in and out.
        </Text>
        <Text>
          hello ScrollViews can be configured to allow paging through views
          using swiping gestures by using the pagingEnabled props. Swiping
          horizontally between views can also be implemented on Android using
          the ViewPager component. On iOS a ScrollView with a single item can be
          used to allow the user to zoom content. Set up the maximumZoomScale
          and minimumZoomScale props and your user will be able to use pinch and
          expand gestures to zoom in and out.
        </Text>
        <SectionList
          sections={[
            { title: 'A', data: ['amit', 'aslia', 'aashish', 'aamir'] },
            { title: 'B', data: ['amit', 'aslia', 'aashish', 'aamir'] }
          ]}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 32
  }
});
