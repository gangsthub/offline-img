// @ts-check

/* eslint-disable no-console */
import React, { useState } from 'react'

import FileInput from './FileInput'
import ImageC from './ImageC'
import db from '../db/keyValueStore'
import bytesToSize from '../utils/fileSize'

const FILE_EVENTS = {
  ON_READ: 'load'
}

export default function App() {
  const [fileObject, setFileObject] = useState(undefined)
  const [fileDimensions, setFileDimensions] = useState({ width: 0, height: 0 })

  /**
   * @param {{ target: { files: FileList | ArrayLike<any>; }; }} event
   */
  const onChange = event => {
    const filesList = Array.from(event.target.files)

    if (!filesList.length) return

    const imageBlob = filesList[0]

    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    const reader = new FileReader()
    reader.onloadend = () => getImageData(imageBlob)
    reader.addEventListener(FILE_EVENTS.ON_READ, e =>
      saveFile(e, imageBlob.name)
    )
    reader.readAsText(imageBlob) // to be saved
    setFileObject(imageBlob)
  }

  /**
   * @param { any } event
   */
  const saveFile = (event, name) => {
    const readedFileContent = event.target.result
    db.set(name, readedFileContent)
    console.log('saved')
  }

  /**
   * @param { File } file
   */
  const getImageData = file => {
    const img = new Image()
    const objUrl = window.URL.createObjectURL(new Blob([file]))
    img.onload = function() {
      setFileDimensions({ width: img.width, height: img.height })
    }
    img.src = objUrl
  }

  const onSend = async () => {
    const f = await db.get(fileObject.name)
    console.log(f)
  }

  return (
    <main className="app">
      <div className="upload-zone">
        <div className="file-container">
          <FileInput onChange={onChange} uid="1" />
        </div>

        <div className="image-container">
          <ImageC file={fileObject} />
        </div>
      </div>

      {fileObject && fileObject.name ? (
        <pre>
          <code>
            {`
  name: ${fileObject.name}
  size: ${bytesToSize(fileObject.size)}
  width: ${fileDimensions.width}px
  height: ${fileDimensions.height}px
            `}
          </code>
        </pre>
      ) : null}

      <div>
        <button className="send" onClick={onSend}>
          Send
        </button>
      </div>
      <style jsx>{`
        .app {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          min-height: 100vh;
        }
        .upload-zone {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .file-container {
          position: absolute;
          bottom: 2.8em;
          right: 1.7em;
        }
        .image-container {
          margin: 1em;
        }
      `}</style>
    </main>
  )
}
