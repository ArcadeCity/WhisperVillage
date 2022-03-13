import { Text, View } from 'react-native'

interface ImagePlaceholderProps {
  round?: boolean
  borderRadius?: number
  text?: string
  size: number[]
}

export const ImagePlaceholder = (props: ImagePlaceholderProps) => {
  const round = props.round
  const width = props.size[0]
  const height = props.size[1]
  const givenBorderRadius = props.borderRadius ?? 0
  const borderRadius = round ? width / 2 : givenBorderRadius
  const text = props.text ?? `${width} x ${height}`
  const textColor = props.text ? 'black' : '#8A8A8F'
  return (
    <View
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#c8c7cc',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: textColor, fontSize: 14 }}>{text}</Text>
    </View>
  )
}
