import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import {useMoveBack} from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner.jsx";
import {useBooking} from "../bookings/useBooking.js";
import {useEffect, useState} from "react";
import Checkbox from "../../ui/Checkbox.jsx";
import {formatCurrency} from "../../utils/helpers.js";
import {useCheckin} from "./useCheckin.js";
import {useSettings} from "../settings/useSettings.js";

// eslint-disable-next-line no-unused-vars
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false)
    const [addBreaakfast, setAddBreakfast] = useState(false)
    const {booking, isLoading} = useBooking()
    // eslint-disable-next-line no-unused-vars
    const {settings, isLoading: isLoadingSettings} = useSettings()
    console.log(settings)

    useEffect(() => {
        setConfirmPaid(booking?.isPaid ?? false)
    }, [booking]);

    const moveBack = useMoveBack();
    const {checkin, isCheckingIn} = useCheckin()

    if (isLoading || isLoadingSettings) return <Spinner/>


    const {
        id: bookingId,
        // eslint-disable-next-line no-unused-vars
        guests,
        // eslint-disable-next-line no-unused-vars
        totalPrice,
        // eslint-disable-next-line no-unused-vars
        numGuests,
        // eslint-disable-next-line no-unused-vars
        hasBreakfast,
        // eslint-disable-next-line no-unused-vars
        numNights,
    } = booking;

    const optionalBreakfastPrice = settings.brakfestPrice * numNights * numGuests

    function handleCheckin() {
        if (!confirmPaid) return;

        if (addBreaakfast) {
            checkin({
                bookingId, breakfast: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakfastPrice,
                    totalPrice: totalPrice + optionalBreakfastPrice
                }
            })
        } else {
            checkin({bookingId, breakfast: {}})
        }
    }


    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking}/>

            {!hasBreakfast && <Box>
                <Checkbox checked={addBreaakfast} onChange={() => {
                    setAddBreakfast(add => !add)
                    setConfirmPaid(false)
                }} id='brealfast'>Want to add breakfast for {optionalBreakfastPrice}?</Checkbox>
            </Box>}
            <Box>
                <Checkbox checked={confirmPaid} onChange={() => setConfirmPaid((confirm) => !confirm)} id='confirm'
                          disabled={confirmPaid || isCheckingIn}>I confirm that {guests.fullName} has paid the total
                    amout
                    of {!addBreaakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice) + formatCurrency(optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)}) `}</Checkbox>
            </Box>

            <ButtonGroup>
                <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>Check in booking
                    #{bookingId}</Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
