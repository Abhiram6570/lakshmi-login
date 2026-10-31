
import { useState } from "react";
import "./App.css";




function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[user,setUser]=useState({});
  const [status,setStatus] = useState("");

  const handlerInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlerInputPassword = (e) => {
    setPassword(e.target.value);
  };




  const handlerSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      console.log(data);
      setUser(data.data);
      setStatus(data.message)

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login successful");

    } catch (error) {
      console.log("Error:", error.message);
    }
  };


      




  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 border border-3 border-dark p-3 m-auto">

            <center>
              <h1>Login</h1>
            </center>

            <form
              className="border border-3 border-dark p-3"
              onSubmit={handlerSubmit}
            >

              <div className="field">
                <label htmlFor="email" className="form-label fs-4">
                  Email:
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  id="email"
                  value={email}
                  onChange={handlerInputEmail}
                  required
                />
              </div>

              <div className="field mt-3">
                <label htmlFor="password" className="form-label fs-4">
                  Password:
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  id="password"
                  value={password}
                  onChange={handlerInputPassword}
                  required
                />
              </div>

              <div className="mt-3">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Submit
                </button>
              </div>

            </form>


{status &&  <h1>{status}</h1>}

            {user && 
            <>
            <h2>{user.id}</h2>
            <h2>{user.name}</h2>
            <h2>{user.mobile}</h2>
            </>}

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
