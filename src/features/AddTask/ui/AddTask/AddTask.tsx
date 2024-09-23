import ShareForm from "../../../../shared/ui/shareForm/shareForm";
import { formConfig } from "../../../../shared/config/formConfig";
import Modal from "../../../../shared/ui/Modal/Modal";

interface AddTaskProps {
  handleSubmit: (formData: Record<string, unknown>) => void;
  isModalOpen: boolean;
  closeModal: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({
  handleSubmit,
  closeModal,
  isModalOpen,
}) => {
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="large">
        <ShareForm
          handleSubmit={handleSubmit}
          config={formConfig}
          type="create"
        />
      </Modal>
    </>
  );
};

export default AddTask;
