import {useMutation, useQueryClient} from "react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useCreateCabin() {
    const queryClient = useQueryClient()


    // eslint-disable-next-line no-unused-vars
    const {mutate: createCabin, isLoading: isCreating} = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            console.log(createCabin)
            toast.success("New cabin successfull created")
            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            })
        },
        onError: (err) => toast.error(err.message)
    })

    return{isCreating,createCabin}
}