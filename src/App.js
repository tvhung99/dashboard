import { Grid } from "@material-ui/core";
import MainLayout from "./pages/MainLayout";
import { Routes , Route , Navigate} from 'react-router-dom';
import Auth from "./pages/AuthLayout";

function App() {
  return (
    <Grid container spacing={1}>
      
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
            <Route path='/*' element={<MainLayout />}/>
        </Routes>
    </Grid>
  );
}

export default App;
