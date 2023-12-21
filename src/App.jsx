import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import Dashboard from "./pages/Dashboard.jsx";
import Cabins from "./pages/Cabins.jsx";
import Users from "./pages/Users.jsx";
import Settings from "./pages/Settings.jsx";
import Account from "./pages/Account.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";
import Bookings from "./pages/Bookings.jsx";
import {Toaster} from "react-hot-toast";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // staleTime: 60 * 1000
            staleTime: 0
        }
    }
})
const App = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false}/>
                <GlobalStyles/>
                <BrowserRouter>
                    <Routes>

                        <Route element={<AppLayout/>}>
                            <Route index element={<Navigate replace='dashboard' to='dashboard'/>}/>
                            <Route path='dashboard' element={<Dashboard/>}/>
                            <Route path='bookings' element={<Bookings/>}/>
                            <Route path='cabins' element={<Cabins/>}/>
                            <Route path='users' element={<Users/>}/>
                            <Route path='settings' element={<Settings/>}/>
                            <Route path='accaunt' element={<Account/>}/>
                        </Route>

                        <Route path='login' element={<Login/>}/>
                        <Route path='*' element={<PageNotFound/>}/>


                    </Routes>
                </BrowserRouter>

                <Toaster position="top-center"
                         gutter={12}
                         containerStyle={{margin: '8px'}}
                         toastOptions={{
                             success: {
                                 duration: 3000
                             },
                             error: {
                                 duration: 5000
                             },
                             style: {
                                 fontStyle: '16px',
                                 maxWidth: '500px',
                                 padding: '16px 24px',
                                 backgroundColor: 'var(--color-grey-0)',
                                 color: 'var(--color-grey-700)'
                             }
                         }}/>
            </QueryClientProvider>
        </>

    );
};

export default App;