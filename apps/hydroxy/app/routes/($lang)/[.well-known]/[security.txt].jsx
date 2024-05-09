export const loader = async () => {
  const content = `Contact: https://hackerone.com/proctergamble
  Acknowledgments: https://hackerone.com/proctergamble/thanks`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
