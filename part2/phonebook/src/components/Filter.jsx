
const Filter = ({filterName, handleFilterName}) => {
    return (
        <>
          filter shown with <input value={filterName} onChange={handleFilterName}/>
        </>
    )
}


export default Filter