import { NavLink } from 'react-router-dom'
import './userSidebar.scoped.css'
import { useRef } from 'react'

export default function SideBar(props) {
  const ref = useRef(null)
  return (
    <nav
      id="sidebar"
      ref={ref}
      className={
        (props.isActive ? 'active ' : '') +
        'sidebar tw-mt-4 tw-min-h-full tw-w-64 tw-bg-white tw-border-r     tw-shadow-x'
      }
    >
      {localStorage.getItem('role') === 'SELLER' ? (
        <ul className="list-unstyled components font-color tw-ml-3">
    
          <li>
            <NavLink
              to="/user/dashboard"
              className={({ isActive }) =>
                isActive ? 'font-color side-link selected' : 'font-color side-link '
              }
            >
              <i className="fa fa-cubes" aria-hidden="true"></i>
              {!props.isActive ? <small> Dashboard</small> : <small> </small>}
            </NavLink>
          </li>
          <li>
            <a
              href="#customer"
              className={`font-color  side-link ${!props.isActive ? 'dropdown-toggle' : ''}`}
              data-toggle="collapse"
              aria-expanded="false"
            >
              <i className="fa fa-users" aria-hidden="true"></i>
              {!props.isActive ? <small> Product Management</small> : <small> </small>}
            </a>
            <ul className="collapse list-unstyled font-color" id="customer">
              <li>
                <NavLink
                  to="./product-management/products"
                  className={({ isActive }) =>
                    isActive ? 'font-color side-link selected' : 'font-color side-link '
                  }
                >
                  <i className="fas fa-user"></i>
                  {!props.isActive ? <small>All Products</small> : <small> </small>}
                </NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink
              to="./seller-reviews"
              className={({ isActive }) =>
                isActive ? 'font-color side-link selected' : 'font-color side-link '
              }
            >
              <i className="fa fa-cubes" aria-hidden="true"></i>
              {!props.isActive ? <small className="tw-"> Reviews</small> : <small> </small>}
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="list-unstyled components font-color tw-ml-3">
          <li className="text-center font-weight-bold">
            {!props.isActive ? (
              <img id="rimage-title" alt="bit-logo"></img>
            ) : (
              <img alt="mini-logo"></img>
            )}
          </li>
         <li>
            <NavLink
                                to="./orderview"
              className={({ isActive }) =>
                isActive ? 'font-color side-link selected' : 'font-color side-link '
              }
            >
              <i className="fa fa-cubes" aria-hidden="true"></i>
              {!props.isActive ? <small className="tw-"> My Orders</small> : <small> </small>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="./buyer-reviews"
              className={({ isActive }) =>
                isActive ? 'font-color side-link selected' : 'font-color side-link '
              }
            >
              <i className="fa fa-cubes" aria-hidden="true"></i>
              {!props.isActive ? <small className="tw-"> Reviews</small> : <small> </small>}
            </NavLink>
          </li>
       
    
        
        </ul>
      )}
   
    </nav>
  )
}
