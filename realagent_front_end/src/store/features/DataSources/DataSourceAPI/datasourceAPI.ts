import { APIResponse, DATASOURCE_API, Slug } from '../../../../services';

export interface FetchDataSourceFormData {
  realtor_id: string;
}

export interface FetchDataSourceResponse {
  message: string;
}

const createFetchDataSource = async (formData: FetchDataSourceFormData, id: string) =>
  DATASOURCE_API.post<APIResponse<FetchDataSourceResponse>>({
    slug: Slug.FETCH_DATA_SOURCE + `/${id}`,
    body: formData,
  });

  const uploadQualifyingQuestions = async (id: string) =>
    DATASOURCE_API.post<APIResponse<FetchDataSourceResponse>>({
      slug: Slug.FETCH_DATA_SOURCE + `/${id}`,
      body: {},
    });
  export const datasourceAPI = {
    createFetchDataSource,
    uploadQualifyingQuestions,
  };
