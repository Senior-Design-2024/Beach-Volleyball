import { BasicButton } from '../components/basic_components'

//////////////////
export default function Test() {

  const handleClick = () => console.log("clickedtest")

  /* need a comment on what this is doing */
  return (
    <div>
      <BasicButton onClick={handleClick} buttonText={"test"}></BasicButton>
    </div>
  );
}