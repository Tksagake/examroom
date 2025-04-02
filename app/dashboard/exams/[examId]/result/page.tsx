import { GetServerSideProps } from 'next';
import { supabase } from '../../../../lib/supabase';

interface ExamResultPageProps {
  examId: string;
}

const ExamResultPage = ({ examId }: ExamResultPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Exam Result Page</h1>
      <p>Exam ID: {examId}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { examId } = context.query;

  return {
    props: {
      examId,
    },
  };
};

export default ExamResultPage;
