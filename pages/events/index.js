import Layout from "@/components/layout";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";
import {API_URL, PER_PAGE} from "@/config/index"


export default function Events({events, page, total}) {
  const lastPage = Math.ceil(total / PER_PAGE)


  return (
    <Layout>
      {events.lenght === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
      <Pagination total={total} page={page} />
    </Layout>
  );
}


export async function getServerSideProps({query: {page = 1}}){
  //calculate start page
  const start = +page === 1 ? 0 : (+page-1) * PER_PAGE

  //Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()


  //Fetch Events
  const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
  const events = await eventRes.json()


  return {
    props:{ events, page: +page, total }
  }

}