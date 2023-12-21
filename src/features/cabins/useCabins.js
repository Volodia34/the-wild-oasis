import {useQuery} from "react-query";
import {getCabins} from "../../services/apiCabins.js";

export function useCabins() {
    const {isLoading, data: cabins,error} = useQuery({
        queryKey: ['cabins'],
        queryFn: getCabins,
    })
    return {isLoading,error,cabins}
}