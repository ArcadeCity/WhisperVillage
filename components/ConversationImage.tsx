import { Image, ImageSourcePropType, View } from 'react-native'

// import { Conversation, WebViewStyle } from 'lib/types'
import { ImagePlaceholder } from './ImagePlaceholder'
// import { IS_WEB } from 'lib/constants'
const IS_WEB = true

export const ConversationImage = ({ conversation }: { conversation: any }) => {
  return (
    <>
      {conversation.picture ? (
        <>
          {IS_WEB ? (
            <View
              style={
                {
                  position: 'relative',
                  filter: 'brightness(.975)',
                  backgroundColor: '#fff',
                } as any
              }
            >
              <Image
                source={conversation.picture as ImageSourcePropType}
                style={{
                  width: '100%',
                  height: '100%',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  flexGrow: 1,
                  paddingBottom: '52%',
                }}
                resizeMode='cover'
              />
            </View>
          ) : (
            <Image
              source={conversation.picture as ImageSourcePropType}
              style={{ width: 400, height: 230 }}
              resizeMode='cover'
            />
          )}
        </>
      ) : (
        <ImagePlaceholder size={[400, 230]} />
      )}
    </>
  )
}
