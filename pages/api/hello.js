// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default function handler(req, res) {
  axios.get("https://api.squiggle.com.au/?q=teams").then((response) => {
    console.log(response.data.teams);
    return response.data;
  });
}
