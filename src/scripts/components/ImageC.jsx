import React, { Component } from 'react'
import PropTypes from 'prop-types'

const SHARED_STYLES = `
    min-height: 300px;
    max-width: 200px;
    min-width: 200px;
    border-radius: 1em;
`

export default class ImageC extends Component {
  constructor(props) {
    super(props)
  }

  getImageUrlFromBlob() {
    return window.URL.createObjectURL(new Blob([this.props.file]))
  }

  render() {
    if (this.props.file) {
      const tempPath = this.getImageUrlFromBlob()
      return (
        <>
          <div
            className="image-avatar"
            style={{ backgroundImage: 'url(' + tempPath + ')' }}
          />
          <style jsx>{`
            .image-avatar {
              background-position: center;
              background-size: cover;
              ${SHARED_STYLES}
            }
          `}</style>
        </>
      )
    } else {
      return (
        <>
          <div className="empty-avatar" />
          <style jsx>{`
            .empty-avatar {
              background-color: #ccc;
              ${SHARED_STYLES}
            }
          `}</style>
        </>
      )
    }
  }
}

ImageC.propTypes = {
  file: PropTypes.object
}
