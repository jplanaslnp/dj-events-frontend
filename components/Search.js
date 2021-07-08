import {useState} from 'react'
import router, { useRouter } from 'next/router'
import Styles from '@/styles/Search.module.css'
import { FaHandPointLeft } from 'react-icons/fa'


export default function Search() {
    const [term, setTerm ]= useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        router.push(`events/search?term=${term}`)
        setTerm('')
    }

    return (
        <div className={Styles.search}>
            <form onSubmit={handleSubmit}>
                <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} placeholder='Search Events'/>
            </form>

            
        </div>
    )
}
