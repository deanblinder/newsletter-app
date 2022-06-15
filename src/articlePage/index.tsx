import React from 'react';
import {ScrollView, Text} from 'native-base';
import {Article} from "../mainPage/articles/types";
import { Box, Heading, AspectRatio, Image, Center, HStack, Stack } from "native-base";
import RenderHtml from "react-native-render-html";


type Props = {
    articles: Article,
    route:any

}

const ArticlePage = (props: Props) => {
    const {title,urlToImage,author,description,publishedAt} = props.route.params.article;
    const articlePublishDate  = new Date(publishedAt);

    const desc = {
        html:description
    }
    return(
            <ScrollView style={{flex:1}}>
                <Box>
                    <AspectRatio w="100%" ratio={16 / 9}>
                        <Image source={{
                            uri: urlToImage
                        }} alt="image" />
                    </AspectRatio>
                </Box>
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1">
                            {title}
                        </Heading>
                        <Text fontSize="xs" _light={{
                            color: "violet.500"
                        }} _dark={{
                            color: "violet.400"
                        }} fontWeight="500" ml="-0.5" mt="-1">
                            {author}
                        </Text>
                    </Stack>
                    <Text fontWeight="400">
                        <RenderHtml
                            source={desc}
                        />
                    </Text>
                    <HStack alignItems="center" space={4} justifyContent="space-between">
                        <HStack alignItems="center">
                            <Text color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }} fontWeight="400">
                                {articlePublishDate.toDateString()}
                            </Text>
                        </HStack>
                    </HStack>
                </Stack>
            </ScrollView>
    )
}

export default ArticlePage;
