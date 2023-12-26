import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable.jsx";
import AddCabin from "./AddCabin.jsx";
import CabinTableOperation from "../features/cabins/CabinTableOperation.jsx";

function Cabins() {

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <CabinTableOperation/>
            </Row>

            <Row>
                <CabinTable/>
                <AddCabin/>
            </Row>

        </>
    );
}

export default Cabins;
