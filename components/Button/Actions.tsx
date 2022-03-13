import { StyleSheet, TouchableOpacity, Text, Image, GestureResponderEvent } from 'react-native'
import { IosIcon, AndroidIcon, CloseIcon, PhotoIcon, VideoIcon } from '../Icons'
import { images } from '../../lib/images'

interface ActionProps {
  onPress: (e: GestureResponderEvent) => void
}

export const Tip = ({ onPress }: ActionProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ position: 'relative', width: 35, height: 35 }}>
      <Image
        source={images.tip2}
        style={{ width: 26, height: 26, position: 'absolute', top: -6, right: -4 }}
        resizeMode='contain'
      />
      <Image
        source={images.tip}
        style={{ width: 34, height: 30, position: 'absolute', bottom: -3 }}
        resizeMode='contain'
      />
    </TouchableOpacity>
  )
}

export const CommentAction = ({ onPress }: ActionProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginHorizontal: 16 }}>
      <Image source={images.comment} style={{ width: 26, height: 26 }} resizeMode='contain' />
    </TouchableOpacity>
  )
}

export const Share = ({ onPress }: ActionProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={images.share} style={{ width: 26, height: 26 }} resizeMode='contain' />
    </TouchableOpacity>
  )
}

export const Ios = ({ onPress }: ActionProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#efeff4',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
      }}
    >
      <IosIcon />
      <Text style={{ paddingLeft: 6 }}>App Store</Text>
    </TouchableOpacity>
  )
}

export const Android = ({ onPress }: ActionProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#efeff4',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
      }}
    >
      <AndroidIcon />
      <Text style={{ paddingLeft: 6 }}>Google Play</Text>
    </TouchableOpacity>
  )
}

export const Close = ({ onPress }: ActionProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <CloseIcon color='#111' />
    </TouchableOpacity>
  )
}

export const PhotoAction = ({ onPress }: ActionProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.photoBtn}>
      <PhotoIcon color='#8a8a8f' />
    </TouchableOpacity>
  )
}

export const VideoAction = ({ onPress }: ActionProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.photoBtn}>
      <VideoIcon color='#8a8a8f' />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  photoBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: '#efeff4',
    borderWidth: 1,
  },
})
