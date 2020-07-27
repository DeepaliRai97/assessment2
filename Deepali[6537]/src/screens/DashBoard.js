import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { context } from '../../context';

const Temp = () => {
    const [data, setData] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchResults();
    }, []);
    const fetchResults = async () => {
        const res = await fetch(`https://randomuser.me/api/?seed=1&page=${pageNo}&results=10`);
        const jsonRes = await res.json();
        console.log('fffffff', jsonRes);
        console.log('pppppp');
        setData([...data, ...jsonRes.results]);
        };
    const endCall = async () => {
        setLoading(true);
        setPageNo(pageNo + 1);
        await fetchResults();
        setLoading(false);
        };
    const renderFooter = () => {
        if (loading) return <ActivityIndicator />;
        else return <Button title="Load More" onPress={endCall} />;
    };
    return (
        <View style={styles.container}>
            <FlatList data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    console.log(')))', item);
                    return (<View style={styles.context}>
                        <Image source={{ uri: item.picture.thumbnail }}
                            style={{
                                width: 20,
                                height: 20,
                                resizeMode: "contain",
                                marginRight: 20,
                                borderRadius: 10,
                            }} />
                        <Text>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
                    </View>);
                }}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(240,240,240)'

    },
    context: {
        marginVertical: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 20

    }

})

export default Temp;
