import { memo, useMemo} from "react";

interface PaginatorType {
  totalItemCount : number
  page: number
  setPage: (page:number) => void
}

const getShowlength = ():number => {    
  const width = window.innerWidth;
  if (width < 600) {
    return 5; 
  } else if (width < 1024) {
    return 7; 
  } else {
    return 10
  }    
}

const Paginator = ({totalItemCount,page,setPage}:PaginatorType) => {

  const showLength = useMemo(() => getShowlength(), []);
  const pageLength = useMemo(() => Math.ceil(totalItemCount/10) , [totalItemCount]) 
  const start = useMemo(() => Math.max(0,Math.min(page - Math.floor(showLength / 2),pageLength - showLength)),[page,totalItemCount])

  return (
    <div>
      <div className="flex justify-center">
        <p className="py-2 dark:text-white text-gray-700 font-semibold">We could find <span className="text-red-600">{totalItemCount}</span> movies for you</p>
      </div>
      <div className="flex gap-2">
          <button onClick={()=>setPage(1)} className="dark:border-black hover:border-black border-white border cursor-pointer px-2 py-1 font-semibold text-gray-900  rounded">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14 8-4 4 4 4"/>
            </svg>
          </button>      
          {Array.from({ length: showLength }, (_, i) => {
            const num = i + 1 + start;
            if(num === page){
              return(
                <button key={i} className="bg-red-500 cursor-pointer px-2 py-1 font-semibold text-gray-900  rounded">
                  {num}
                </button>
              )
            }else{
              return(
                <button key={i} onClick={()=>setPage(num)} className="hover:border-black dark:text-white dark:border-black border-white border cursor-pointer px-2 py-1 font-semibold text-gray-900  rounded">
                  {num}
                </button>
              )
            }
        })}
        <button onClick={()=>setPage(pageLength)} className="dark:border-black hover:border-black border-white border cursor-pointer px-2 py-1 font-semibold text-gray-900  rounded">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10 16 4-4-4-4"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default memo(Paginator)