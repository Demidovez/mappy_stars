import React from 'react';
import {useAppSelector} from '../hooks';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Templates from '../pages/Templates';
import Settings from '../pages/Settings';
import Projects from '../pages/Projects';
import SvgTemplates from '../../assets/icons/templates.svg';
import SvgProjects from '../../assets/icons/projects.svg';
import SvgSettings from '../../assets/icons/settings.svg';
import {Routes} from './routes';
import {Selectors} from '../redux/selectors/selectors';
import {useMemo} from 'react';

export type TTabsStackParamList = {
  [Routes.Templates]: undefined;
  [Routes.Projects]: undefined;
  [Routes.Settings]: undefined;
};

export type TTabsStackScreenProps<Screen extends keyof TTabsStackParamList> =
  NativeStackScreenProps<TTabsStackParamList, Screen>;

const TabsStack = createBottomTabNavigator<TTabsStackParamList>();

export default function Tabs() {
  // console.log("Tabs");

  const theme = useAppSelector(Selectors.getTheme);

  const screenOptions = useMemo(
    () => ({
      headerStyle: {
        backgroundColor: theme.colors.headerBar,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: theme.colors.primary,
      headerTitleStyle: {
        fontFamily: 'Nunito-Bold',
      },
      headerTitleContainerStyle: {
        marginLeft: 24,
      },
      tabBarActiveTintColor: theme.colors.selected,
      tabBarInactiveTintColor: theme.colors.unSelected,
      headerShadowVisible: false,
      tabBarLabel: () => null,
      tabBarStyle: [
        {
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: theme.colors.headerBar,
        },
      ],
    }),
    [theme],
  );

  const optionsTemplates = useMemo(
    () => ({
      title: 'Шаблоны',
      tabBarIcon: ({color, size}: any) => (
        <SvgTemplates width={size} height={size} fill={color} />
      ),
    }),
    [],
  );

  const optionsProjects = useMemo(
    () => ({
      title: 'Мои проекты',
      tabBarIcon: ({color, size}: any) => (
        <SvgProjects width={size} height={size} fill={color} />
      ),
    }),
    [],
  );

  const optionsSettings = useMemo(
    () => ({
      title: 'Настройки',
      tabBarIcon: ({color, size}: any) => (
        <SvgSettings width={size} height={size} fill={color} />
      ),
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <TabsStack.Navigator screenOptions={screenOptions}>
        <TabsStack.Screen
          name={Routes.Templates}
          component={Templates}
          options={optionsTemplates}
        />
        <TabsStack.Screen
          name={Routes.Projects}
          component={Projects}
          options={optionsProjects}
        />
        <TabsStack.Screen
          name={Routes.Settings}
          component={Settings}
          options={optionsSettings}
        />
      </TabsStack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
