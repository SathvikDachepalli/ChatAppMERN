import { useNavigate } from 'react-router-dom'

const Button = ({Mode}) => {


  const navigate = useNavigate();
  const handleSent = async(data)=>{
    console.log("data:>> ",data )
    console.log(data)
    const res= await fetch(`http://localhost:8000/api/${Mode==="Sign Up"?'register':'login'}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
    const result=await res.json()
    console.log("result:>> ",result);
    if(result.token){
      localStorage.setItem("user:token",result.token);
      localStorage.setItem("details",JSON.stringify(result.details));
      navigate('/')
    }
    else{
      console.log(result)
      alert(result.error);
    }
  }



  function onClick(){
  const email = document.getElementById("email").value;
  const pwd = document.getElementById("pwd").value;
  if (Mode==='Sign Up'){
    const Fname = document.getElementById("Fname").value;
    const Lname = document.getElementById("Lname").value;
    const Phone = document.getElementById("Phone").value;
    //Extact data from a uploaded image
    const image = document.getElementById("image").files[0];
    console.log(image)
    if(Fname==="" || Lname ==="" || Phone==="" || email===""|| pwd===""){
      alert("Insert all values");
    } else {
      handleSent({
         Fname:Fname,
         Lname:Lname,
         phone:Phone,
         email:email,
         password:pwd,
        image:image
      })
    }
  } else {
    if(email===""||pwd===""){
      alert("Enter Email and Password");
    } else {
      handleSent({
        email: email,
        password: pwd
      })
    }
  }
}
  return (
    <div className='pt-5 '>
        <button className='bg-gray-600 w-96 border-slate-700 text-white divide-zinc-800 pt-2 pr-5 pl-5 pb-2 rounded-lg' onClick={onClick}> {Mode} </button>
    </div>
  )
}

export default Button