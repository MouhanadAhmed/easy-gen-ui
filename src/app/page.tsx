

// main index page of the website each section seperated in sections , can be customized from components/sections files
// please read the documentation for more information

import { ToastContainer } from "react-toastify";
import AuthCard from "../components/Auth/AuthCard";

const Home = () => {
  // dev by (nisalk @ Devocade)
  return (
    <main className="pb-4">
<AuthCard/>
    </main>
  );
};

export default Home;
