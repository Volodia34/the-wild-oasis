import {useMutation, useQueryClient} from "react-query";
import toast from "react-hot-toast";
import {deleteCabin as deleteCabinApi} from "../../services/apiCabins.js";

export function useDeleteCabin() {

    const queryClient = useQueryClient()
    // console.log(cabin)

    const {isLoading: isDelting, mutate: deleteCabin} = useMutation({
        mutationFn: deleteCabinApi,
        onSuccess: () => {
            toast.success("Cabbin successfully deleted")
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
        },
        onError: err => toast(err.message)
    })
    return {isDelting,deleteCabin}
}