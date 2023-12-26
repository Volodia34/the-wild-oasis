import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from '../../ui/StortBy.jsx'
function CabinTableOperation() {
    return(
        <TableOperations>
           <Filter filterField='discount' options={[{value: 'all',label: "All"},{value: 'no-discount',label: "No discount"},{value: 'with-discount',label: "With discount"}]}/>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <SortBy options={[
                {
                    value: 'name-asc',
                    label: "Sort by name (A-Z)"
                },
                {
                    value: 'name-desc',
                    label: "Sort by name (Z-A)"
                },
                {
                    value: 'regularPrice-asc',
                    label: "Sort by price (low first)"
                },
                {
                    value: 'regularPrice-desc',
                    label: "Sort by price (high first)"
                },
                {
                    value: 'maxCapacity-asc',
                    label: "Sort by capacity (low first)"
                },
                {
                    value: 'maxCapacity-desc',
                    label: "Sort by capacity (high first)"
                },

            ]}/>


        </TableOperations>
    )
}

export default CabinTableOperation