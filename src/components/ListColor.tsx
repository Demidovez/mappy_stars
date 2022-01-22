import React, {useMemo} from "react";
import {ScrollView, View} from "react-native";
import {useAppSelector} from "../hooks";
import ItemColorPicker from "./ItemColorPicker";
import ItemColor from "./ItemColor";
import {Selectors} from "../redux/selectors/selectors";

interface IProps {
  currentColor: string;
  enabled?: boolean;
  onPress: (color: string) => {};
}

function ListColor({currentColor, enabled = true, onPress}: IProps) {
  // console.log("ListColor", currentColor);

  const colors = useAppSelector(Selectors.getColors);

  const styleContainer = useMemo(
    () => ({opacity: enabled ? 1 : 0.5}),
    [enabled],
  );
  const data = useMemo(() => ["", ...colors], [colors]);

  const items = useMemo(
    () =>
      data.map((item, index) => {
        if (index === 0) {
          return (
            <ItemColorPicker
              currentColor={currentColor}
              onPress={onPress}
              key="first"
            />
          );
        } else {
          return (
            <ItemColor
              enabled={enabled}
              color={item}
              onPress={onPress}
              isActive={currentColor === item}
              isWhite={item.toLowerCase() === "#ffffff"}
              key={item}
            />
          );
        }
      }),
    [data, enabled, currentColor, onPress],
  );

  return (
    <View style={styleContainer}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {items}
      </ScrollView>
    </View>
  );
}

export default React.memo(ListColor);
