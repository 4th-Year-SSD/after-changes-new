import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import Logo from '../../assets/logo.png'
import { Image } from 'react-bootstrap'
import { logout } from '../../context/commonFunctions'
import CategoryIcon from '../../assets/images/navbar-icon/catagories-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form'
import { Link, NavLink } from 'react-router-dom'
import './topnav.scoped.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import React from 'react'
import socketIOClient from 'socket.io-client'
import { Menu, Dropdown, message, Badge } from 'antd'

export const socket = socketIOClient('http://localhost:3002')
function TopNav() {
  const [noOfItems, setNoOfItems] = React.useState(0)

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  }

  //get no of items in the cart

  //notification
  const fetchCartCount = () => {
    if (localStorage.getItem('role') === 'BUYER') {
      axios
        .get('http://localhost:3004/api/cart/getCartCount/642d7b2fadc38c896ac0a75e', config)
        .then((response) => {
          setNoOfItems(response.data.count)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  useEffect(() => {
    fetchCartCount()
  }, [])

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
    setFeeds(feeds.filter((feed) => feed.userID === localStorage.getItem('id')))
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
              <p>{feed.message}</p>
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
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/">
          {' '}
          <Image src={Logo} />{' '}
        </Navbar.Brand>
        <div className="ms-5 me-5 d-flex align-items-center">
          <Form inline>
            <div className="position-relative">
              <Form.Control type="text" placeholder="Search" />
              <FontAwesomeIcon
                icon={faSearch}
                className="position-absolute top-50 end-0 translate-middle-y pe-2"
              />
            </div>
          </Form>
          <div>
            <div className="d-flex align-items-center">
              <button
                type="button"
                className="btn ms-3 me-2"
                data-bs-toggle="collapse"
                data-bs-target="#categories-menu"
              >
                <img src={CategoryIcon} alt="Categories Menu" />
              </button>
              <small className="text-muted fw-bold">Categories</small>
            </div>

            <div className="collapse nav-categories" id="categories-menu">
              <ul className="list-unstyled">
                <li>
                  <NavLink to="/orderview">My Orders</NavLink>
                </li>
                <li>
                  <NavLink to="/category2">Category 2</NavLink>
                </li>
                <li>
                  <NavLink to="/category3">Category 3</NavLink>
                </li>
                <li>
                  <NavLink to="/category4">Category 4</NavLink>
                </li>
                <li>
                  <NavLink to="/category5">Category 5</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/*<Nav className="me-auto">*/}
          {/*  <Nav.Link href="/">Home</Nav.Link>*/}
          {/*  <Nav.Link href="/about">About</Nav.Link>*/}
          {/*  <Nav.Link href="/buyers">Buyers</Nav.Link>*/}
          {/*  <Nav.Link href="#contact-us">Contact</Nav.Link>*/}
          {/*</Nav>*/}

          {!localStorage.getItem('token') && (
            <Nav className="m-auto me-0">
              <Nav.Link href="/login">
                <Button
                  variant="text"
                  style={{ backgroundColor: '#ffffff', border: '1px solid #383634' }}
                >
                  Login
                </Button>
              </Nav.Link>
              <Nav.Link eventKey={2} href="/registration-intro">
                <Button style={{ backgroundColor: '#383634', border: '1px solid #ffffff' }}>
                  Signup
                </Button>
              </Nav.Link>
            </Nav>
          )}
          {localStorage.getItem('token') && (
            <div className="ms-auto me-3">
              <div className="d-flex align-items-center">
                {/* <FontAwesomeIcon icon={faBell} /> */}
                <div>
                  <Dropdown overlay={menu} trigger={['click']} onClick={handleDropdownClick}>
                    {isNewFeed ? (
                      <Badge dot>
                        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                          <FontAwesomeIcon icon={faBell} style={{ color: 'blue' }} />
                        </a>
                      </Badge>
                    ) : (
                      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faBell} style={{ color: 'blue' }} />
                      </a>
                    )}
                  </Dropdown>
                </div>
                <div className="btn-group ms-5">
                  <button
                    type="button"
                    className="btn dropdown-toggle d-flex align-items-center font-color topbar-hover p-0"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <p className="tw-ml-5">{localStorage.getItem('name')}</p>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      {localStorage.getItem('role') === 'ADMIN' ? (
                        <a className="dropdown-item" href="/admin/dashboard">
                          Profile
                        </a>
                      ) : (
                        <a className="dropdown-item" href="/user/dashboard">
                          Profile
                        </a>
                      )}
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
            </div>
          )}
        </Navbar.Collapse>
        {localStorage.getItem('role') === 'BUYER' ? (
          <div className="ms-5 me-3 d-flex justify-content">
            <Link to="/shoppingcart">
              <div className="cart">
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>{noOfItems}</span>
              </div>
            </Link>
            <div className="ms-2">
              <small className="text-muted fw-bold">Cart</small>
            </div>
          </div>
        ) : (
          <></>
        )}
      </Container>
    </Navbar>
  )
}

export default TopNav
