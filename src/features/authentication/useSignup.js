import {signup as signupApi} from "../../services/apiAuth.js";
import toast from "react-hot-toast";
import {useMutation} from "react-query";

export function useSignup() {
    const {mutate: signup, isLoading} = useMutation({
        mutationFn: signupApi,
        // eslint-disable-next-line no-unused-vars
        onSuccess: (user) => {
            toast.success('Account successfully created! Please verufy the new account from the user`s email addres')
        }
    })

    return {signup,isLoading}
}