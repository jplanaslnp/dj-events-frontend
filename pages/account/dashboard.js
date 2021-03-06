import Layout from '@/components/layout';
import DashboardEvent from '@/components/DashboardEvent';
import { API_URL } from '@/config/index';
import { parseCookies } from '@/helpers/index';
import styles from '@/styles/Dashboard.module.css'
import { useRouter } from 'next/router';


export default function DashboardPage({events, token}) {
    const router = useRouter()

    const deleteEvent = async (id) => {
        if(confirm('Are you shure?')){
          const res = await fetch(`${API_URL}/events/${id}`, {
            method: 'DELETE',
            headers:{
                Authorization: `Bearer ${token}`
            }
          })
    
          const data = await res.json()
          if(!res.ok){
            if(res.status === 401 || res.status ===403){
                toast.error('Unauthorized')
                return
            }
            toast.error(data.message)
          } else {
            router.reload()
          }
        }
    }

    return (
        <Layout title='User Dashboard'>
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My Events</h3>

                {events.map((evt) => (
                    <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent}/>
                ))}
            </div>
        </Layout>
    )
}


export async function getServerSideProps({req}) {
    const {token } = parseCookies(req)

    const res = await fetch(`${API_URL}/events/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const events = await res.json()

    return {
        props: {
            events,
            token
        }
    }
}
