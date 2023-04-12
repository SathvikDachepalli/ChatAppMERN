import Input from '../../components/FormInput/Input'
import Button from '../../components/FormInput/Buttons/button'
const Login = ({
  value= 'Login',
}) => {
  return (
    <> 
      <Input 
          label="Email / Phone Number"
          name="email"
          type="email"
          className="w-[400px]"
          isRequired={true}
          placeholder="Enter your Email / Phone number"
      />
      <Input 
          label="Password"
          name="pwd"
          type="password"
          className="w-[400px]"
          isRequired={true}
          placeholder="Enter your password"
      />
      <Button value='Login'/> 
    </>
  )
}

export default Login