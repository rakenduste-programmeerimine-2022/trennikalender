import axios from "axios"
import jwt_decode from 'jwt-decode'
import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"





/*//token = localStorage.getItem("token")
function parseJwt(token) {

    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

console.log(parseJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhbGx2ZWVAdGx1LmVlIiwiaWQiOiIyOTIwYmQyZC0yYTgyLTQ3YzAtYWFjYS04NmQ2ZWFiZThkNWEiLCJpYXQiOjE2NzA0MzMxOTUsImV4cCI6MTY3MDQzNjc5NX0.XXDo21ORK4m3PD6qZ2Okpj5-1YnLn_skyDXrt65cNH0"))
*/




export default function UserProfile() {
  //let navigate = useNavigate()

  //const { id } = "6375e2afe0893ff9fb804c7d"

//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhbGx2ZWVAdGx1LmVlIiwiaWQiOiJfaWQiLCJpYXQiOjE2NzA0ODU2MjQsImV4cCI6MTY3MDQ4OTIyNH0.9BpO0tnRrhHvDNXzoY_LrBogmi_su9eixbSZduxuWjY";
const token = localStorage.getItem("token")
const decoded = jwt_decode(token); 
//console.log(decoded);
const id = decoded['id'];
console.log(id);

  const [user, setUser] = useState({
    email: "",
    name: "",
    surname: ""
  })

  const { email, name, surname } = user

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    loadUser()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    await axios
      .put(`http://localhost:8080/user/update/` + id, user)
      .then(res => {
        console.log(res)
        if (res.data.message === "UPDATED") {
          //Update here
          setUser(res.data.data)
          //alert("admin updated")
        }
      })
  }

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/`+ id)
    setUser(result.data)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={e => onSubmit(e)}>
            <div className="mb-3">
              <label
                htmlFor="Name"
                className="form-label"
              >
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={e => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="Username"
                className="form-label"
              >
                Surname
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your surname"
                name="username"
                value={surname}
                onChange={e => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="Email"
                className="form-label"
              >
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={e => onInputChange(e)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary"
            >
              Submit
            </button>
            <Link
              className="btn btn-outline-danger mx-2"
              to="/"
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
