import { ToastContainer, toast } from 'react-toastify';
import { parseCookies } from '@/helpers/index';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useRouter } from "next/router"; 
import Link from "next/link";
import {API_URL} from '@/config/index'
import styles from '@/styles/Form.module.css'
import Layout from "@/components/layout";

export default function AddEventPage({token}) {
  const router = useRouter()

  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const hasEmptyFields = Object.values(values).some((element) => element === '')
    if(hasEmptyFields){
      toast.error('Please fill empty fields')
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(values)
    })

    if(!res.ok){
      if(res.status === 401 || res.status ===403){
        toast.error('Unauthorized')
        return
      }
      toast.error('Something went wrong')
    } else {
      const evt = await res.json()
      router.push(`/events?slug${evt.slug}`)
     }
  }
  
  const handleInputChange = (e) =>{
    const {name ,value} = e.target
    setValues({...values, [name]:value})
  }

  return (
    <Layout title="Add new event">
      <Link href='/events'>Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input 
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Performers</label>
            <input 
              type='text'
              id='performers'
              name='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Venue</label>
            <input 
              type='text'
              id='venue'
              name='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Address</label>
            <input 
              type='text'
              id='address'
              name='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Date</label>
            <input 
              type='date'
              id='date'
              name='date'
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="Time">Time</label>
            <input 
              type='text'
              id='time'
              name='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="Time">Event Description</label>
          <textarea 
            type='text'
            id='description'
            name='description'
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value="Add Event" className='btn' />

      </form>
    </Layout>
  );
}


export async function getServerSideProps({req}){
  const {token} = parseCookies(req)

  return{
    props: {
      token
    }
  }

}