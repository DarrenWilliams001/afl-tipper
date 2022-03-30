import React, { useState, useEffect } from "react";
import { useCallback } from "react/cjs/react.production.min";
import Image from "next/image";
import style from "../styles/Home.module.css";

function MatchPrediction(data) {
  const [home, setHome] = useState();
  const [away, setAway] = useState();
  const [previousData, setPreviousData] = useState();
  const [prediction, setPrediction] = useState();

  useEffect(() => {
    fetch("https://api.squiggle.com.au/?q=games")
      .then((response) => response.json())
      .then((data) => {
        setPreviousData(data);
      });
  }, []);

  function handleHomeChange(param) {
    setHome(param.target.value);
  }
  const handleAwayChange = (param) => {
    setAway(param.target.value);
  };

  const previousGameData = () => {
    const previousGames = [];
    previousData.games
      .filter((g) => g.hteam == home)
      .filter((a) => a.ateam == away)
      .filter((c) => c.complete == 100)
      .map((game) => {
        previousGames.push(game.winner);
      });

    return previousGames;
  };

  const setWinner = (games) => {
    let h = [];
    let a = [];
    games.map((p) => {
      p == home ? h.push(p) : a.push(p);
    });
    //console.log("Home Total: ", h.length);
    //console.log("Away Total: ", a.length);
    return h.length > a.length ? home : away;
  };

  async function getResutls() {
    const pgd = await previousGameData();
    const winner = await setWinner(pgd);
    setPrediction(winner);
  }

  const getTip = () => {
    getResutls();
  };

  //console.log(home, away);
  //console.log(ready);

  return (
    <div className={style.predictionContainer}>
      <div className={style.formContainer}>
        <div className={style.formGroup}>
          <label className={style.formLabel} htmlFor="home">
            Home Team
          </label>
          <select
            onChange={handleHomeChange}
            className="form-control"
            name="home"
            id="home"
          >
            <option></option>
            {data.teamData.map((team) => (
              <option value={team.name} key={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className={style.formGroup}>
          <label className={style.formLabel} htmlFor="away">
            Away Team
          </label>
          <select
            onChange={handleAwayChange}
            className="form-control"
            name="away"
            id="away"
          >
            <option></option>
            {data.teamData.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        {<button onClick={getTip}>Submit</button>}
      </div>
      <div className={style.predictionContainer}>
        <h3>{prediction != "" ? prediction : null}</h3>
        {prediction != ""
          ? data.teamData
              .filter((a) => a.name == prediction)
              .map((team) => (
                <Image
                  key={team.id}
                  layout="fixed"
                  src={"https://squiggle.com.au" + team.logo}
                  width={100}
                  height={100}
                  alt={team.name}
                />
              ))
          : null}
      </div>
    </div>
  );
}

export default MatchPrediction;
