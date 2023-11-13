import Layouts from '~/layouts';
import UploadReceipt, {
  links as uploadReceiptStyles,
} from '~/modules/uploadReceipt';

export const links = () => uploadReceiptStyles();

export default function UploadReceiptContent() {
  return (
    <Layouts.MainNavFooter>
      <UploadReceipt />
    </Layouts.MainNavFooter>
  );
}
