import { IonModal } from "@ionic/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDissmissal: () => void;
  selected?: any;
};
const TransactionDetailsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selected,
  onDissmissal,
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDissmissal}>
      <h1>Details</h1>
    </IonModal>
  );
};

export default TransactionDetailsModal;
