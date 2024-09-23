import React from "react";
import ShareForm from "../../../../shared/ui/shareForm/shareForm";
import Modal from "../../../../shared/ui/Modal/Modal";
import { formConfig } from "../../../../shared/config/formConfig";
import { EditTwoTone } from "@ant-design/icons";
import AppButton from "../../../../shared/ui/Button/Button";
import useModal from "../../../../shared/hooks/useModal";

type FormConfigKey = keyof typeof formConfig;

interface PropsEdit {
  editConfig?: Record<string, string | undefined> | null;
  id: string;
  handleEdit: (id: string, formData: Record<string, unknown>) => void;
  disabled?: boolean | null;
  type: FormConfigKey;
}

const Edit: React.FC<PropsEdit> = ({
  editConfig,
  id,
  handleEdit,
  disabled,
  type,
}) => {
  const { isModalOpen, closeModal, openModal } = useModal();
  const handleCloseAndEdit = (formData: Record<string, unknown>) => {
    console.log(formData, id);
    handleEdit(id, formData);
    closeModal();
  };

  const fields = formConfig[type];

  return (
    <>
      <AppButton variant="tertiary" size="small" onClick={openModal}>
        Edit
      </AppButton>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="large">
        <h2>
          <EditTwoTone />
          edit
        </h2>
        <ShareForm
          type={type}
          config={formConfig}
          editConfig={editConfig}
          handleSubmit={handleCloseAndEdit}
        />
      </Modal>
    </>
  );
};

export default Edit;
