import { StyleSheet, View } from 'react-native';
import ChannelSearchList from '~src/components/channels/ChannelSearchList';
import MainLayout from '~src/layout/MainLayout';

const SearchScreen = () => {
  

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      flexDirection: 'column',
    },
    searchbar: {
      flexGrow: 1,
      marginHorizontal: 20,
    },
  });

  return (
    <MainLayout>
      <ChannelSearchList />
    </MainLayout>
  );
};

export default SearchScreen;
