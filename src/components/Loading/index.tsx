import { Center, Spinner } from 'native-base';
import React from 'react';

const Loading: React.FC = () => {
  return (
    <Center flex={1}>
      <Spinner color="warning.500" size="lg" />
    </Center>
  );
};

export { Loading };
