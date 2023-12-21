import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import FormRow from "../../ui/FormRow.jsx";
import {useCreateCabin} from "./useCreateCabin.js";
import {useEditCabin} from "./useEditCabin.js";


// eslint-disable-next-line react/prop-types
function CreateCabinForm({cabinToEdit = {}}) {
    const {isCreating,createCabin} = useCreateCabin()
    const {isEditng,editCabin} = useEditCabin()
    const isWorking = isCreating || isEditng

    const {id: editId, ...editValue} = cabinToEdit
    const isEditSession = Boolean(editId)
    const {register, handleSubmit, reset, getValues, formState} = useForm({
        defaultValues: isEditSession ? editValue : {}
    })

    const {errors} = formState




    // eslint-disable-next-line no-unused-vars
    function onError(errors) {
        // console.log(errors)
    }


    function onSubmit(data) {
        console.log(data)
        const image = typeof data.image === "string" ? data.image : data.image[0]
        if (isEditSession) {
            editCabin({
                newCabinData: {
                    ...data,  image: image,
                }, id: editId,
                onSuccess: () => {
                    reset()
                }
            })
        } else {
            createCabin({...data, image: image}, {
                onSuccess: () => {
                    reset()
                }
            })
        }


    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>

            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input type="text" id="name" disabled={isCreating} {...register('name', {
                    required: 'This filed is requried',
                })}/>
            </FormRow>

            <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
                <Input type="number" id="maxCapacity" disabled={isWorking} {...register('maxCapacity', {
                    required: 'This filed is requried',
                    min: {
                        value: 1,
                        message: 'Caappacity should be at least 1'
                    }
                })}/>
            </FormRow>

            <FormRow label="Regular price" error={errors?.regularPrice?.message}>
                <Input type="number" id="regularPrice" disabled={isWorking} {...register('regularPrice', {
                    required: 'This filed is requried',
                })}/>
            </FormRow>


            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input type="number" id="discount" disabled={isWorking} defaultValue={0} {...register('discount', {
                    required: 'This filed is requried',
                    validate: (value) => value <= getValues().regularPrice || "Diiscount should be less than regular price"
                })}/>
            </FormRow>

            <FormRow label="Description for website" error={errors?.description?.message}>
                <Textarea type="number" id="description" disabled={isWorking}
                          defaultValue="" {...register('description', {
                    required: 'This filed is requried',
                })}/>
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput id="image" accept="image/*" {...register("image", {
                    required: isEditSession ? false : "This filed is required"
                })}/>
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
