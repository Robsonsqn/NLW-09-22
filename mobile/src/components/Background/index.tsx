import { ImageBackground } from 'react-native';
import { styles } from './styles';

import bgGalaxyImg from '../../assets/background-galaxy.png';

interface Props {
    children: React.ReactNode
}

export function Background({ children }: Props) {
  return (
    <ImageBackground source={bgGalaxyImg} defaultSource={bgGalaxyImg} style={styles.container}>
        {children}
    </ImageBackground>
  );
}