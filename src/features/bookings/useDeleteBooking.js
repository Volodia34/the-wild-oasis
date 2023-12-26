import {useMutation, useQueryClient} from "react-query";
import toast from "react-hot-toast";
import {deleteBooking as deleteBookingApi} from "../../services/apiBookings.js";

export function useDeleteBooking() {

    const queryClient = useQueryClient()
    // console.log(cabin)

    const {isLoading: isDelting, mutate: deleteBooking} = useMutation({
        mutationFn: deleteBookingApi,
        onSuccess: () => {
            toast.success("Booking successfully deleted")
            queryClient.invalidateQueries({
                queryKey: ['bookings']
            })
        },
        onError: err => toast(err.message)
    })
    return {isDelting,deleteBooking}
}