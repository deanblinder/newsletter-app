import React, {useEffect, useState} from "react";
import {HStack, NativeBaseProvider, Spinner, View, Text} from "native-base";
import SearchInput from "./searchInput";
import Filters from "./filters";
import Articles from "./articles";
import {articlesActions} from "./articles/articlesActions";
import {StyleSheet} from "react-native";
import {Article} from "./articles/types";

type Props = {
    navigation: any
}

const MainPage = (props:Props) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [query, setQuery] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [shouldShowEndMassage, setShouldShowEndMassage] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async ()=> {
            const response = await articlesActions.getArticles(pageNumber,query,category);
            setIsLoading(false);
            setArticles(response?.data.articles);
            setPageNumber(pageNumber + 1);
        }
        fetchData();
    },[])

    const endMassageToggle = (articles:Article[]) => {
        if (articles.length === 0){
            setShouldShowEndMassage(true)
        }
        else {
            setShouldShowEndMassage(false)
        }
    }

    const searchArticles = async (query:string) => {
        setQuery(query);
        setPageNumber(1);
        const response = await articlesActions.getArticles(pageNumber,query,category);
        setArticles(response?.data.articles);
    }

    const setFilter = async (filter:string) => {
        setCategory(filter);
        setPageNumber(1);
        setIsLoading(true)
        const response = await articlesActions.getArticles(pageNumber,query,category);
        setArticles(response?.data.articles);
        setIsLoading(false)
        setPageNumber(pageNumber + 1);
    }

    const getMoreArticles = async () => {
        const response = await articlesActions.getArticles(pageNumber,query,category);
        endMassageToggle(response?.data.articles)
        setArticles([...articles,...response?.data.articles]);
        setPageNumber(pageNumber + 1);
    }


    const renderLoader = () => {
        return(
            <View style={styles.container}>
                <HStack space={8} justifyContent="center" alignItems="center">
                    <Spinner size="lg" />
                </HStack>
            </View>
            )
    }

    const renderEndMassage = () => {
      return(
          <View>
              <Text>No more articles</Text>
          </View>
      )
    }

    return(
        <NativeBaseProvider>
            <View style={styles.container}>
                <SearchInput setQuery={searchArticles}/>
                <Filters setFilter={setFilter}/>
                {isLoading ? renderLoader() : <Articles articles={articles} navigation={props.navigation} getMoreArticles={getMoreArticles}/>}
                {shouldShowEndMassage && renderEndMassage()}
            </View>
        </NativeBaseProvider>
    )
}
export default MainPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
