import DropZone from './DropZone'
import React from 'react'
import Spinner from './Spinner'
import Tempalink from './Tempalink'
import UploadActions from '../actions/UploadActions'
import UploadStore from '../stores/UploadStore'
import socket from 'filepizza-socket'
import { formatSize } from '../util'

export default class UploadPage extends React.Component {

  constructor() {
    super()
    this.state = UploadStore.getState()

    this._onChange = () => {
      this.setState(UploadStore.getState())
    }

    this.uploadFile = this.uploadFile.bind(this)
  }

  componentDidMount() {
    UploadStore.listen(this._onChange)
  }

  componentWillUnmount() {
    UploadStore.unlisten(this._onChange)
  }

  uploadFile(file) {
    UploadActions.uploadFile(file)
  }

  handleSelectedFile(event) {
    let files = event.target.files
    if (files.length > 0) {
      UploadActions.uploadFile(files[0])
    }
  }

  render() {
    switch (this.state.status) {
      case 'ready':

        return <DropZone onDrop={this.uploadFile}>
          <div className="page">

            <Spinner dir="up" />

            <h1>文件速递</h1>
            <p>F文件速递 - 通过网页点对点传输文件.</p>
            <p>我们不储存文件，仅通过点对点传输.</p>
            <p>
              <label className="select-file-label">
                <input type="file" onChange={this.handleSelectedFile} required/>
                <span>select a file</span>
              </label>
            </p>
          </div>
        </DropZone>

      case 'processing':
        return <div className="page">

          <Spinner dir="up" animated />

          <h1>FilePizza</h1>
          <p>Processing...</p>

        </div>

      case 'uploading':
        return <div className="page">

          <h1>FilePizza</h1>
          <Spinner dir="up" animated
            name={this.state.fileName}
            size={this.state.fileSize} />

          <p>把链接分享给下载者</p>
          <p>此网页在关闭前，下载链接一直有效.</p>
          <p>Peers: {this.state.peers} &middot; Up: {formatSize(this.state.speedUp)}</p>
          <Tempalink token={this.state.token} />

        </div>
    }
  }

}
