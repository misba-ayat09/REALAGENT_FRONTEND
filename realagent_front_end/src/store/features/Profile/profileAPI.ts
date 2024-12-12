import { API, Slug } from "../../../services";


export type AddProfileFormdata = {
    yourName: string;
    email: string;
    phoneNumber: string;
};
export type ProfileResponse = {
  status: "success" | "failed";
  result:Profile[];
};
export type Profile = {
  _id: string;
  yourName: string;
  email: string;
  phoneNumber: string;
}
const AddProfile = (formData: AddProfileFormdata) =>
    API.post<Profile>({
      slug: Slug.ADDPROFILE,
      body: formData,
    });

export const profileAPI = {
    AddProfile
};
