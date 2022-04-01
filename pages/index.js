import Head from "next/head";
import { useState, useEffect } from "react";
import Logos from "../components/Logos";
import MatchPrediction from "../components/MatchPrediction";
import UpcomingRound from "../components/UpcomingRound";
import styles from "../styles/Home.module.css";

export async function getServerSideProps() {
  const res = await fetch("https://api.squiggle.com.au/?q=teams");
  const data = await res.json();

  return {
    props: { data },
  };
}

function Home({ data }) {
  const [windowSize, setWindowSize] = useState();

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, [windowSize]);

  return (
    <div className={styles.container}>
      <Head>
        <title>The Tipsy Tipper</title>
        <meta
          name="Unsure of who to tip, use the tipper, it's better than a guess"
          content="Something to help you pick your winning tips."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <nav className={styles.header}>
          <h2>The Tipsy Tipper</h2>
        </nav>
        <section>
          <Logos window={windowSize} teamData={data.teams} />
          <div className={styles.mainContainer}>
            <UpcomingRound teamData={data.teams} />
            <MatchPrediction teamData={data.teams} />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        {" "}
        <span>
          All data thanks to{" "}
          <a href="http://squiggle.com.au" target="_blank" rel="noreferrer">
            squiggle.com.au
          </a>
        </span>
      </footer>
    </div>
  );
}

export default Home;
