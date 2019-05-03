import React from 'react'
import PropTypes from 'prop-types'

const ACTIVE_COLOR = '#6c6c6c'
const STALE_COLOR = 'white'

export default function FileInput({ onChange, uid }) {
  return (
    <form encType="multipart/form-data">
      <input
        type="file"
        name="fiile"
        onChange={onChange}
        className="inputfile"
        accept="image/x-png,image/jpeg"
        id={uid}
      />
      <label htmlFor={uid} aria-label="Add image">
        +
      </label>
      <style jsx>{`
        .inputfile {
          width: 0.1px;
          height: 0.1px;
          opacity: 0;
          overflow: hidden;
          position: absolute;
          z-index: -1;
        }

        .inputfile + label {
          cursor: pointer;
          font-size: 1.5em;
          line-height: 0em;
          text-shadow: rgba(0, 0, 0, 0.8) 0px 0px 6px;
          box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.4);
          border-radius: 50%;
          min-height: 1em;
          border: 4px solid ${STALE_COLOR};
          padding: 0.625em 1em;
          color: ${STALE_COLOR};
        }

        .inputfile:focus + label,
        .inputfile + label:hover {
          border-color: ${ACTIVE_COLOR};
          color: ${ACTIVE_COLOR};
          text-shadow: ${STALE_COLOR} 0px 0px 6px;
        }
      `}</style>
    </form>
  )
}

FileInput.propTypes = {
  onChange: PropTypes.func,
  uid: PropTypes.string.isRequired
}
