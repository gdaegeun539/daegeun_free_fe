import axios from "axios";
import { LOCALHOST_SERVER, REVIEW_API } from "../model/const/URL_CONST";

const reviewToServer = async (uname, score, content, dev_id) => {
  try {
    let body_data = {
      uname: uname,
      rating: score,
      content: content,
      pwd: 1234,
      dev_id: dev_id,
    };
    let resp = await axios.post(LOCALHOST_SERVER + REVIEW_API + "/", body_data);
    if (resp.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("reviewToServer err :>> ", err);
    return false;
  }
};

export default reviewToServer;
