import Home from "./pages/Home";
import {Route,Routes} from "react-router-dom"
import Products from "./pages/Products";
import Contacts from "./pages/Contacts";
import Layout from "./layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="products" element={ <Products /> } />
        <Route path="contact" element={<Contacts /> } />
      </Routes>
    </Layout>
  );
}

export default App;
