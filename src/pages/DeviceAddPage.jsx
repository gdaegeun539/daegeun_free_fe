import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { InputGroup, Form, Button } from "react-bootstrap";

import MyNavBar from "./components/MyNavbar";
import deiceToServer from "../logic/deviceToServer";

const DeviceAddPage = () => {
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [devName, setDevName] = useState("");
  const [price, setPrice] = useState(0);
  const [processor, setProcessor] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [display, setDisplay] = useState("");
  const [battery, setBattery] = useState("");
  const [photoPath, setPhotoPath] = useState("");

  const companyChange = (event) => {
    setCompany(event.target.value);
  };
  const devNameChange = (event) => {
    setDevName(event.target.value);
  };
  const priceChange = (event) => {
    setPrice(parseInt(event.target.value));
  };
  const processorChange = (event) => {
    setProcessor(event.target.value);
  };
  const ramChange = (event) => {
    setRam(event.target.value);
  };
  const storageChange = (event) => {
    setStorage(event.target.value);
  };
  const displayChange = (event) => {
    setDisplay(event.target.value);
  };
  const batteryChange = (event) => {
    setBattery(event.target.value);
  };
  const photoPatheChange = (event) => {
    setPhotoPath(event.target.value);
  };
  return (
    <>
      <MyNavBar />
      <div className="detail-main">
        <div
          style={{
            width: "100%",
            height: "4vh",
            textAlign: "start",
          }}>
          <h4>기기 추가</h4>
          <div>
            <Form.Select
              className="mb-3"
              value={company}
              onChange={companyChange}>
              <option>제조회사</option>
              <option value="samsung">삼성</option>
              <option value="google">구글</option>
              <option value="apple">애플</option>
              <option value="xiaomi">샤오미</option>
            </Form.Select>
            <InputGroup className="mb-3">
              <InputGroup.Text>기기명</InputGroup.Text>
              <Form.Control value={devName} onChange={devNameChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>가격(원)</InputGroup.Text>
              <Form.Control value={price} onChange={priceChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>processor</InputGroup.Text>
              <Form.Control value={processor} onChange={processorChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>ram</InputGroup.Text>
              <Form.Control value={ram} onChange={ramChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>storage</InputGroup.Text>
              <Form.Control value={storage} onChange={storageChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>display</InputGroup.Text>
              <Form.Control value={display} onChange={displayChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>battery</InputGroup.Text>
              <Form.Control value={battery} onChange={batteryChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>사진 경로</InputGroup.Text>
              <Form.Control value={photoPath} onChange={photoPatheChange} />
            </InputGroup>
            <Button
              variant="primary"
              className="me-3"
              onClick={async () => {
                let rslt = await deiceToServer(
                  company,
                  devName,
                  price,
                  processor,
                  ram,
                  storage,
                  display,
                  battery,
                  photoPath
                );
                if (rslt) {
                  alert("추가되었습니다.");
                  navigate("/");
                } else {
                  alert("사이트에서 문제가 발생했습니다.");
                }
              }}>
              추가
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                navigate("/");
              }}>
              취소
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceAddPage;
