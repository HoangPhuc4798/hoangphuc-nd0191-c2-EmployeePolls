import { connect } from "react-redux";
import { useState } from "react";
import Question from "../../components/Question";

const Dashboard = ({ authedUser, questions, users }) => {
  const [showNewQuestions, setShowNewQuestions] = useState(true);
  const unansweredQuestions = (question) =>
    !question.optionOne.votes?.includes(authedUser.id) &&
    !question.optionTwo.votes?.includes(authedUser.id);

  const answeredQuestions = (question) =>
    question.optionOne.votes?.includes(authedUser.id) ||
    question.optionTwo.votes?.includes(authedUser.id);

  const QuestionList = ({ questions }) => {
    return (
      <div className="card text-black">
        <div className="card-header bg-light">
          <h2 className="font-bold text-center text-green">
            {showNewQuestions ? "New Questions" : "Answered Questions"}
          </h2>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <tbody>
              {questions
                .filter((question) =>
                  showNewQuestions
                    ? unansweredQuestions(question)
                    : answeredQuestions(question)
                )
                .map((question) => (
                  <tr key={question}>
                    <td className="d-flex justify-content-center">
                      <Question
                        key={question.id}
                        question={question}
                        author={users[question.author]}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="row text-center" style={{padding:'1em'}}>
        <div className="col-sm">
          <button
            onClick={() => setShowNewQuestions(true)}
            className={`${
              showNewQuestions
                ? "btn btn-info text-black"
                : "btn btn-primary"
            }`}
          >
            New Questions
          </button>
        </div>
        <div className="col-sm">
          <button
            onClick={() => setShowNewQuestions(false)}
            className={`${
              showNewQuestions
                ? "btn btn-primary"
                : "btn btn-info text-black"
            }`}
          >
            Answered Questions
          </button>
        </div>
      </div>
      <div className="question-list" style={{padding:'1em'}}>
        <QuestionList questions={questions} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
});

export default connect(mapStateToProps)(Dashboard);
