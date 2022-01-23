import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ControllersTabs from '../components/ControllersTabs';
import {useAppDispatch, useAppSelector} from '../hooks';
import {IController, TemplateComponents} from '../types/types';
import {Routes} from '../navigation/routes';
import {TAnothersStackScreenProps} from '../navigation/anothersNavigator';
import {Selectors} from '../redux/selectors/selectors';
import Delay from '../components/Delay';
import ArrowBack from '../components/ArrowBack';
import initTemplate from '../helper/initTemplate';

function Template(props: TAnothersStackScreenProps<Routes.Template>) {
  // console.log("Template");

  const {template} = props.route.params;

  const dispatch = useAppDispatch();
  const allControllers = useAppSelector(Selectors.getControllers);

  const [controllers, setControllers] = useState<IController[]>([]);

  // Определяем текущий шаблон
  useEffect(() => {
    //Инициализируем шаблон первоначальными данными
    template && initTemplate(template, dispatch);
  }, [template]);

  // Определяем текущие контроллеры шаблона
  useEffect(() => {
    if (allControllers.length) {
      const namesControllers = template.controllers;

      namesControllers.map(name => console.log(name));

      const controllers =
        namesControllers &&
        allControllers.filter(
          (controller: IController) =>
            namesControllers.indexOf(controller.key) !== -1,
        );

      setControllers(controllers || []);
    }
  }, [template, allControllers]);

  // Определяем компонент шаблона
  const Template = useMemo(() => {
    if (template) {
      const Template = TemplateComponents[template.templateComponent];

      return () => <Template />;
    } else {
      return () => <View />;
    }
  }, [template]);

  return (
    <View style={styles.container}>
      <ArrowBack />
      <View style={styles.content}>
        <Delay>
          <Template />
        </Delay>
        {controllers.length > 0 && (
          <ControllersTabs controllers={controllers} />
        )}
      </View>
    </View>
  );
}

export default React.memo(Template);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
