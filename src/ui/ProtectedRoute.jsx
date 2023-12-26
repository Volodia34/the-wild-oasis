import {useUser} from "../features/authentication/useUser.js";
import Spinner from "./Spinner.jsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`
// eslint-disable-next-line react/prop-types
function ProtectedRoute({children}) {
    const navigate = useNavigate()
    // eslint-disable-next-line no-unused-vars
    const {isLoading,isAuthenticated} = useUser()




    useEffect(function () {
        if(!isAuthenticated && !isLoading) navigate("/login")
    }, [isAuthenticated,isLoading,navigate]);

    if(isLoading) return <FullPage><Spinner/></FullPage>


   if(isAuthenticated) return children
}

export default ProtectedRoute;