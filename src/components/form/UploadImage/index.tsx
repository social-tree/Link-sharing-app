'use client'

import { useEffect, useState } from 'react'

import FileBase from 'react-file-base64'
import { UploadImageIcon } from 'icons'
import { UploadImageProps } from './UploadImage.types'
import styles from './UploadImage.module.scss'

export function UploadImage({ onChange, defaultImage }: UploadImageProps) {
  const [file, setFile] = useState('')

  useEffect(() => {
    if (file) onChange(file)
  }, [file])

  useEffect(() => {
    if (defaultImage) setFile(defaultImage)
  }, [defaultImage])

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
        <div
          className={`${styles.uploadImage__container} ${
            file && styles.uploadImage__container_withImage
          }`}
        >
          <UploadImageIcon />
          <h2>{file ? 'Change Image' : '+ Upload Image'}</h2>
        </div>
      </div>
    </div>
  )
}
