import { useEffect, useState } from 'react'
import { Modal, View, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'

import * as Clipboard from 'expo-clipboard'
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native'

import { styles } from './styles'
import { THEME } from '../../theme'
import { Header } from '../Header'

interface Props extends ModalProps {
    discord: string
    onClose: () => void
}

export function DuoMatch({discord, onClose, ...rest}: Props) {
    const [isCopping, setIsCopping] = useState(false)

    async function handleCopyDiscordToClipBoard() {
        setIsCopping(true)
        await Clipboard.setStringAsync(discord)
        Alert.alert("Discord copiado!", "Usuário copiado com sucesso!")
        setIsCopping(false)
    }

    return (
        <Modal transparent statusBarTranslucent animationType='fade' {...rest}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                        <MaterialIcons name='close' size={20} color={THEME.COLORS.CAPTION_500}/>
                    </TouchableOpacity>
                    <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold"/>
                    <Header title='Let’s play!' subtitle='Agora é só começar a jogar!' style={{alignItems:"center", marginTop:4}}/>
                    <Text style={styles.label}>Adicione no Discord</Text>
                    <TouchableOpacity style= {styles.discordButton} onPress={handleCopyDiscordToClipBoard} disabled={isCopping}>
                        <Text style={styles.discord}>{isCopping? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}