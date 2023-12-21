import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import {useSettings} from "./useSettings.js";
import Spinner from "../../ui/Spinner.jsx";
import {useUpdateSettings} from "./useUpdateSettings.js";

function UpdateSettingsForm() {
    // eslint-disable-next-line no-unused-vars
    const {isLoading,settings: {minBookingLenght, maxBookingLenght, maxGuestsPerBooking, brakfestPrice} ={},} = useSettings()
    // eslint-disable-next-line no-unused-vars
    const {isUpdating,updateSetting} = useUpdateSettings()

    if(isLoading) return <Spinner/>

    // eslint-disable-next-line no-unused-vars
    function handleUpdate(e,field) {
        const {value} = e.target
        console.log(value)
        if(!value) return
        updateSetting({[field]: value})
    }
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights'  defaultValue={minBookingLenght} disabled={isUpdating} onBlur={e=> handleUpdate(e ,'minBookingLenght')}/>
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLenght} disabled={isUpdating} onBlur={e=> handleUpdate(e ,'maxBookingLenght')}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking} disabled={isUpdating} onBlur={e=> handleUpdate(e ,'maxGuestsPerBooking')}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={brakfestPrice} disabled={isUpdating} onBlur={e=> handleUpdate(e ,'brakfestPrice')}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
