import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { handleAddAnswer } from "../../actions/questions";
import NotFound from "../Error/notFound";

const PollPage = ({ dispatch, authedUser, users, questions }) => {
  const { id } = useParams();

  const question = questions[id];
  const author = users[question?.author];

  const hasVotedForOptionOne = question?.optionOne.votes.includes(
    authedUser.id
  );
  const hasVotedForOptionTwo = question?.optionTwo.votes.includes(
    authedUser.id
  );
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const handleOption = (e, option) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question?.id, option));
  };

  const calcPercentage = (option) => {
    const numberVotesTotal =
      question?.optionOne.votes.length + question?.optionTwo.votes.length;
    switch (option) {
      case "optionOne":
        return (
          ((question?.optionOne.votes.length / numberVotesTotal) * 100).toFixed(
            2
          ) + " %"
        );
      case "optionTwo":
        return (
          ((question?.optionTwo.votes.length / numberVotesTotal) * 100).toFixed(
            2
          ) + " %"
        );
      default:
        return "";
    }
  };

  return (
    <div>
      {author ? (
        <div>
          {question ? (
            <div>
              <h1 className="text-3xl font-bold text-center align-middle">
                Poll by {author?.name}
              </h1>

              <div className="flex justify-center text-center align-middle">
                <img
                  src={author?.avatarURL}
                  alt="Profile"
                  className="w-24 h-24"
                />
              </div>

              <div className="flex justify-center text-center align-middle">
                <h2 className="mt-6 text-2xl font-bold">Would You Rather?</h2>
              </div>
              <div class="row px-5 py-1">
                <div class="col-sm m-2">
                  <div className={`card ${
                      hasVotedForOptionOne ? "bg-success" : ""
                    }`}>
                    <div className="card-body text-center align-middle">
                      <div className={hasVotedForOptionOne ? "chosen" : ""}>
                        <p className="mb-2 font-bold">
                          {question?.optionOne.text}
                        </p>
                        {hasVoted && (
                          <p className="text-xs">
                            Votes: {question?.optionOne.votes.length} (
                            {calcPercentage("optionOne")})
                          </p>
                        )}
                      </div>
                    </div>
                    {!hasVoted && (
                      <button
                        onClick={(e) => handleOption(e, "optionOne")}
                        disabled={hasVoted}
                        className="btn btn-success text-center align-middle"
                      >
                        CLICK
                      </button>
                    )}
                  </div>
                </div>
                <div class="col-sm m-2">
                  <div className={`card ${
                      hasVotedForOptionTwo ? "bg-success" : ""
                    }`}>
                    <div className="card-body text-center align-middle">
                      <p className="mb-2 font-bold">
                        {question?.optionTwo.text}
                      </p>

                      {hasVoted && (
                        <p className="text-xs">
                          Votes: {question?.optionTwo.votes.length} (
                          {calcPercentage("optionTwo")})
                        </p>
                      )}
                    </div>

                    {!hasVoted && (
                      <button
                        onClick={(e) => handleOption(e, "optionTwo")}
                        disabled={hasVoted}
                        className="btn btn-success text-center align-middle"
                      >
                        CLICK
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* <div className="flex align-middle justify-center">
                <div className="text-center">
                  <button
                    onClick={(e) => handleOption(e, "optionOne")}
                    disabled={hasVoted}
                    className={`p-2 rounded-xl ${
                      hasVotedForOptionOne ? "text-white" : ""
                    }`}
                  >
                    <div className={hasVotedForOptionOne ? "chosen" : ""}>
                      <p className="mb-2 font-bold">
                        {question?.optionOne.text}
                      </p>
                      {!hasVoted && <p className="btn">Click to vote</p>}
                      {hasVoted && (
                        <p className="text-xs">
                          Votes: {question?.optionOne.votes.length} (
                          {calcPercentage("optionOne")})
                        </p>
                      )}
                    </div>
                  </button>

                  <button
                    onClick={(e) => handleOption(e, "optionTwo")}
                    disabled={hasVoted}
                    className={`p-2 rounded-xl ${
                      hasVotedForOptionTwo ? "text-white" : ""
                    }`}
                  >
                    <p className="mb-2 font-bold">{question?.optionTwo.text}</p>
                    {!hasVoted && <p className="btn">Click to vote</p>}
                    {hasVoted && (
                      <p className="text-xs">
                        Votes: {question?.optionTwo.votes.length} (
                        {calcPercentage("optionTwo")})
                      </p>
                    )}
                  </button>
                </div>
              </div> */}
            </div>
          ) : (
            <NotFound />
          )}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions,
  users,
});

export default connect(mapStateToProps)(PollPage);
