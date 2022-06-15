import React from 'react';
import Card from "./compenents/card";
import {NativeBaseProvider, Pressable} from 'native-base';
import {Article} from "./types";
import {FlatList} from "react-native";

type Props = {
    articles: Article[],
    navigation: any,
    getMoreArticles: () => void,
}

const Articles = (props: Props) => {

    const onArticlePressed = (article:Article) => {
        props.navigation.navigate({
            name:'ArticlePage',
            params:{article:article}
        })
    }

    const renderItem = (article:Article) => {
        return(
            <Pressable onPress={()=>onArticlePressed(article)}>
                <Card title={article.title} publishDate={article.publishedAt} image={article.urlToImage} description={article.description}/>
            </Pressable>
        )
    }
    const onEndReached = () => {
        props.getMoreArticles();
    }

    return(
        <NativeBaseProvider>
                <FlatList onEndReachedThreshold={5} onEndReached={onEndReached} data={props.articles} renderItem={({item,index})=>(
                    renderItem(item)
                )}/>
        </NativeBaseProvider>
    )
}

export default Articles;
