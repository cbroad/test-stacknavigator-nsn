import { StyleSheet, View } from 'react-native';
import useTheme from '~src/theme/useTheme';
import { ReactNode } from 'react';

const SubPageLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      flexDirection: 'column',
    },
    rowWrapper: {
      flex: 1,
      flexGrow: 1,
      flexDirection: 'row',
    },
    content: {
      flex: 1,
      backgroundColor: theme.colors.background,
      flexDirection: 'column',
    },
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.rowWrapper}>
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
};

export default SubPageLayout;
