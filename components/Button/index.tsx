import React from 'react'
import { Button as PaperButton } from 'react-native-paper'

export default function Button(props: any) {
  let {
    pushable,
    mode,
    label,
    accessibilityLabel,
    color = '#fff',
    borderColor = color,
    style,
    round,
    fs,
    fw,
    h,
    w,
    tf,
    labelStyle,
    loading,
    disabled,
    onPress,
    dark,
    icon,
    children,
    size,
    ph,
  } = props

  let defaultFs = 13
  let defaultHeight = 45
  let defaultFw = '500'

  if (size === 'large') {
    defaultFs = 16
    defaultHeight = 50
  } else if (size === 'small') {
    defaultHeight = 35
  } else {
    // medium size
    defaultHeight = 45
  }

  const height = h ? h : defaultHeight
  const fontSize = fs ? fs : defaultFs
  const fontWeight = fw ? fw : defaultFw
  const borderRadius = round === 0 ? 0 : round ? round : 25

  return (
    <PaperButton
      mode={mode}
      accessibilityLabel={accessibilityLabel}
      loading={loading}
      disabled={disabled}
      onPress={!pushable && onPress}
      style={{ borderRadius, width: w, borderColor: borderColor, ...style }}
      labelStyle={{
        ...labelStyle,
        fontSize,
        fontWeight,
        textTransform: 'capitalize',
        letterSpacing: 0,
        // padding: 10,
        // textTransform: tf ? tf : 'uppercase',
      }}
      contentStyle={{ height, paddingHorizontal: ph }}
      dark={dark}
      icon={icon}
      color={color}
    >
      {children || label}
    </PaperButton>
  )
}

Button.defaultProps = {
  mode: 'contained',
  size: 'medium',
}
