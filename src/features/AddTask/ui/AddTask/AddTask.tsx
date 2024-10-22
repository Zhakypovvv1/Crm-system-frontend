import ShareForm from "../../../../shared/ui/shareForm/shareForm";
import { formConfig } from "../../../../shared/config/formConfig";
import Modal from "../../../../shared/ui/Modal/Modal";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/redux-hooks";
import { useEffect } from "react";
import { getCategoryThunk } from "../../../../shared/slicer/categories/getCategoriesSlice";
import useFilterSearchParams from "../../../../shared/hooks/useFilterSearchParams";

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
  const categories = useAppSelector((state) => state.categories.items);
  const dispatch = useAppDispatch();
  const { page } = useFilterSearchParams();

  useEffect(() => {
    dispatch(getCategoryThunk({ page, pageSize: 6 }));
  }, [dispatch, page]);

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    name: category.name,
  }));

  const updatedConfig = {
    ...formConfig,
    create: {
      ...formConfig.create,
      fields: formConfig.create.fields.map((field) => {
        if (field.name === "category") {
          return {
            ...field,
            options: categoryOptions,
          };
        }
        return field;
      }),
    },
  };
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="large">
        <ShareForm
          handleSubmit={handleSubmit}
          config={updatedConfig}
          type="create"
        />
      </Modal>
    </>
  );
};

export default AddTask;
