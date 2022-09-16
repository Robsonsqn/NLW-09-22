import { Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from './styles'
import { Header } from '../../components/Header'
import { GameCard, GameCardProps } from '../../components/GameCard'
import { Background } from '../../components/Background'

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>()
  useEffect(() => {
    fetch('http://192.168.0.120:3333/games')
    .then(response => response.json())
    .then(data => {
      setGames(data)
    })
  }, [])

  const navigation = useNavigation()
  function handleOpenGame({id, title, bannerUrl}: GameCardProps) {
      navigation.navigate('game', {id, title, bannerUrl})
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo}/>
        <Header title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...'/>
        <FlatList contentContainerStyle={styles.contentList} data={games} keyExtractor={item => item.id} renderItem={({item}) => (
          <GameCard onPress={() => handleOpenGame(item)} data={item}/>
        )} horizontal showsHorizontalScrollIndicator={false} />
      </SafeAreaView>
    </Background>
  );
}