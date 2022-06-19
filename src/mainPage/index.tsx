import React, {useEffect, useState} from "react";
import {HStack, NativeBaseProvider, Spinner, View, Text} from "native-base";
import SearchInput from "./searchInput";
import Filters from "./filters";
import Articles from "./articles";
import {articlesActions} from "./articles/articlesActions";
import {StyleSheet} from "react-native";
import {Article} from "./articles/types";
import {useSelector, useDispatch} from "react-redux";
import {setArticles, addArticles} from "./store/mainPageStore";

type Props = {
    navigation: any
}

const MainPage = (props:Props) => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [shouldShowEndMassage, setShouldShowEndMassage] = useState<boolean>(false);

    const articles = useSelector((state:any) => state.mainPage.articles)
    const query = useSelector((state:any) => state.mainPage.query)
    const category = useSelector((state:any) => state.mainPage.category)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async ()=> {
            const response = await articlesActions.getArticles(pageNumber,query,category);
            setIsLoading(false);
            dispatch(setArticles(response?.data.articles))
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

    const searchArticles = async () => {
        setShouldShowEndMassage(false)

        setPageNumber(1);
        setIsLoading(true)
        const response = await articlesActions.getArticles(pageNumber,query,category);
        setIsLoading(false)

        dispatch(setArticles(response?.data.articles))
    }

    const setFilter = async () => {
        setShouldShowEndMassage(false)

        setPageNumber(1);
        setIsLoading(true)
        const response = await articlesActions.getArticles(pageNumber,query,category);
        dispatch(setArticles(response?.data.articles))
        setIsLoading(false)
        setPageNumber(pageNumber + 1);
    }

    const getMoreArticles = async () => {
        const response = await articlesActions.getArticles(pageNumber,query,category);
        endMassageToggle(response?.data.articles)
        dispatch(addArticles(response?.data.articles))
        setPageNumber(pageNumber + 1);
        if (response?.data.articles.length === 0){
            setShouldShowEndMassage(true)
        }
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
          <View style={{marginBottom:'10%'}}>
              <Text style={{fontSize:20,fontWeight:'bold'}}>No more articles</Text>
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
