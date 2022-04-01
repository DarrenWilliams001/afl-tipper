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
      {currentRoundData ? <h3>{currentRoundData.games[0].roundname}</h3> : null}
      <ul className={style.upcomingList}>
        {currentRoundData
          ? currentRoundData.games.map((r) => {
              return (
                <li className={style.upcomingGame} key={r.id}>
                  <div>
                    <h4>
                      {r.hteam}{" "}
                      <p
                        className={
                          r.hscore > r.ascore ? style.yellowText : null
                        }
                      >
                        {r.hbehinds != null ? r.hbehinds : 0}.
                        {r.hgoals != null ? r.hgoals : 0}.{r.hscore}
                      </p>
                    </h4>
                    <h3>VS </h3>
                    <h4>
                      {r.ateam}{" "}
                      <p
                        className={
                          r.ascore > r.hscore ? style.yellowText : null
                        }
                      >
                        {r.abehinds != null ? r.abehinds : 0}.
                        {r.agoals != null ? r.agoals : 0}.{r.ascore}
                      </p>
                    </h4>
                  </div>
                  <span>{r.venue}</span>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}

export default UpcomingRound;
