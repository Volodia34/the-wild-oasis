import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers.js";
import CreateCabinForm from "./CreateCabinForm.jsx";
import {useState} from "react";
import {useDeleteCabin} from "./useDeleteCabin.js";
import {HiPencil, HiSquare2Stack} from "react-icons/hi2";
import {HiTrash} from "react-icons/hi";
import {useCreateCabin} from "./useCreateCabin.js";

// eslint-disable-next-line no-unused-vars
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

// eslint-disable-next-line no-unused-vars
const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

// eslint-disable-next-line no-unused-vars
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

// eslint-disable-next-line no-unused-vars
const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

// eslint-disable-next-line no-unused-vars
const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;



// eslint-disable-next-line react/prop-types
function CabinRow({cabin}) {
    const [showForm,setShowForm] = useState(false)
    const {isDelting,deleteCabin} = useDeleteCabin()
    // eslint-disable-next-line no-unused-vars
    const {isCreating,createCabin} = useCreateCabin()
    // eslint-disable-next-line react/prop-types,no-unused-vars
    const {id:cabinId,name,maxCapacity,regularPrice,discount,image,description} = cabin

    function handleDuplicate() {
        createCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            image,
            // eslint-disable-next-line no-undef
            description
        })
    }

    return (
        <>
            <TableRow role='row'>
                <Img src={image}/>
                <Cabin>{name}</Cabin>
                <div>Fist up to {maxCapacity} guests</div>
                <Price>{formatCurrency(regularPrice)}</Price>
                {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
                <div>
                    <button disabled={isCreating} onClick={handleDuplicate}><HiSquare2Stack/></button>
                    <button onClick={() => setShowForm((show) => !show)}><HiPencil/></button>
                    <button onClick={() => deleteCabin(cabinId)} disabled={isDelting}><HiTrash/></button>
                </div>
            </TableRow>
            {showForm && <CreateCabinForm cabinToEdit={cabin}/>}
        </>

    );
}

export default CabinRow;