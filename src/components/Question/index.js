import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Question = ({ question, author }) => {
  const hrefRoute = `/questions/${question.id}`;
  const questionDate = new Date(question.timestamp).toDateString();

  return (
    <div className="card text-center" style={{ width: "400px", textAlign:'center' }}>
      <img
        className="card-img-top"
        src={author?.avatarURL}
        alt={`Avatar of ${author?.name}`}
      />
      <div className="card-body">
        <h4 className="card-title">{author?.name}</h4>
        <p className="card-text">{questionDate}</p>
        <Link to={hrefRoute} className="btn btn-primary">
          Show more
        </Link>
      </div>
    </div>
  );
};

export default connect()(Question);
