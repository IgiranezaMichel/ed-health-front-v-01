import { Pagination, Stack } from "@mui/material"
import { PaginationInput } from "../../typeDefs/PaginationInput"
import { Sort } from "@mui/icons-material"
import { FC } from "react"
type pagination={
    page:PaginationInput,
    pageSizingOption:{itemLabel:string,itemValue:number}[],
    pageSortOptions:{itemLabel:string,itemValue:string}[]
}
export const PAGINATION:FC<pagination>=(props)=>{
  return(
    <Stack spacing={2}>
            <div>  Page {props.page.pageNumber+ 1} out of {props.page.pageSize}  <span>
              {/* <select onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2"
              >
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="24">24</option>
                <option value="32">32</option>
              </select> */}
            </span>
              <span className="float-end"> Sort by
              <select>
                {props.pageSortOptions.map((sort,index)=>{
                    return <option key={index} value={sort.itemValue}>
                        {sort.itemLabel}
                    </option>
                })}
              </select>
              <Sort />
              </span>
              <Pagination
                count={props.page.pageSize}
                page={props.page.pageNumber+ 1}
                // onChange={handleChange}
              />
            </div>
          </Stack>
  )  
}