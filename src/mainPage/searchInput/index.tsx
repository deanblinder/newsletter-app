import React, {useEffect, useRef, useState} from "react";
import {VStack, Input, Icon, View} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {setQuery} from "../store/mainPageStore";

type Props = {
    setQuery: (query: string) => void
}

const SearchInput = (props:Props) => {
    const [input,setInput] = useState('');
    const [debounce,setDebounce] = useState<any>();
    const [isTimePassed,setIsTimePassed] = useState(false);

    const dispatch = useDispatch()

    useEffect(()=>{
        if (isTimePassed){
            dispatch(setQuery(input))
            props.setQuery(input)
            setIsTimePassed(false)
        }
    },[isTimePassed])

    const onSearchInput = (text:string) => {
        setInput(text)
        dispatch(setQuery(text))
        const setTimeoutId = setTimeout(() => {
            setIsTimePassed(true);
        }, 800);
        setDebounce(setTimeoutId);
        clearTimeout(debounce);

    }

    return(
        <View style={{marginHorizontal:'5%',marginVertical:'5%'}}>
            <VStack w="100%" space={5} alignSelf="center" >
                <Input onChangeText={(text)=>onSearchInput(text)} placeholder="Search" width="100%" borderRadius="4" py="3" px="1" fontSize="14" InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} />
            </VStack>
        </View>

        )
}
export default SearchInput;

