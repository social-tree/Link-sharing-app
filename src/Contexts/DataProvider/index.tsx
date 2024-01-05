'use client'

import { IDataContext, ILink } from './DataProvider.types'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { ErrorOption, useFieldArray, useForm } from 'react-hook-form'
import { TPlatformType } from '@/types'
import { TPlatformTypeWithLink } from '@/types/Platform'
import { userType } from '@/types/user'
import { platform } from 'os'

export const DataContext = createContext<IDataContext>({
  addLink: () => {},
  remove: () => {},
  platforms: [],
  control: undefined,
  user: null,
  session: null,
  fields: null,
  register: null,
  watch: null,
  reset: null,
  handleSubmit: null,
  clearErrors: null,
  errors: null,
  setValue: null,
  setError: (name: string, value: ErrorOption) => {},
  notUsedPlatforms: [],
})

export function DataProvider({ children }: { children: ReactNode }) {
  const [platforms, setPlatforms] = useState<TPlatformType[]>([])
  const [user, setUser] = useState<userType | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const supabase = createClientComponentClient()
  const {
    control,
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      links: [] as ILink[],
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
    },
  })

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'links',
  })

  const notUsedPlatforms = useMemo(() => {
    return platforms.filter(
      (platform) =>
        !fields.find((field) => field?.platform?.id === platform?.id)
    )
  }, [watch('links')])

  const addLink = () => {
    const platform = notUsedPlatforms[0]

    append({
      url: ``,
      platform,
      platform_type: platform.id,
    })
  }

  const getUser = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', `${session?.user?.id}`)
      .single()
    if (data) {
      setUser(data)
    }
  }

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    setSession(data.session)
  }

  const getUserPlatforms = async () => {
    const { data, error } = await supabase
      .from('users_platforms')
      .select('*, platform:platforms(*)')
      .eq('user_id', `${session?.user.id}`)

    if (data) {
      replace(data as ILink[])
    }
  }

  const getPlatforms = async () => {
    const { data, error } = await supabase.from('platforms').select('*')
    if (data) {
      setPlatforms(data as TPlatformTypeWithLink[])
    }
  }

  useEffect(() => {
    !session?.access_token && getSession()
    platforms.length === 0 && getPlatforms()
  }, [session])

  useEffect(() => {
    session && fields.length === 0 && getUserPlatforms()
    !user && session && getUser()
  }, [session, user])

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
      console.log(event, session)
      setSession(session)
    })

    return () => {
      supabase.removeChannel(UserInfoChannel)
    }
  }, [supabase])

  const value = {
    addLink,
    user,
    session,
    remove,
    platforms,
    control,
    fields,
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    clearErrors,
    errors,
    setError,
    notUsedPlatforms,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useDataContext = () => useContext(DataContext)
