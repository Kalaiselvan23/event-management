import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (urls:any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data is already fetched
        if (data.length === 0) {
          setLoading(true);
          const responses = await Promise.all(urls.map((url:string)=> fetch(url)));
          const fetchedData = responses.map(response => response.json());
          setData(fetchedData as any);
        }
      } catch (error) {
        setError(error as any);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data, urls]);

  return { data, loading, error };
};

export default useFetch;
