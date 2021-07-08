import Link from "next/link"
import Layout from "@/components/layout";
import EventItem from "@/components/EventItem";
import {API_URL} from "@/config/index"

export default function HomePage({events}) {
  return (
    <Layout>
      {events.lenght === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt}/>
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  );
}


export async function getServerSideProps(){
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
  const events = await res.json()

  return {
    props:{ events:events.slice(0,3) }
  }

}