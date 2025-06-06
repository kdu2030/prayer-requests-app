import color from "color";
import * as React from "react";
import {
  ColorValue,
  GestureResponderEvent,
  PressableAndroidRippleConfig,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";

export type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * The label text of the item.
   */
  label: string;
  /**
   * Icon to display for the `DrawerItem`.
   */
  left?: React.ReactNode;
  /**
   * Whether to highlight the drawer item as active.
   */
  active?: boolean;
  /**
   * Whether the item is disabled.
   */
  disabled?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: (e: GestureResponderEvent) => void;
  /**
   * Type of background drawabale to display the feedback (Android).
   * https://reactnative.dev/docs/pressable#rippleconfig
   */
  background?: PressableAndroidRippleConfig;
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Callback which returns a React element to display on the right side. For instance a Badge.
   */
  right?: (props: { color: string }) => React.ReactNode;
  /**
   * Specifies the largest possible scale a label font can reach.
   */
  labelMaxFontSizeMultiplier?: number;
  /**
   * Color of the ripple effect.
   */
  rippleColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme?: ThemeProp;
};

/**
 * A component used to show an action item with an icon and a label in a navigation drawer.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Drawer } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *    <Drawer.Item
 *      style={{ backgroundColor: '#64ffda' }}
 *      icon="star"
 *      label="First Item"
 *    />
 * );
 *
 * export default MyComponent;
 * ```
 */
export const PrefixDrawerItem = ({
  left,
  label,
  active,
  disabled,

  rippleColor: customRippleColor,
  style,
  onPress,
  background,
  accessibilityLabel,
  right,
  labelMaxFontSizeMultiplier,
  ...rest
}: Props) => {
  const theme = useTheme();
  const { roundness, isV3 } = theme;

  const backgroundColor = active
    ? isV3
      ? theme.colors.secondaryContainer
      : color(theme.colors.primary).alpha(0.12).rgb().string()
    : undefined;
  const contentColor = theme.colors.onSurfaceVariant;

  const labelMargin = left ? (isV3 ? 12 : 32) : 0;
  const borderRadius = (isV3 ? 7 : 1) * roundness;
  const rippleColor = isV3
    ? color(contentColor).alpha(0.12).rgb().string()
    : undefined;
  const font = theme.fonts.labelLarge;

  return (
    <View {...rest}>
      <TouchableRipple
        borderless
        disabled={disabled}
        background={background}
        onPress={onPress}
        style={[
          styles.container,
          { backgroundColor, borderRadius },
          isV3 && styles.v3Container,
          style,
        ]}
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
        accessibilityLabel={accessibilityLabel}
        rippleColor={customRippleColor || rippleColor}
        theme={theme}
      >
        <View style={[styles.wrapper, isV3 && styles.v3Wrapper]}>
          <View style={styles.content}>
            {left}
            <Text
              variant="labelLarge"
              selectable={false}
              numberOfLines={1}
              style={[
                styles.label,
                {
                  color: contentColor,
                  marginLeft: labelMargin,
                  ...font,
                },
              ]}
              maxFontSizeMultiplier={labelMaxFontSizeMultiplier}
            >
              {label}
            </Text>
          </View>

          {right?.({ color: contentColor })}
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 4,
  },
  v3Container: {
    justifyContent: "center",
    height: 56,
    marginLeft: 12,
    marginRight: 12,
    marginVertical: 0,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  v3Wrapper: {
    marginLeft: 16,
    marginRight: 24,
    padding: 0,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginRight: 32,
  },
});
