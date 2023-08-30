import { Control, FieldValues, useFieldArray, useForm } from 'react-hook-form'
import { IDataContext, ILink, IPlatform, TControl } from './DataProvider.types'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import shortUUID from 'short-uuid'

export const DataContext = createContext<any>({
    addLink: () => {},
    remove: () => {},
    platforms: [],
    control: {} as TControl
})


async function fetchPlatforms(): Promise<IPlatform[]>{
   const response = await fetch("http://localhost:3000/api/platforms", {
        next: {
            revalidate: 3600
        }
    })

    return response.json()
}

export function DataProvider({ children }: { children: ReactNode }) {

    const [platforms, setPlatforms] = useState<IPlatform[]>([])

    const { control, register, setValue, getValues } = useForm({
        defaultValues: {
            links: [] as ILink[],
            firstName: "",
            lastName: "",
            email: "",
            profileImage: ""
        }
    })
    
    const { fields, append, remove } = useFieldArray({ control, name: "links" })

    const addLink = () => {
        const platform = platforms[fields.length] || platforms[0]
        
        append({
            url: platform.url,
            platform
        })
        
    }


    console.log(getValues())

    const getPlatforms = async () => {
        const platforms = await fetchPlatforms()
        setPlatforms(platforms)
    }

    useEffect(() => {
        getPlatforms()
    }, [])

    const value = {
        addLink,
        remove,
        platforms,
        control,
        fields,
        register,
        setValue
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext)