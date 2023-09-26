import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Form from 'react-bootstrap/Form'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './sideDrawerItem.css'

export default function SideDrawerItem() {
  return (
    <div className="item-filter">
      <h4 className="tw-font-bold">Filter</h4>
      <br />
      <h4>Brand</h4>
      <br />
      <Form inline>
        <div className="position-relative">
          <Form.Control type="text" placeholder="Name of brand" />
          <FontAwesomeIcon
            icon={faSearch}
            className="position-absolute top-50 end-0 translate-middle-y pe-2"
          />
        </div>
        <br />
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Artisana" id="artisana" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Barney" id="barney" />
        </Form.Group>
      </Form>
      <h4>Form</h4>
      <br />
      <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="Prepackaged" id="prepackaged" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="On Weight" id="onWeight" />
      </Form.Group>
    </div>
  )
}
