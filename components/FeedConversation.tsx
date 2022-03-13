import { useNavigation } from '@react-navigation/native'
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { ImagePlaceholder } from './ImagePlaceholder'
// import { useStore } from 'lib/store'
// import { Conversation } from 'lib/types'
// import { images } from 'lib/images'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import FacePile from './FacePile'
// import { SELECTIONS_ENUM } from 'lib/enums'
const IS_WEB = true
// import { IS_WEB } from 'lib/constants'
import { CommentAction, Tip } from './Button/Actions'
import { ConversationImage } from './ConversationImage'
import { images } from '../lib/images'

interface FeedConversationProps {
  conversation: any
  onSelection?: (value: string) => void
  isConversation?: boolean
  style?: ViewStyle
}

export const FeedConversation = ({
  conversation,
  onSelection = () => {},
  isConversation,
  style,
}: FeedConversationProps) => {
  const { navigate } = useNavigation()
  const setActiveConversation = () => {}

  const goToConversation = () => {
    console.log('placeholder')
    // setActiveConversation(conversation)

    // navigate('ConversationScreen', {
    //   id: conversation.id,
    // })
  }

  return (
    <Pressable style={{ marginBottom: 40, ...style }} onPress={() => goToConversation()}>
      <>
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 10 }}>
          {conversation.userPicture ? (
            <Image
              source={conversation.userPicture as ImageSourcePropType}
              style={{ width: 45, height: 45, borderRadius: 22.5 }}
              resizeMode='cover'
            />
          ) : (
            <ImagePlaceholder size={[45, 45]} round />
          )}
          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 4 }}>
              {conversation.username}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#666', marginRight: 16 }}>{conversation.time}</Text>
              <FontAwesome5
                name='user-friends'
                color='#C8C7CC'
                size={14}
                style={{ marginTop: 1 }}
              />
              <Text style={{ marginLeft: 3, color: '#666' }}>{conversation.communityName}</Text>
            </View>
          </View>
        </View>

        {conversation.picture ? (
          <View>
            <ConversationImage conversation={conversation} />

            {isConversation && (
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 15,
                  position: 'absolute',
                  right: 30,
                  top: -20,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: 'grey',
                  borderWidth: 0.5,
                }}
              >
                <TouchableOpacity onPress={() => {}}>
                  <FontAwesome5 name='hand-holding-usd' color='#808080' size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <MaterialCommunityIcons
                    name='comment-text'
                    color='#808080'
                    size={20}
                    style={{ marginLeft: 20, marginTop: 5 }}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <ImagePlaceholder size={[400, 230]} />
        )}

        <Text style={{ paddingHorizontal: 20, marginTop: 15, fontSize: 17, lineHeight: 22 }}>
          {conversation.content}
        </Text>

        {conversation.link && (
          <Text
            style={{
              color: '#0069B9',
              paddingHorizontal: 20,
              marginTop: 15,
              fontSize: 17,
              lineHeight: 22,
            }}
          >
            {conversation.link}
          </Text>
        )}
        {IS_WEB && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              marginTop: 10,
            }}
          >
            <Tip onPress={() => console.log('tip')} />
            <View style={{ width: 10 }}></View>
            <CommentAction onPress={() => console.log('comment')} />
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            marginHorizontal: 20,
            paddingVertical: 6,
            borderColor: '#EFEFF4',
            borderTopWidth: 1,
            borderBottomWidth: 1,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FacePile numFaces={3} faces={FACES} />
            <Text style={{ paddingLeft: 15, color: '#666666' }}>5,234</Text>
            <Image source={images.satsymbol} style={{ marginLeft: 2, width: 15, height: 15 }} />
          </View>
          <View>
            <Text style={{ color: '#666666' }}>4 Comments</Text>
          </View>
        </View>
      </>
    </Pressable>
  )
}

const FACES = [
  {
    id: 0,
    imageUrl: 'https://i.pravatar.cc/150?img=25',
  },
  {
    id: 1,
    imageUrl: 'https://i.pravatar.cc/150?img=38',
  },
  {
    id: 2,
    imageUrl: 'https://i.pravatar.cc/150?img=60',
  },
  {
    id: 3,
    imageUrl: 'https://i.pravatar.cc/150?img=14',
  },
  {
    id: 4,
    imageUrl: 'https://i.pravatar.cc/150?img=41',
  },
]
