import React, { useContext, useState, useEffect } from "react";
import { View, Text, Pressable, Image, StyleSheet, FlatList } from "react-native-web";
import { AppContext, AppProvider } from "../../../../scripts/appContext";
import { Link } from "expo-router";

const produtos = [
    {
        id: '1',
        nome: 'Steak Cheddar Cremoso',
        estabelecimento: 'Subway',
        preco: 21,
        imagem: 'https://grandesnomesdapropaganda.com.br/wp-content/uploads/2019/01/Subway-1.jpg',
    },
    {
        id: '2',
        nome: 'Casquinha',
        estabelecimento: 'Bobs',
        preco: 4,
        imagem: 'https://bobs.com.br/media/filer_public_thumbnails/filer_public/16/48/1648fccb-7dfb-411c-b80a-ce3a2e64a67a/034_bobs_site_atualizacao_imagens_cardapio_sobremesas_casquinha_mista.jpg__800x400_q85_subsampling-2.jpg',
    },
];

export default function App() {
    const { cart, setCart } = useContext(AppContext)
    const [cartLenght, setCartLength] = useState(0)

    function pushCart(item) {
        setCart([...cart, item])
    }

    useEffect(() => { if (cart.length) { setCartLength(cart.length); } console.log(cart.length) }, [cart])

    const renderItem = ({ item }) => (
        <View style={styles.produtoContainer}>
            <Image source={{ uri: item.imagem }} style={styles.produtoImagem} />
            <View style={styles.produtoInfo}>
                <Text style={styles.produtoNome}>{item.nome}</Text>
                <Text style={styles.produtoEstabelecimento}>{item.estabelecimento}</Text>
                <Text style={styles.produtoPreco}>R${item.preco.toString().replace('.', ',')}</Text>
                <Pressable style={styles.comprarButton} onPress={() => pushCart(item)}>
                    <Text style={styles.comprarButtonText}>Comprar</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>iFome</Text>
            </View>
            <View style={styles.carrinho}>
                <Link href={'../cart'}><Image
                    source={{ uri: '../../assets/images/cart.png' }}
                    style={styles.carrinhoImagem}
                /></Link>

                <Text style={styles.carrinhoTexto}>{`${cartLenght} produtos`}</Text>
            </View>
            <FlatList
                data={produtos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.flatList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2', // fundo mais suave
    },
    header: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E74C3C', // cabeçalho vermelho
    },
    headerText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold', // destaque no texto do cabeçalho
    },
    carrinho: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff', // fundo branco para o carrinho
        justifyContent: 'flex-end',
        shadowColor: '#000', // sombra para destaque
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        borderRadius: 10, // cantos arredondados
        marginHorizontal: 10,
        marginBottom: 10,
    },
    carrinhoImagem: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    carrinhoTexto: {
        fontSize: 16,
        color: '#2C3E50', // cor escura para o texto do carrinho
    },
    flatList: {
        marginTop: 10,
    },
    produtoContainer: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff', // fundo branco para os produtos
        borderRadius: 10, // borda arredondada
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 10,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    produtoImagem: {
        width: 80, // ajustado para compactar
        height: 80,
        borderRadius: 10, // borda arredondada para a imagem do produto
        marginRight: 15,
    },
    produtoInfo: {
        flex: 1,
    },
    produtoNome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C3E50', // cor escura para o nome do produto
    },
    produtoEstabelecimento: {
        fontSize: 14,
        color: '#999', // cor mais clara para o subtítulo
    },
    produtoPreco: {
        fontSize: 18,
        fontWeight: 'bold', // destaque no preço
        color: '#E74C3C', // cor vermelha para o preço
        marginVertical: 5,
    },
    comprarButton: {
        backgroundColor: '#E74C3C', // botão vermelho
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center', // centralizar botão
        marginTop: 10,
    },
    comprarButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});