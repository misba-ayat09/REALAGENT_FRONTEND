import { API, Slug } from "../../../../services";

export type ListTwitterResponse = {
    status: string;
    result:Results[];
}
export type Results = {
    edit_history_tweet_ids: string[];
    id: string;
    text: string;
}
export type AddtwitterFormData = {
    tweet: string;
}
  const AddTwitter = (formData: AddtwitterFormData) =>
    API.post<ListTwitterResponse>({
      slug: Slug.ADDTWITTER,
      body: formData,
    });
 
export const twitterAPI = {
    AddTwitter
}