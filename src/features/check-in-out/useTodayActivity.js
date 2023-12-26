import {useQuery} from "react-query";
import {getStaysTodayActivity} from "../../services/apiBookings.js";

export function useTodayActivity() {
   const {isLoading,data: activities} =  useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ['today-activ ity']
    })

    return {activities,isLoading}
}