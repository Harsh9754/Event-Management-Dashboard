import React, { useState } from "react";
import "../styles/Login.css"
import { useNavigate } from "react-router-dom";

function Login() {
    const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Sign Up
    const [data, setData] = useState({name:"",email:"",password:"" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

      const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(e.target.value);
        setData({ ...data, [name]: value });
      };
    const toggleForm = () => {
        setError("");
      setIsLogin(!isLogin);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isLogin){
            fetch("http://localhost:8000/api/admin/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                }
            )
            .then((response) => response.json())
            .then((data)=>{
                console.log("Logged in",data.response)
                localStorage.setItem("jwt", data.response.token)
                setData({ name: "", password: "" });
                navigate("/"); 
            })
        }else{
            // console.log(data)
            fetch("http://localhost:8000/api/admin/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                }
            )
            .then((response) => response.json())
            .then((data)=>{
                console.log("Logged in",data)
                localStorage.setItem("jwt", data.token)
                setData({ name: "", email: "", password: "" });
                navigate("/"); 
            })
        }
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const url = isLogin
    //       ? "http://localhost:8000/api/admin/login"
    //       : "http://localhost:8000/api/admin/signup";
    
    //     try {
    //       const response = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //       });
    
    //       const result = await response.json();
    //       console.log(response);
          
    //       if (!response.ok) {
    //         // Handle errors
    //         setError(result.message || "An error occurred. Please try again.");
    //         return;
    //       }
    
    //       // Store the token and navigate to the home page
    //       localStorage.setItem("jwt", result.response.token);
    //       setData({ name: "", email: "", password: "" });
    //       setError(""); // Clear error

    //       navigate("/"); // Redirect to the home page
    //       if(!isLogin){
    //         navigate('/');
    //       }
    //     } catch (err) {
    //       setError("Something went wrong. Please try again later.");
    //     }
    //   };
//   return (
//     <>
//     <div className="container">
//       <div className="form-wrapper">
//         <h2>{isLogin ? "Login" : "Sign Up"}</h2>
//         <form>
//           {/* Name field (required for both Login and Sign Up) */}
//           <div className="form-group">
//             <label htmlFor="name">Name</label>
//             <input name="name" value={data.name} onChange={handleInputChange} type="text" id="name" placeholder="Enter your name" required />
//           </div>

//           {/* Email field (only for Sign Up) */}
//           {!isLogin && (
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//               name="email"
//                 type="email"
//                 id="email"
//                 placeholder="Enter your email"
//                 required
//                 value={data.email}
//                 onChange={handleInputChange}
//               />
//             </div>
//           )}

//           {/* Password field (common for both) */}
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//                 name="password"
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               required
//               value={data.password}
//               onChange={handleInputChange}
//             />
//           </div>

//           {/* Submit button */}
//           <button type="submit" onClick={handleSubmit} className="submit-btn">
//             {isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>

//         {/* Toggle between Login and Sign Up */}
//         <p>
//           {isLogin
//             ? "Don't have an account?"
//             : "Already have an account?"}{" "}
//           <button className="toggle-btn" onClick={toggleForm}>
//             {isLogin ? "Sign Up" : "Login"}
//           </button>
//         </p>
//       </div>
//     </div>
//     </>
//   )
// }

return (
    <div className="container">
      <div className="form-wrapper">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {/* Name field (required for both Login and Sign Up) */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              value={data.name}
              onChange={handleInputChange}
              type="text"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email field (only for Sign Up) */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          {/* Password field (common for both) */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Error message */}
          {error && <p className="error-message">{error}</p>}

          {/* Submit button */}
          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle between Login and Sign Up */}
        <p>
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button className="toggle-btn" onClick={toggleForm}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login