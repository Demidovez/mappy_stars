import React, {useEffect} from "react";
import {StyleSheet, Text, View, FlatList} from "react-native";
import {fetchProjectsAction} from "../redux/actions/creators/projectsActionCreators";
import ProjectItem from "../components/ProjectItem";
import {useAppDispatch, useAppSelector} from "../hooks";
import {Selectors} from "../redux/selectors/selectors";

export default function Projects() {
  // console.log("Projects");

  const theme = useAppSelector(Selectors.getTheme);
  const {isLoading, data} = useAppSelector(state => state.projects);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Запрашиваем все проекты из базы данных
    dispatch(fetchProjectsAction());
  }, []);

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {isLoading && <Text>Загрузка</Text>}
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <ProjectItem
            item={item}
            isFirstItem={index === 0}
            key={item.title + index}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
