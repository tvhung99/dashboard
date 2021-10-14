import { Grid } from "@material-ui/core";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from "./pages/AuthLayout";
import ProtectedRoute from "./pages/AuthLayout/ProtectedRoute";
import MainLayout from "./pages/MainLayout";



function App() {
  const token = useSelector((state) => state.auth.token);
  const [isAuth , setIsAuth] = useState(false)
  useEffect(()=>{
      if(token) setIsAuth(true)
  },[token])
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
            <ProtectedRoute path='//*' component={MainLayout} isAuth={isAuth} />
           

            {/* <Route path='/*' element={<MainLayout />}/> */}
        </Routes>
    </Grid>
  );
}

export default App;
