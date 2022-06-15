import React from "react";
import {View, Select, Center,Box,CheckIcon} from "native-base";
import {filters} from "./constants";

type Props = {
    setFilter: (filter:string) => void,
}

const Filters = (props:Props) => {
    let [filter, setFilter] = React.useState("");

    const onFilterPress = (filter:string) => {
        setFilter(filter);
        props.setFilter(filter);
    }

    return <View style={{flexDirection:'row',flexWrap:'wrap',marginBottom:'10%',marginHorizontal:'5%'}}>
                <Center>
                    <Box maxW="300">
                        <Select selectedValue={filter} minWidth="200" accessibilityLabel="Choose Filter" placeholder="Choose Filter" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1} onValueChange={itemValue => onFilterPress(itemValue)}>
                            <Select.Item label={'none'} value={filters[2]} />
                            <Select.Item label={filters[0]} value={filters[0]} />
                            <Select.Item label={filters[1]} value={filters[1]} />
                            <Select.Item label={filters[2]} value={filters[2]} />
                            <Select.Item label={filters[3]} value={filters[3]} />
                            <Select.Item label={filters[4]} value={filters[4]} />
                        </Select>
                    </Box>
                </Center>

    </View>;
}
export default Filters;
