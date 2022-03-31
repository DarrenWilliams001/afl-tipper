import Image from "next/image";
import { useState, useEffect } from "react/cjs/react.production.min";
import styles from "../styles/Home.module.css";

function Logos(data) {
  return (
    <div className={styles.logoContainer}>
      <ul className={styles.logos}>
        {data.teamData.map((team) => (
          <li className={styles.logoList} key={team.id}>
            <Image
              layout={data.window < 660 ? "fixed" : "responsive"}
              src={"https://squiggle.com.au" + team.logo}
              width={data.window < 660 ? 40 : 100}
              height={data.window < 660 ? 40 : 100}
              alt={team.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Logos;
