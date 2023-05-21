import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DeviceCard = (props) => {
  const device = props.device;
  const navigate = useNavigate();

  return (
    <Card
      className="clickable-elem"
      style={{ width: "18rem" }}
      onClick={() => {
        navigate(`/device/${device.id}`, {
          state: { device: device },
        });
      }}>
      <Card.Img
        variant="top"
        src={device.photo_path}
        alt={`${device.name} photo`}
      />
      <Card.Body>
        <Card.Title>{device.name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default DeviceCard;
