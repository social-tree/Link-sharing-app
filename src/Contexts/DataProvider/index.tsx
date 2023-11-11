import { IDataContext, ILink, TControl } from './DataProvider.types'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { useFieldArray, useForm } from 'react-hook-form'

import { TPlatformType } from '@/types'
import { supabase } from '@/libs/Supabase'
import { userType } from '@/types/user'

export const DataContext = createContext<IDataContext>({
  /*   addLink: () => {}, */
  remove: () => {},
  platforms: [],
  control: {} as TControl,
  user: null,
  session: null,
})

export function DataProvider({ children }: { children: ReactNode }) {
  const [platforms, setPlatforms] = useState<TPlatformType[]>([])
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<userType | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const { control, register, setValue, getValues } = useForm({
    defaultValues: {
      links: [] as ILink[],
      firstName: '',
      lastName: '',
      email: '',
      profileImage: '',
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'links' })

  /*   const addLink = () => {
    const platform = platforms[fields.length] || platforms[0]

    append({
      url: platform.url,
      platform,
    })
  } */

  const getUser = async () => {
    const { data, error } = await supabase.from('users').select('*').single()
    setUser(data)
  }

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    setSession(data.session)
  }

  useEffect(() => {
    getUser()
    getSession()
  }, [])

  useEffect(() => {
    const UserInfoChannel = supabase
      .channel('myUser')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'users' },
        (payload) => {
          setUser(
            (payload.new as userType) || (payload.old as userType) || null
          )
        }
      )
      .subscribe()

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })

    return () => {
      supabase.removeChannel(UserInfoChannel)
    }
  }, [supabase])

  const value = {
    /* addLink, */
    user,
    session,
    remove,
    platforms,
    control,
    fields,
    register,
    setValue,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useDataContext = () => useContext(DataContext)
