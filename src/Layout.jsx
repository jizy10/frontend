import './App.css';
import { Outlet } from "react-router-dom"; // Removed useLocation since it's not needed

const Layout = () => {
  return (
    <div id="app">
   
      <main>
        <Outlet /> 
      </main>
      
    </div>
  );
};

export default Layout;
