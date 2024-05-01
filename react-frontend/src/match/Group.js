export default function Group() {
  const handleSubmit = () => {
    console.log('submit not implemented')
  }
  
  return(
    <div id="group">
      <form id='newUserForm' onSubmit={handleSubmit}>

      </form>
    </div>
  )
}