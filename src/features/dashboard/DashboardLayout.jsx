import styled from "styled-components";
import {useRecentBookings} from "./useRecentBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import {useRecentStays} from "./useRecentStays.js";
import Starts from "./Starts.jsx";
import {useCabins} from "../cabins/useCabins.js";
import SalesChart from "./SalesChart.jsx";
import DurationChart from "./DurationChart.jsx";
import TodayActivity from "../check-in-out/TodayActivity.jsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


function DashboardLayout() {

    const {bookings,isLoading} = useRecentBookings()
    // eslint-disable-next-line no-unused-vars
    const {stays,cnfirmedStays,isLoading: isLoading1,numDays} = useRecentStays()
    const {cabins,isLoading: isLoading3} = useCabins()

    if(isLoading || isLoading1 || isLoading3) return <Spinner/>

    return (
        <StyledDashboardLayout>
            <Starts bookings={bookings} confrmedStays={cnfirmedStays} numDays={numDays} cabinCount={cabins.length}/>
            <TodayActivity></TodayActivity>
            <DurationChart confirmedStays={cnfirmedStays}/>
            <SalesChart bookings={bookings} numDays={numDays}/>
        </StyledDashboardLayout>
    )
}

export default DashboardLayout