import { Config } from '../../config';

export default class ResearchService {
  static checkRealEstate = async (topic: string) => {
    try {
      const url = Config.ARTICLE_API_URL + '/check-real-estate/';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });
      const data: { is_real_estate_related: boolean } = await response.json();
      return data.is_real_estate_related;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
}
