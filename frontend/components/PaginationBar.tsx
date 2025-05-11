'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
interface PaginationProps{
    totalPages:number
    pageSize:number
    setPageSize:(p:number)=>void
    currentPage:number
    setCurrentPage:(current:number|{(p:number):number})=>void
}
function PaginationBar({totalPages,pageSize,setPageSize,currentPage,setCurrentPage}:PaginationProps) {

       
  return (
<>
<Select value={pageSize.toString()} onValueChange={(v) => {
         setPageSize(Number(v));
         setCurrentPage(1);
       }}>
         <SelectTrigger className="w-[100px]">
           <SelectValue placeholder="Per page" />
         </SelectTrigger>
         <SelectContent>
           <SelectItem value="10">10 rows</SelectItem>
           <SelectItem value="15">15 rows</SelectItem>
           <SelectItem value="20">20 rows</SelectItem>
         </SelectContent>
       </Select>

       <div className="flex items-center gap-2">
         <button
           className="px-3 py-1 rounded border disabled:opacity-50"
           onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
           disabled={currentPage === 1}
         >
           Previous
         </button>
         <span className="text-sm">
           Page {currentPage} of {totalPages}
         </span>
         <button
           className="px-3 py-1 rounded border disabled:opacity-50"
           onClick={() => setCurrentPage((p: number) => Math.min(totalPages, p + 1))}
           disabled={currentPage === totalPages}
         >
           Next
         </button>
       </div>
</>
)
}

export default PaginationBar