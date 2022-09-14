import { View, Image, FlatList } from 'react-native';

import { styles } from './styles';
import { Header } from '../../components/Header';
import logoImg from '../../assets/logo-nlw-esports.png';
import {GAMES} from '../../utils/games';
import { GameCard } from '../../components/GameCard';

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo}/>
      <Header title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...'/>
      <FlatList contentContainerStyle={styles.contentList} data={GAMES} keyExtractor={item => item.id} renderItem={({item}) => (
        <GameCard data={item}/>
      )} horizontal showsHorizontalScrollIndicator={false} />
    </View>
  );
}