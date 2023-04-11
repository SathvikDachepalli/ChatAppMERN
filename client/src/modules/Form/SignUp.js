import Input from '../../components/FormInput/Input'
import Button from '../../components/FormInput/Buttons/button'
const SignUp = () => {
  return (
    <>
    <Input 
        label="First Name"
        name="Fname"
        type="text"
        className=""
        isRequired={true}
        placeholder="Enter your first name"
    />
    <Input 
        label="Last Name"
        name="Lname"
        type="text"
        className=""
        isRequired={true}
        placeholder="Enter your Last name"
    />
    <Input 
        label="Phone Number"
        name="Phone"
        type="number"
        className=""
        isRequired={true}
        placeholder="Phone number"
    />
    <Input 
        label="Email"
        name="email"
        type="email"
        className=""
        isRequired={true}
        placeholder="Enter your email"
    />
    <Input 
        label="Password"
        name="pwd"
        type="password"
        className=""
        isRequired={true}
        placeholder="Enter your password"
    />
    <Button value='Sign Up'/>

  </>
  
  )
}
export default SignUp