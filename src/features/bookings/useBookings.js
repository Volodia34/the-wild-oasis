import {useQuery, useQueryClient} from "react-query";
import {getBopokings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";
import {PAGE_SIZE} from "../../utils/constants.js";

export function useBookings() {
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()

    const filterValue = searchParams.get('status')
    const filter = !filterValue || filterValue === 'all' ? null : {field: 'status',value: filterValue}
    // : {field: 'totalPrice',value: 5000, method: 'gte'}

    const sortByRaw = searchParams.get('sortBy') || "startDate-desc"
    const [field,direction] = sortByRaw.split('-')

    const sortBy = {field,direction}

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"))

    const {isLoading, data: {data:bookings,count}={},error} = useQuery({
        queryKey: ["bookings",filter,sortBy,page],
        queryFn: () => getBopokings({filter,sortBy,page}),
    })

    const pageCount = Math.ceil(count/PAGE_SIZE)

    if(page < pageCount)
    queryClient.prefetchQuery({
        queryKey: ["bookings",filter,sortBy,page+1],
        queryFn: () => getBopokings({filter,sortBy,page: page + 1}),
    })

    if(page > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings",filter,sortBy,page-1],
            queryFn: () => getBopokings({filter,sortBy,page: page - 1}),
        })
    return {isLoading,error,bookings,count}
}