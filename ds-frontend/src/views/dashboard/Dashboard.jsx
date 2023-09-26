import './dashboard.css'
import { useState, useEffect } from 'react'
import { axiosInstance } from '../../services/core/axios'
import axios from 'axios'
export default function Home() {
  const clickButton = () => {
    axiosInstance
      .put(`/user/${localStorage.getItem('user_id')}`)
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          console.log(res)
        } else console.log(res.status)
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
      const response = await fetch('http://localhost:3001/csrf', {
        credentials: 'include',
      })
      const data = await response.json()
      localStorage.setItem('token', data.token)
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
