import { Input, UploadImage } from '@/components'

import styles from './details.module.scss'

function Profile() {
  return (
    <div className={styles.details}>
      <h1>Profile Details</h1>
      <p className={styles.details__description}>
        Add your details to create a personal touch to your profile.
      </p>
      <div className={styles.details__upload_image}>
        <p className={styles.details__upload_image__description}>
          Profile Picture
        </p>
        <div className={styles.details__upload_image__container}>
          <div>
            <UploadImage />
          </div>
          <p className={styles.details__upload_image__container__description}>
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </div>
      </div>
      <div className={styles.details__user_details}>
        <fieldset className={styles.details__user_details__fieldset} >
          <label className={styles.details__user_details__fieldset__label}>First name*</label>
          <Input className={styles.details__user_details__fieldset__input} />
        </fieldset>
        <fieldset className={styles.details__user_details__fieldset} >
          <label className={styles.details__user_details__fieldset__label}>Last name*</label>
          <Input className={styles.details__user_details__fieldset__input} />
        </fieldset>
        <fieldset className={styles.details__user_details__fieldset} >
          <label className={styles.details__user_details__fieldset__label}>Email</label>
          <Input className={styles.details__user_details__fieldset__input} />
        </fieldset>
      </div>
    </div>
  )
}

export default Profile
