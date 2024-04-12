import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleAddQuestion } from "../../actions/questions";
import { connect } from "react-redux";

const AddPoll = ({ dispatch, authedUser }) => {
  const navigate = useNavigate();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");

  const handleOptionChange = (option, e) => {
    const value = e.target.value;
    if (option === "firstOption") {
      setFirstOption(value);
    } else if (option === "secondOption") {
      setSecondOption(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      handleAddQuestion({
        optionOneText: firstOption,
        optionTwoText: secondOption,
        author: authedUser,
      })
    );
    navigate("/");
  };

  return (
    <div className="form-control flex text-center">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center text-center align-middle">
          <h2 className="mt-6 text-2xl font-bold">Would You Rather?</h2>
        </div>
        <div className="mb-3 mt-3">
          <label
            htmlFor="firstOption"
            data-testid="firstOptionLabel"
            className="form-label block text-sm font-medium mx-sm-3"
          >
            First Option
          </label>
          <input
            value={firstOption}
            placeholder="First Option"
            onChange={(e) => handleOptionChange("firstOption", e)}
            type="text"
            name="firstOption"
            id="firstOption"
            className="form-control block text-sm font-medium"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="secondOption"
            data-testid="secondOptionLabel"
            className="form-label block text-sm font-medium text-green"
          >
            Second Option
          </label>
          <input
            value={secondOption}
            placeholder="Second Option"
            onChange={(e) => handleOptionChange("secondOption", e)}
            type="text"
            name="secondOption"
            id="secondOption"
            className="form-control block bg-white border rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          data-testid="submit-poll"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(AddPoll);
