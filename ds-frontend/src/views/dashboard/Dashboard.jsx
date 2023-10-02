import './dashboard.css'
import { useState, useEffect } from 'react'
import { axiosInstance } from '../../services/core/axios'
export default function Home() {
  const [csrf_token,setCsrfToken] = useState()
  const clickButton = () => {
    axiosInstance
      .put(`/user/${localStorage.getItem('user_id')}`, { csrf_token: csrf_token })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          console.log(res)
        } 
      })
      .catch((error) => {
       console.log(error)
      })
      .then(() => {
        // always executed
      })
  }

  useEffect(() => {
    async function fetchToken() {
      const response = await fetch(`${process.env.REACT_APP_DOMAIN}csrf`, {
        credentials: 'include',
      })
      const data = await response.json()
      setCsrfToken(data)
    }

    fetchToken()
  }, [])

  return (
    <>
      <div className="row">
        <div className="card">
          <h2 className="content-title">Test</h2>
          <p>Lorem ipsum...</p>
          <button className="tw-bg-black tw-w-10 tw-h-4" onClick={clickButton}></button>
        </div>
      </div>
    </>
  )
}
