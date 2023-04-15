import Input from '../../components/FormInput/Input'
import Button from '../../components/FormInput/Buttons/button'
const SignUp = () => {
  return (
    <div  >
    <Input 
        label="First Name"
        name="Fname"
        type="text"
        className="w-[400px]"
        isRequired={true}
        placeholder="Enter your first name"
    />
    <Input 
        label="Last Name"
        name="Lname"
        type="text"
        className="w-[400px]"
        isRequired={true}
        placeholder="Enter your Last name"
    />
    <Input 
        label="Phone Number"
        name="Phone"
        type="number"
        className="w-[400px]"
        isRequired={true}
        placeholder="Phone number"
    />
    <Input 
        label="Email"
        name="email"
        type="email"
        className="w-[400px]"
        isRequired={true}
        placeholder="Enter your email"
    />
    <Input 
        label="Password"
        name="pwd"
        type="password"
        className="w-[400px]"
        isRequired={true}
        placeholder="Enter your password"
    />
    <Button  Mode='Sign Up'/>

  </div >
  
  )
}
export default SignUp