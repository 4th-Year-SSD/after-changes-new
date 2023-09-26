import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './topbar.css'
import { logout } from '../../context/commonFunctions'
import Container from 'react-bootstrap/Container'
import Logo from '../../assets/images/logo.png'
import socketIOClient from 'socket.io-client'
import { Menu, Dropdown, message } from 'antd'
import { useState, useEffect } from 'react'

export const socket = socketIOClient('http://localhost:3002')

export default function TopBar(props) {
  const [feeds, setFeeds] = useState([])
  const [isNewFeed, setIsNewFeed] = useState(false)
  useEffect(() => {
    socket.emit('initial_data')
    socket.on('get_data', getData)
    socket.on('change_data', changeData)
    return () => {
      socket.off('get_data')
      socket.off('change_data')
    }
  }, [])

  const getData = (feeds) => {
    if (feeds.length && feeds.some((feed) => feed.read === false)) {
      setIsNewFeed(true)
    } else {
      setIsNewFeed(false)
    }
    setFeeds(feeds)
  }

  const changeData = () => socket.emit('initial_data')

  const handleClick = ({ key }) => {
    message.info(`Clicked on item ${key}`)
  }

  const handleDropdownClick = () => {
    socket.emit('check_all_notifications')
  }

  const menu = (
    <Menu onClick={handleClick}>
      {feeds.length ? (
        feeds.map((feed) => {
          return (
            <Menu.Item key={feed._id}>
              <p>{feed.title}</p>
            </Menu.Item>
          )
        })
      ) : (
        <Menu.Item key="nothing">
          <p>No feeds to show!</p>
        </Menu.Item>
      )}
    </Menu>
  )
  return (
    <>
      {' '}
      <Container>
        <div className="col-md-12 m-0 p-0">
          <nav className="navbar mb-4 font-color">
            <div id="tcontainer" className="container container-topbar">
              <div className="top-logo d-flex justify-content-between">
                <a href="/" className="navbar-brand" id="sidebar-toggle">
                  <img src={Logo} alt="logo"></img>
                </a>
              </div>
              <form className="d-flex search-box">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn font-color topbar-hover " type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
              <div className="btn-group ">
                <button
                  type="button"
                  className="btn dropdown-toggle d-flex align-items-center font-color topbar-hover p-0"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user-circle fa-2x tcontainerbtn" id="iprofile"></i>{' '}
                  {localStorage.getItem('name')}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Setting
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={logout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </Container>
    </>
  )
}
