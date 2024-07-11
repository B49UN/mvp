import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface AnalysisData {
  paragraph_id: number;
  sentence_id: number;
  analysis: any;
}

const fetchAnalysisData = async (paragraph_id: number): Promise<AnalysisData[]> => {
  const { data, error } = await supabase
    .from('analysis')
    .select('*')
    .eq('paragraph_id', paragraph_id);

  if (error) {
    console.error("Error: ", error);
    return [];
  }

  return data;
};

export const useFetchAnalysisData = (paragraph_id: number) => {
  const [data, setData] = useState<AnalysisData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAnalysisData(paragraph_id);
      setData(result);
      setLoading(false);
      console.log(result);
    };
    fetchData();
  }, [paragraph_id]);

  return { data, loading };
};
