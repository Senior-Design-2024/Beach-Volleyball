import { useNavigate } from "react-router-dom";
import './App.css'

export default function FourZeroFour() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/')

  return (
    <div id="page-wrapper" className="page-wrapper">
        <h1>404 page not found</h1>
        <button onClick={handleClick}>Go Home</button>
    </div>
  );
}