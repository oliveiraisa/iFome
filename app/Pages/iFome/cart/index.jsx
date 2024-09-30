import React, { useContext } from 'react';
import { View, Text, Image, FlatList, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { AppContext } from '../../../../scripts/appContext';



export default function Cart() {
    const { cart, setCart } = useContext(AppContext)

    const calcularTotal = () => {
        let total = 0
        for (let i = 0; i < cart.length; i++) {
            let preco = cart[i].preco
            total += preco
        }
        return total
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.imagem }} style={styles.itemImagem} />
            <View style={styles.itemInfo}>
                <Text style={styles.itemNome}>{item.nome}</Text>
                <Text style={styles.itemEstabelecimento}>{item.estabelecimento}</Text>
                <Text style={styles.itemPreco}>R${item.preco.toLocaleString('pt-BR',  {style: 'decimal', minimumIntegerDigits: 1})}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Link href={'../home'} >
                    <Text style={styles.voltarTexto}>{'< Voltar'}</Text>
                </Link>
                <Text style={styles.headerTexto}>Carrinho</Text>
            </View>
            <FlatList
                data={cart}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.flatList}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalTexto}>Total: R$ {calcularTotal()}</Text>
                <Pressable style={styles.comprarButton}>
                    <Text style={styles.comprarButtonText}>Comprar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2', 
    },
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: '#E74C3C', 
    },
    voltarTexto: {
        color: '#fff',
        fontSize: 18,
    },
    headerTexto: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    flatList: {
        marginTop: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff', 
        borderRadius: 10,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 10,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    itemImagem: {
        width: 80, 
        height: 80,
        borderRadius: 10, 
        marginRight: 15,
    },
    itemInfo: {
        flex: 1,
    },
    itemNome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C3E50', 
    },
    itemEstabelecimento: {
        fontSize: 14,
        color: '#999', 
        marginTop: 5,
    },
    itemPreco: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E74C3C', 
        marginTop: 5,
    },
    comprarButton: {
        backgroundColor: '#E74C3C', 
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'center', 
    },
    comprarButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    totalContainer: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginTop: 10,
    },
    totalTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2C3E50',
    },
});
