import { Button } from '@/components'
import { Input } from '@/components/form'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <Input />
      <Button variant="primary">Login</Button>
    </main>
  )
}
