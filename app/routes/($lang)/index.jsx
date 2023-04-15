import Homepage from '../../modules/homepage';

export const meta = () => {
  return {
    title: 'TULA Skincare: Probiotic Skin Care Products',
    description: 'Clean + effective probiotic skincare products made with superfoods.',
  };
};
export default function Index() {
  return (
    <div>
      <Homepage />
    </div>
  );
}
