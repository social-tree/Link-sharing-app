'use client'

import FileBase from 'react-file-base64'
import { UploadImageIcon } from 'icons'
import styles from './UploadImage.module.scss'
import { useState } from 'react'

export function UploadImage() {
  const [file, setFile] = useState('')

  return (
    <div className={styles.uploadImage}>
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }: { base64: string }) => setFile(base64)}
      />
      <div
        className={`${styles.uploadImage__image} ${
          file && styles.uploadImage__image_withImage
        }`}
        style={{ backgroundImage: `url(${file})` }}
      >
        <div className={styles.uploadImage__container}>
          <UploadImageIcon />
          <h2>{file ? 'Change Image' : '+ Upload Image'}</h2>
        </div>
      </div>
    </div>
  )
}

