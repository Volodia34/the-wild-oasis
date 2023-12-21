import supabase, {supabaseUrl} from "./supabase.js";

export async function getCabins() {
    // eslint-disable-next-line no-unused-vars,no-undef
    const {data, error} = await supabase.from('cabins').select('*')
    console.log(data)

    if (error) {
        console.error(error)
        throw new Error('Cabins could not be loaded')
    }

    return data[0]
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
    const imageName = `${newCabin.image.name}`.replaceAll("/", "")
    console.log(newCabin.image.name)
    const imagePath = hasImagePath ? newCabin.image :`${supabaseUrl}/storage/v1/object/public/cabbin-images/${imageName}`
    //https://lybazkvgpdhrzytplqcu.supabase.co/storage/v1/object/public/cabbin-images/cabin-001.jpg
    let query = supabase.from("cabins")

    if(!id) query = query.insert([{...newCabin, image: imagePath}])

    if(id) query = query.update({...newCabin, image: imagePath})
            .eq('id', id)
            .select()

    const {data,error} = await query
    if (error) {
        console.error(error)
        throw new Error('Cabins could not be created')
    }
    if(hasImagePath) return data;

    const {error: storageError} = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)


    if (storageError) {
        console.log(storageError)
        throw new Error("Cabin image could not be uloaded and cabin was not created")
    }
    return data


}

export async function deleteCabin(id) {
    const {data, error} = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('Cabins could not be deleted')
    }

    return data

}