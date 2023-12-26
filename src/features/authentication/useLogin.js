import {useMutation, useQueryClient} from "react-query";
import {login as loginApi} from "../../services/apiAuth.js";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {mutate: login,isLoading} = useMutation({
        mutationFn: ({email,password}) => loginApi({
            email,password}),
        onSuccess: (user) => {
            queryClient.setQueryData(['user'],user.user)
            console.log(user)
            navigate('/dashboard',{replace: true})
        },
        onError: err => {
            console.log('ERROR',err)
            toast.error('Provider email or password are incorrect')
        }
    })

    return {login,isLoading}
}