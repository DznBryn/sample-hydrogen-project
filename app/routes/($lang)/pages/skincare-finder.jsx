import {useLoaderData} from '@remix-run/react';

import {getCMSContent} from '~/utils/functions/eventFunctions';
import {QUIZ_CONTENT} from '~/utils/graphql/sanity/queries';

import Layouts from '~/layouts';
import Quiz, {links as quizStyles} from '~/modules/quiz/skinQuiz';

export const links = () => quizStyles();

export async function loader({context}) {
  const quizContent = await getCMSContent(context, QUIZ_CONTENT, {
    id: 'b10ae91d-1c63-4d29-bf68-5f14b9ecec7f',
  });

  return {
    quizContent,
  };
}

export default function QuizContent() {
  const {quizContent} = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <Quiz content={quizContent} />
    </Layouts.MainNavFooter>
  );
}
