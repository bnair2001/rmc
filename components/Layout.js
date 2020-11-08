import { Container } from "reactstrap";
import NavbarRMC from "./Navbar";

export default function Layout({ children }) {
    return (
    <div>
        <NavbarRMC/>
        <Container >
            {children}
        </Container>
        
    </div>);
}