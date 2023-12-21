import {useMutation, useQueryClient} from "react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useEditCabin() {
    const queryClient = useQueryClient()



    const {mutate: editCabin, isLoading: isEditng} = useMutation({
        mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Cabin successfuull edited")
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
        },
        onError: (err) => toast.error(err.message)
    })

    return {isEditng,editCabin}
}