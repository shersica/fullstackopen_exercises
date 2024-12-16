const Search = ({query, handleQuery}) => {
    return (
        <>
          find countries <input value={query} onChange={handleQuery}/>
        </>
    )
}


export default Search