import {useMutation, useQueryClient} from "react-query";
import toast from "react-hot-toast";
import {updaateCurrentUser} from "../../services/apiAuth.js";

export function useUpdateUser() {
    const queryClient = useQueryClient()



    const {mutate: updateUser, isLoading: isUpdating} = useMutation({
        mutationFn: updaateCurrentUser,
        onSuccess: ({user}) => {
            toast.success("user account successfully updated")
            queryClient.setQueryData(['user'],user)
            // queryClient.invalidateQueries({
            //     queryKey: ['user']
            // })
        },
        onError: (err) => toast.error(err.message)
    })

    return {updateUser,isUpdating}
}