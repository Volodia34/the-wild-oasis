// eslint-disable-next-line no-unused-vars,react/prop-types


import Select from "./Select.jsx";
import {useSearchParams} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function StortBy({options}) {
    const [searchParms,setSearchParams] = useSearchParams()
    const sortBy = searchParms.get('sortBy') || ''
    function handleChange(e) {
        searchParms.set('sortBy',e.target.value)
        setSearchParams(searchParms)
    }
    return (
        <Select options={options} type='white' value={sortBy} onChange={handleChange}/>
    );
}

export default StortBy;