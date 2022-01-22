import React, {useCallback, useMemo} from "react";
import {StyleSheet, View, FlatList} from "react-native";
import TemplateItem from "../components/TemplateItem";
import {useAppSelector} from "../hooks";
import {Selectors} from "../redux/selectors/selectors";

function Templates() {
  // console.log("Templates");

  const theme = useAppSelector(Selectors.getTheme);
  const templates = useAppSelector(state => state.data.templates);

  const style = useMemo(
    () => [styles.container, {backgroundColor: theme.colors.background}],
    [theme],
  );

  const renderItem = useCallback(
    ({item, index}) => <TemplateItem item={item} isFirstItem={index === 0} />,
    [],
  );

  const keyExtractor = useCallback(item => item.id.toString(), []);

  return (
    <View style={style}>
      <FlatList
        data={templates}
        overScrollMode={"never"}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

export default React.memo(Templates);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
