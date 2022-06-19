import {configureStore} from "@reduxjs/toolkit";

import mainPageReducer from "./mainPageStore";

export const store = configureStore({
    reducer: {
        mainPage: mainPageReducer
    }
});
