import { Grid } from "@material-ui/core";
import MainLayout from "./pages/MainLayout";
import { Routes , Route , Navigate} from 'react-router-dom';
import Auth from "./pages/AuthLayout";
import ProtectedRoute from "./pages/AuthLayout/ProtectedRoute";
import { useCookies } from 'react-cookie';
import {useEffect , useState} from 'react'



function App() {
  const [cookie , setCookie ] = useCookies(['token' ,'user']);
  const [isAuth , setIsAuth] = useState(false)
  useEffect(()=>{
      if(cookie.token) setIsAuth(true)
  },[cookie])
  return (
    <Grid container spacing={0}>
        <Routes>
          {/* { login } */}
            <Route path="/auth">
              <Navigate to="/login" />
            </Route>
            <Route path='/login'>
              <Route path="/" element={<Auth />} />
            </Route>

            {/**Dashboard */}
            <Route path='/dashboard'>
              <Navigate to="/"/>
            </Route> 
            <ProtectedRoute path='/*' component={MainLayout} isAuth={isAuth} />
            {/* <Route path='/*' element={<MainLayout />}/> */}
        </Routes>
    </Grid>
  );
}

export default App;
