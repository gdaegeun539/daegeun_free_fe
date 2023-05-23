import axios from "axios";
import { DEVICE_API, LOCALHOST_SERVER } from "../model/const/URL_CONST";

const deiceToServer = async (
  company,
  devName,
  price,
  processor,
  ram,
  storage,
  display,
  battery,
  photoPath
) => {
  try {
    let spec = {
      processor: processor,
      ram: ram,
      storage: storage,
      display: display,
      battery: battery,
    };
    let data = {
      name: devName,
      category: "smartphone",
      company: company,
      price: price,
      spec: JSON.stringify(spec),
      photo_name: "none",
      photo_path: photoPath,
    };
    let resp = await axios.post(LOCALHOST_SERVER + DEVICE_API + "/", data);

    if (resp.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("deviceToServer error :>> ", error);
    return false;
  }
};

export default deiceToServer;
