import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { Container, Row, Col, Card } from "react-bootstrap";
import MyNavBar from "./components/MyNavbar";
import Comment from "./components/Comment";

import {
  LOCALHOST_SERVER,
  DEVICE_API,
  REVIEW_API,
} from "../model/const/URL_CONST.js";
import { isEmpty } from "lodash-es";

const DetailPage = () => {
  const { device_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [device, setDevice] = useState({});

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setDevice(location.state.device);
  }, [location]);

  useEffect(() => {
    axios
      .get(LOCALHOST_SERVER + REVIEW_API + `/dev_id/${device_id}`)
      .then((resp) => {
        setReviews(resp.data);
        console.log("resp.data :>> ", resp.data);
      })
      .catch((err) => {
        console.log("getDeviceReview err :>> ", err);
        alert("문제가 발생하여 사이트를 새로고침합니다.");
        navigate(0);
      });
  }, [location]);

  return (
    <>
      <MyNavBar />
      <div className="detail-main">
        <Container className="margin-bottom-vh">
          <Row>
            <Col sm={4}>
              <img
                src={device.photo_path}
                alt={`${device.name} photo`}
                className="border border-2 rounded border-info img-layout"
              />
            </Col>
            <Col sm={8}>test2</Col>
          </Row>
        </Container>

        <Container>
          <Row className="justify-content-center">
            <Col xs={8} className="mb-5">
              <Card className="card card-white post">
                <div className="post-heading">리뷰 작성</div>
              </Card>
            </Col>
            {!isEmpty(reviews) &&
              reviews.map((elem) => {
                return <Comment review={elem} />;
              })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default DetailPage;
