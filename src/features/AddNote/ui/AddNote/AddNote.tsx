import Modal from "../../../../shared/ui/Modal/Modal";
import ShareForm from "../../../../shared/ui/shareForm/shareForm";
import { formConfig } from "../../../../shared/config/formConfig";

interface AddNoteProps {
  handleSubmit: (formData: Record<string, unknown>) => void;
  isModalOpen: boolean;
  closeModal: () => void;
}

const AddNote: React.FC<AddNoteProps> = ({
  handleSubmit,
  isModalOpen,
  closeModal,
}) => {
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="large">
        <ShareForm
          handleSubmit={handleSubmit}
          config={formConfig}
          type="notes"
        />
      </Modal>
    </>
  );
};

export default AddNote;
