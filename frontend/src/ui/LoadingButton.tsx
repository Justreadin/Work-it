const LoadingButton = ()=>{
    return(
        <button disabled className="flex opacity-80 justify-center gap-3 items-center bg-dark_purple py-2.5 bg-opacity-100 text-white w-40 rounded-3xl">
           <span> Loading </span> 
            <div className="w-5 h-5 border-b-2 rounded-full animate-spin"></div>
        </button>
    )
}

export default LoadingButton