import React, { useState } from 'react'
import { AppContent, TopBar, SideBar } from '../components'
import { Container } from 'react-bootstrap'

const DefaultLayout = () => {
  const [isActive, setActive] = useState(false)

  return (
    <>
      <TopBar setActive={setActive} isActive={isActive} />
      <Container>

  
        <div className="container mt-2">
          <div className="row">
            <p>Home / {localStorage.getItem('userRole') }</p>
          </div>

          <div className="row">
            <div className="d-flex">
              <SideBar setActive={setActive} isActive={isActive} />
              <div id="content-wrapper">
                <AppContent />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default DefaultLayout
