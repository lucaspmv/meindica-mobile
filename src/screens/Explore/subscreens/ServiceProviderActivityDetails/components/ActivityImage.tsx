import { Image, Modal, Pressable } from 'native-base';
import { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

interface ActivityImageProps {
  base64: string;
}

const ActivityImage: React.FC<ActivityImageProps> = ({ base64 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setIsModalOpen(true)}
        _pressed={{
          opacity: 0.8,
        }}
      >
        <Image
          alt="Service Image"
          source={{ uri: base64 }}
          resizeMode="contain"
          w={RFValue(93)}
          h={RFValue(65)}
          borderRadius={RFValue(8)}
        />
      </Pressable>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Pressable
          position="absolute"
          w="100%"
          h="100%"
          onPress={() => setIsModalOpen(false)}
          zIndex={1}
        />
        <Image
          w="85%"
          h="80%"
          source={{ uri: base64 }}
          resizeMode="contain"
          alt="Expanded Service Image"
        />
      </Modal>
    </>
  );
};

export { ActivityImage };
