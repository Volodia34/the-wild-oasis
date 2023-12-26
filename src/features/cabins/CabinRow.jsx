import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers.js";
import CreateCabinForm from "./CreateCabinForm.jsx";
import {useDeleteCabin} from "./useDeleteCabin.js";
import {HiPencil, HiSquare2Stack} from "react-icons/hi2";
import {HiTrash} from "react-icons/hi";
import {useCreateCabin} from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

// eslint-disable-next-line no-unused-vars
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;
//
//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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
    // eslint-disable-next-line no-unused-vars
    const {isDelting, deleteCabin} = useDeleteCabin()
    // eslint-disable-next-line no-unused-vars
    const {isCreating, createCabin} = useCreateCabin()
    // eslint-disable-next-line react/prop-types,no-unused-vars
    const {id: cabinId, name, maxCapacity, regularPrice, discount, image, description} = cabin

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
            <Table.Row role='row'>
                <Img src={image}/>
                <Cabin>{name}</Cabin>
                <div>Fist up to {maxCapacity} guests</div>
                <Price>{formatCurrency(regularPrice)}</Price>
                {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
                <div>
                    <Modal>

                        <Menus.Menu>
                            <Menus.Toggle id={cabinId}/>

                            <Menus.List id={cabinId}>
                                <Menus.Button icon={<HiSquare2Stack/>}
                                              onClick={handleDuplicate}>Duplicate</Menus.Button>
                                <Modal.Open opens='edit'>
                                    <Menus.Button icon={<HiPencil/>}>Edit</Menus.Button>
                                </Modal.Open>
                                <Modal.Open opens='delete'>
                                    <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
                                </Modal.Open>

                            </Menus.List>


                            <Modal.Window name='edit'>
                                <CreateCabinForm cabinToEdit={cabin}/>
                            </Modal.Window>


                            <Modal.Window name='delete'>
                                <ConfirmDelete resourceName='cabins' disabled={isDelting}
                                               onConfirm={() => deleteCabin(cabinId)}/>
                            </Modal.Window>


                        </Menus.Menu>
                    </Modal>
                </div>
            </Table.Row>

        </>

    );
}

export default CabinRow;