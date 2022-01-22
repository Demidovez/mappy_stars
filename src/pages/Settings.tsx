import React, {useCallback} from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Linking,
  Share,
  FlatList,
} from "react-native";
import {RectButton} from "react-native-gesture-handler";
import SvgProblem from "../../assets/icons/problem.svg";
import SvgShare from "../../assets/icons/share.svg";
import SvgReview from "../../assets/icons/review.svg";
import SvgPolicy from "../../assets/icons/policy.svg";
import SvgTelegram from "../../assets/icons/telegram.svg";
import Style from "../style/Light";
import {useAppSelector} from "../hooks";
import {Routes} from "../navigation/routes";
import * as RootNavigation from "../navigation/rootNavigation";

interface ILinks {
  id: number;
  text: string;
  type: string;
  icon: React.FC;
}

const links: ILinks[] = [
  {
    id: 1,
    text: "Сообщить о проблеме",
    type: "has_problem",
    icon: SvgProblem,
  },
  {
    id: 2,
    text: "Поделиться с друзьями",
    type: "share",
    icon: SvgShare,
  },
  {
    id: 3,
    text: "Оставить отзыв",
    type: "review",
    icon: SvgReview,
  },
  {
    id: 4,
    text: "Политика конфиденциальности",
    type: "policy",
    icon: SvgPolicy,
  },
  {
    id: 5,
    text: "Наш телеграм",
    type: "telegram",
    icon: SvgTelegram,
  },
];

export default function Settings() {
  // console.log("Settings");

  const settings = useAppSelector(state => state.settings);

  const getIcon = (
    Icon: React.FC<{width: number; height: number; fill: string}>, // TODO: Тип из svg
  ) => <Icon width={25} height={25} fill={settings.theme.colors.primary} />;

  const onShare = async () => {
    try {
      const linkToApp =
        Platform.OS === "ios"
          ? settings.link_share_store
          : settings.link_share_market;

      Share.share(
        {
          title: settings.app_name,
          message: settings.share_message + linkToApp,
          url: linkToApp,
        },
        {dialogTitle: settings.app_name},
      );
    } catch (error: any) {
      new Error(error);
    }
  };

  const onModalSendProblem = useCallback(() => {
    RootNavigation.navigate(Routes.Modals, {
      screen: Routes.ModalSendProblem,
    });
  }, []);

  const onPressItem = (type: string) => {
    switch (type) {
      case "has_problem":
        onModalSendProblem();
        break;
      case "share":
        onShare();
        break;
      case "review": {
        const link =
          Platform.OS === "ios"
            ? settings.link_app_store
            : settings.link_app_market;

        Linking.openURL(link);
        break;
      }
      case "policy": {
        Linking.openURL(settings.link_policy);
        break;
      }
      case "telegram": {
        Linking.openURL(settings.link_telegram);
        break;
      }
      default:
        return;
    }
  };

  // TODO: Ripple эффект не будет работать на iOS
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: settings.theme.colors.backgroundSettings},
      ]}>
      <FlatList
        data={links}
        renderItem={({item}) => (
          <RectButton
            onPress={() => onPressItem(item.type)}
            rippleColor={settings.theme.colors.backgroundItem}>
            <View style={styles.item}>
              {getIcon(item.icon)}
              <Text style={styles.item_text}>{item.text}</Text>
            </View>
          </RectButton>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 24,
  },
  button: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 24,
    paddingRight: 24,
  },
  item_text: {
    ...Style.font_bold,
    fontSize: 15,
    paddingLeft: 15,
  },
});
