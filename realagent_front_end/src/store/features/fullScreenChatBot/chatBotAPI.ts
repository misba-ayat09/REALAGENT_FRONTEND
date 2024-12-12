
export type AddQaAssistantFormdata = {
  user_id: string;
  username: string;
  user_input: string;
};

export type QustionList = {
  ai_response: string;
  status: string;
  question_number:number
};
export type AddInchatFormdata = {
  user_id: number;
  user_message: string;
};
export type QuestionAnswerResponse = {
  question_answers: QaList[];
};
export type QaList = {
  question: string;
  answer: string;
};
