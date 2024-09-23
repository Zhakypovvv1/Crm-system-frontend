import { formConfig } from "../../../../shared/config/formConfig";
import Modal from "../../../../shared/ui/Modal/Modal";
import ShareForm from "../../../../shared/ui/shareForm/shareForm";

interface AddDetailProps {
  handleSubmit: (formData: Record<string, unknown>) => void;
  isModalOpen: boolean;
  closeModal: () => void;
}

const AddDetail: React.FC<AddDetailProps> = ({
  isModalOpen,
  handleSubmit,
  closeModal,
}) => {
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="large">
        <ShareForm
          handleSubmit={handleSubmit}
          config={formConfig}
          type="details"
        />
      </Modal>
    </>
  );
};

export default AddDetail;
