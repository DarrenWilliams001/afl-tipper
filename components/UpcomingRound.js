import style from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";

function UpcomingRound() {
  const [currentRoundData, setCurrentRoundData] = useState();
  useEffect(() => {
    const currentYear = new Date().getFullYear();

    fetch("https://api.squiggle.com.au/?q=games;year=" + currentYear)
      .then((response) => response.json())
      .then((data) => {
        const currentRound = data.games.find((round) => {
          return round.complete == 0 ? round.round : null;
        });

        fetch(
          "https://api.squiggle.com.au/?q=games;year=" +
            currentYear +
            ";round=" +
            currentRound.round
        )
          .then((res) => res.json())
          .then((newData) => {
            setCurrentRoundData(newData);
          });
      });
  }, []);

  return (
    <div className={style.upcomingContainer}>
      <h3>Round 3</h3>
      <ul className={style.upcomingList}>
        {currentRoundData.games.map((r) => {
          return (
            <li className={style.upcomingGame} key={r.id}>
              <span>
                <h4>{r.hteam}</h4> <h3>VS </h3>
                <h4>{r.ateam}</h4>
              </span>
              <span>{r.venue}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UpcomingRound;
