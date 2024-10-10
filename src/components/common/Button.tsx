import React from 'react';
import {
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { COLORS } from '@utils/styles';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  testID,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled ? styles.buttonDisabled : styles.buttonActive,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: COLORS.active, // Màu xanh cho nút hoạt động
  },
  buttonDisabled: {
    backgroundColor: COLORS.disabled, // Màu xám cho nút bị vô hiệu hóa
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default React.memo(Button);
