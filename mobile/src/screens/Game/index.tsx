import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native'

import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme';
import { Header } from '../../components/Header';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

export function Game() {

  const navigation = useNavigation()
  const route = useRoute()
  const game = route.params as GameParams

  const [duos, setDuos] = useState<DuoCardProps[]>([])
  useEffect(() => {
    fetch(`http://192.168.0.120:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data))
  }, [])

  function handleGoBack(){
    navigation.goBack()
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleGoBack()}>
            <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20}/>
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo}/>
          <View style={styles.right}/>
        </View>
        <Image source={{uri: game.bannerUrl}} style={styles.cover} resizeMode="cover"/>
        <Header title={game.title} subtitle='Conecte-se e comece a jogar!'/>
        <FlatList 
            data={duos} 
            keyExtractor={item => item.id} 
            renderItem={({item}) => (
              <DuoCard data={item} onConnect={() => {}}/>
            )} 
            horizontal 
            style={styles.containerList} 
            contentContainerStyle={duos.length > 0 ? styles.contentList: styles.emptyListContent} 
            showsHorizontalScrollIndicator={false} 
            ListEmptyComponent={() => (
               <Text style={styles.emptyList}>Não há anúncios publicados ainda.</Text>
            )}/>
      </SafeAreaView>
    </Background>
  );
}