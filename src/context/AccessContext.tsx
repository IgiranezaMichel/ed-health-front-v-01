import { useState } from "react";
import { PaginationInput } from "../typeDefs/PaginationInput"
import Demo, { Example } from "./Demo"
import { MyContext } from "./Index"

export const AccessContext=()=>{
    const [page]=useState<PaginationInput>({
        pageNumber:0,pageSize:9,sort:"id"
    });
    return <MyContext.Provider value={page}>
        <Example/>
        <Demo/>
        
    </MyContext.Provider>
}
