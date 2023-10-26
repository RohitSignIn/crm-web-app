// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

import MainRoutes from "./routes/MainRoutes";

// import { signin } from './redux/slices/authSlice';

function App() {
  // const dispatch = useDispatch();

  // async function getProducts() {
  //   const res = await dispatch(signin());
  // }

  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <>
      <MainRoutes />
    </>
  );
}

export default App;
