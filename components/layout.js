import {useRouter} from 'next/router'
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "./showcase";
import styles from "@/styles/Layout.module.css";

export default function Layout({ title, keywordds, description, children }) {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywordds" content={keywordds} />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Dj Events",
  description: "Find the lastest dj and musical events",
  keywords: "music, dj, events",
};
