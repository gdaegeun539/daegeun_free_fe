import { Col, Card } from "react-bootstrap";
import "./comment.css";
import combineRegDate from "../../logic/combineRegDate";

const Comment = (props) => {
  const review = props.review;

  return (
    <Col xs={8}>
      <Card className="card card-white post">
        <div className="post-heading">
          <div className="float-left meta">
            <div className="title h5">{review.uname}</div>
            <h6 className="text-muted time">
              {combineRegDate(review.reg_date)}
            </h6>
          </div>
        </div>
        <div className="post-description">
          <p>{review.content}</p>
        </div>
      </Card>
    </Col>
  );
};

export default Comment;
