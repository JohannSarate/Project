import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import NewProject from "./components/pages/NewProject";
import Contact from "./components/pages/Contact";
import Projects from "./components/pages/Projects";
import Project from "./components/pages/Project";


import Container from "./components/layout/Container";
import NavBar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";



function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass="min_heigth">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route  path="/projects" element={<Projects />}></Route>
          <Route  path="/company" element={<Company />}></Route>
          <Route  path="/contact" element={<Contact />} />
          <Route  path="/newproject" element={<NewProject />}></Route>
          <Route  path="/project/:id" element={<Project />}></Route>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
