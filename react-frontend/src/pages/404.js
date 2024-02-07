import { useNavigate } from "react-router-dom";
import { BasicButton } from "../components/basic_components";

//////////////////
export default function FourZeroFour() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/')

  return (
    <div>
        <h1>404 page not found</h1>
        <BasicButton onClick={handleClick} buttonText="Go home"></BasicButton>
    </div>
  );
}