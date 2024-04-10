import { setInitialUsers } from "./users";
import { setInitialQuestions } from "./questions";
import { getInitialData } from "../apis/api";

export function fetchAndPopulateInitialData() {
  return async (dispatch) => {
    console.log("--- fetch And Populate Initial Data ---")
    try {
      const { users, questions } = await getInitialData();
      dispatch(setInitialUsers(users));
      dispatch(setInitialQuestions(questions));
    } catch (error) {
      console.error("Error fetching initial data: ", error);
    }
  };
}
