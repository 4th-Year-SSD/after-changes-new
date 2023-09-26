import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form'
const Footer = () => {
  const navigate = useNavigate()
  return (
    <div class=" tw-w-128 tw-bg-[#EDEAE7] tw-h-64">
      <Container>
        {' '}
        <div class="tw-flex tw-justify-between tw-items-center  tw-p-5 tw-h-64">
          <div class=" tw-w-72 tw-h-32 tw-block">
            <h2 className="tw-font-bold"> Herbel</h2>
            <div className="tw-mt-3">
              {' '}
              <small>SLIIT Herbal</small>
            </div>
            <div>
              {' '}
              <small>Herba Medic Ltd.</small>
            </div>
          </div>
          <div class="tw-w-32 tw-h-32">
            <h2 className="tw-font-bold"> Company</h2>
            <div className="tw-mt-3">
              {' '}
              <small
                onClick={() => {
                  navigate('/aboutus')
                }}
                className="tw-cursor-pointer"
              >
                About
              </small>
            </div>
            <div>
              {' '}
              <small>Store</small>
            </div>
            <div>
              {' '}
              <small
                onClick={() => {
                  navigate('/faq')
                }}
                className="tw-cursor-pointer"
              >
                FAQ
              </small>
            </div>
          </div>
          <div class=" tw-w-32 tw-h-32">
            <h2
              className="tw-font-bold tw-cursor-pointer"
              onClick={() => {
                navigate('/services')
              }}
            >
              {' '}
              Service
            </h2>
            <div className="tw-mt-3">
              {' '}
              <small>Delivery</small>
            </div>
            <div>
              {' '}
              <small>Payment</small>
            </div>
            <div>
              {' '}
              <small>Contacts</small>
            </div>
          </div>
          <div class=" tw-w-32 tw-h-32">
            <h2 className="tw-font-bold"> Follow us</h2>
            <div className="tw-mt-3">
              {' '}
              <small>Instagram</small>
            </div>
            <div>
              {' '}
              <small>Facebook</small>
            </div>
            <div>
              {' '}
              <small>Twitter</small>
            </div>
          </div>
          <div class=" tw-w-96 tw-h-32">
            <h2 className="tw-font-bold"> Get our newsletters</h2>
            <div className="tw-mt-3">
              {' '}
              <Form inline>
                <div className="position-relative ">
                  <Form.Control className="tw-h-10" type="email" placeholder="Your email" />
                  <FontAwesomeIcon
                    icon={faCheckSquare}
                    size="3x"
                    className="position-absolute top-50 end-0 translate-middle-y pe-0  tw-mt-0.5 tw-mr-0 tw-mb-0.5"
                  />
                </div>
              </Form>
            </div>
            <div>
              {' '}
              <small>Herba Medic Ltd.</small>
            </div>
          </div>
        </div>
      </Container>
      <div className="tw-flex tw-font-bold tw-bg-[#EDEAE7] tw-justify-center tw-items-center">
        <div>Copyright 2022 &copy; SLIIT. All Rights Reserved.</div>{' '}
      </div>
    </div>
  )
}

export default Footer
