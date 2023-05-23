import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Image,
} from "react-bootstrap";
import MyNavBar from "./components/MyNavbar";
import Comment from "./components/Comment";

import {
  LOCALHOST_SERVER,
  DEVICE_API,
  REVIEW_API,
} from "../model/const/URL_CONST.js";
import { isEmpty } from "lodash-es";
import reviewToServer from "../logic/reviewToServer";

const DetailPage = () => {
  const { device_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [device, setDevice] = useState({});
  const [spec, setSpec] = useState({});

  const [reviews, setReviews] = useState([]);

  const [name, setName] = useState("");
  const [score, setScore] = useState(1.0);
  const [content, setContent] = useState("");

  const [isReviewServer, setIsReviewServer] = useState(false);

  useEffect(() => {
    setDevice(location.state.device);
  }, [location]);

  useEffect(() => {
    if (!isEmpty(device)) {
      setSpec(JSON.parse(device.spec));
    }
  }, [device]);

  useEffect(() => {
    axios
      .get(LOCALHOST_SERVER + REVIEW_API + `/dev_id/${device_id}`)
      .then((resp) => {
        setReviews(resp.data);
      })
      .catch((err) => {
        console.log("getDeviceReview err :>> ", err);
        alert("문제가 발생하여 사이트를 새로고침합니다.");
        navigate(0);
      });
  }, [location]);

  useEffect(() => {
    console.log("isReviewServer :>> ", isReviewServer);
    if (isReviewServer) {
      axios
        .get(LOCALHOST_SERVER + DEVICE_API + `/id/${device_id}`)
        .then((resp) => {
          setDevice(resp.data);
        })
        .catch((err) => {
          console.log("reGetDevice err :>> ", err);
        })
        .finally(() => {
          setIsReviewServer(false);
          navigate(0);
        });
    }
  }, [isReviewServer]);

  const nameChange = (event) => {
    setName(event.target.value);
  };

  const scoreChange = (event) => {
    setScore(parseInt(event.target.value));
  };

  const contentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <>
      <MyNavBar />
      <div className="detail-main">
        <Container className="margin-bottom-vh">
          <Row>
            <Col sm={4}>
              <Image
                src={device.photo_path}
                alt={`${device.name} photo`}
                className="border border-2 rounded border-info img-layout"
                rounded
              />
            </Col>
            <Col sm={8}>
              <Table striped>
                <tbody>
                  <tr>
                    <td>기기명</td>
                    <td>{device.name}</td>
                  </tr>
                  <tr>
                    <td>제조사</td>
                    <td>{device.company}</td>
                  </tr>
                  <tr>
                    <td>가격(원)</td>
                    <td>{device.price}</td>
                  </tr>
                  {!isEmpty(spec) &&
                    Object.keys(spec).map((value, index) => {
                      return (
                        <tr key={`spec-tr-${index}`}>
                          <td>{value}</td>
                          <td>{spec[value]}</td>
                        </tr>
                      );
                    })}
                  <tr>
                    <td>사용자 평점 평균</td>
                    <td>{device.rating_avg}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row className="justify-content-center">
            <Col xs={8} className="mb-5">
              <Card className="card card-white post">
                <div
                  style={{
                    display: "flex",
                    // flexDirection: "row",
                    margin: "0 12px 0 12px",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <div>리뷰 작성</div>
                  <Button
                    onClick={async () => {
                      let rslt = await reviewToServer(
                        name,
                        score,
                        content,
                        device_id
                      );
                      setIsReviewServer(rslt);
                      if (rslt) {
                        alert("리뷰가 등록되었습니다.");
                      } else {
                        alert("웹페이지에 문제가 발생하였습니다.");
                      }
                    }}>
                    완료
                  </Button>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}>
                  <Form.Control
                    value={name}
                    onChange={nameChange}
                    placeholder="이름"
                    className="input-layout"
                  />
                  <Form.Select
                    className="input-layout"
                    value={score}
                    onChange={scoreChange}>
                    <option>점수</option>
                    {[1, 2, 3, 4, 5].map((elem) => {
                      return (
                        <option key={`score-option-${elem}`} value={elem}>
                          {elem}
                        </option>
                      );
                    })}
                  </Form.Select>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}>
                  <Form.Control
                    as="textarea"
                    value={content}
                    onChange={contentChange}
                    style={{
                      width: "48vw",
                    }}
                  />
                </div>
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
