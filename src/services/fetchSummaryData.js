import axios from "axios";

const fetchData = async () => {
  try {
    const apiUrl = 'https://us-central1-udhyam-tech.cloudfunctions.net/cloud_sql_api';
    const postData = {
      "flow_id" : "0",
      "query" : "SELECT a.*,b.contact_name FROM student_portfolio.summaries a left join student_portfolio.users b on a.contact_id = b.contact_id where approved = 1"
  };

    const response = await axios.post(apiUrl, postData);
    return Object.values(response.data.data);
  } catch (error) {
    console.error('POST Error:', error);
    throw error; 
  }
};

export default fetchData;