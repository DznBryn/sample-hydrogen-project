import Layouts from '~/layouts';

import {getCMSContent} from '~/utils/functions/eventFunctions';
import {QUIZ_CONTENT} from '~/utils/graphql/sanity/queries';

import {useLoaderData} from '@remix-run/react';

import Quiz, {links as quizStyles} from '~/modules/quiz/eyeQuiz';

export const links = () => quizStyles();

export async function loader({context}) {
  const quizContent = await getCMSContent(context, QUIZ_CONTENT, {
    id: '009c980b-4e24-4ba7-ac8f-7b3dc342cbf9',
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
