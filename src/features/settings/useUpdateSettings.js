import {useMutation, useQueryClient} from "react-query";
import toast from "react-hot-toast";
import {updateSetting as updateSettingApi} from "../../services/apiSettings.js";

export function useUpdateSettings() {
    const queryClient = useQueryClient()



    const {mutate: updateSetting, isLoading: isUpdating} = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Setting successfuull edited")
            queryClient.invalidateQueries({
                queryKey: ['setings']
            })
        },
        onError: (err) => toast.error(err.message)
    })

    return {isUpdating,updateSetting}
}