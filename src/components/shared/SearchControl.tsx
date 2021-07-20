export const SearchControl = (props: any) => {
    return (
        <div className="search-page">
            <input type="search" name={props.name} className="in-search" onChange={props.searchAction} />
        </div>
    )
}