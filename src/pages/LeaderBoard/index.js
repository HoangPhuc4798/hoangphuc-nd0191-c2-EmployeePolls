import { connect } from "react-redux";

const Leaderboard = ({ users, questions }) => {
  function getNumberOfQuestionsByAuthor(userId) {
    let count = 0;
    for (let questionId in questions) {
      if (questions[questionId].author === userId) {
        count++;
      }
    }
    return count;
  }

  return (
    <div>
      <div className="relative">
        <table className="table table-hover">
          <thead className="text-xs uppercase text-center">
            <tr>
              <th scope="col">User</th>
              <th scope="col">Answered Questions</th>
              <th scope="col">Created Questions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">
                  <div className="flex align-middle">
                    <img
                      height={50}
                      src={user?.avatarURL}
                      alt="Author"
                    />
                    <span>{user.name}</span>
                  </div>
                </th>
                <td className="text-center align-middle font-weight-bold">
                  {Object.keys(user.answers).length}
                </td>
                <td className="text-center align-middle font-weight-bold">
                  {getNumberOfQuestionsByAuthor(user.id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, questions }) => ({
  users: Object.values(users).sort(
    (a, b) =>
      Object.keys(b.answers).length +
      Object.keys(b.questions).length -
      (Object.keys(a.answers).length + Object.keys(a.questions).length)
  ),
  questions,
});

export default connect(mapStateToProps)(Leaderboard);
