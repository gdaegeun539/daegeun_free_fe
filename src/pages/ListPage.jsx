import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isEmpty, isNil, cloneDeep } from "lodash-es";
import axios from "axios";

import { Container, Row, Col } from "react-bootstrap";

import MyNavBar from "./components/MyNavbar";
import DeviceCard from "./components/DeviceCard";
import { LOCALHOST_SERVER, DEVICE_API } from "../model/const/URL_CONST.js";

const ListPage = () => {
  const { category } = useParams();

  const [devices, setDevices] = useState([]);
  const [geturl, setGeturl] = useState("");

  useEffect(() => {
    if (isNil(category)) {
      setGeturl("/all");
    } else {
      setGeturl(`/company/${category}`);
    }
  }, [category]);

  useEffect(() => {
    if (!isEmpty(geturl)) {
      axios
        .get(LOCALHOST_SERVER + DEVICE_API + geturl)
        .then((resp) => {
          if (resp.data.length === 0) {
            setDevices([
              {
                error: "data get error",
              },
            ]);
          } else {
            setDevices(cloneDeep(resp.data));
          }
        })
        .catch((err) => {
          console.log("getDeviceInfo error :>> ", err);
          setDevices([
            {
              error: "data get error",
            },
          ]);
        });
    }
  }, [geturl]);

  useEffect(() => {
    console.log("devices :>> ", devices);
  }, [devices]);

  return (
    <>
      <MyNavBar />
      <div className="list-main">
        <Container>
          <Row>
            {devices.map((elem) => {
              return (
                <Col key={`col-device-${elem.id}`} className="mb-5">
                  <DeviceCard device={elem} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ListPage;
