import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetailsThunk } from "../../../../shared/slicer/details/getDetailsSlice";
import { createDetailsThunk } from "../../../../shared/slicer/details/createDetailsSlice";
import { Alert } from "antd";
import ContentLayout from "../../../../shared/ui/contentLayout/ContentLayout";
import useModal from "../../../../shared/hooks/useModal";
import AppButton from "../../../../shared/ui/Button/Button";
import { FiPlus } from "react-icons/fi";
import s from "./Details.module.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/redux-hooks";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import AddDetail from "../../../../features/AddDetail/ui/AddDetail/AddDetail";
import Detail from "../../../../entities/Details/ui/Details/Detail";

const Details = () => {
  const { id } = useParams<string>();
  console.log(id);
  const dispatch = useAppDispatch();
  const details = useAppSelector((state) => state.details.items);
  const status = useAppSelector((state) => state.details.status);
  const error = useAppSelector((state) => state.details.error);
  const { isModalOpen, openModal, closeModal } = useModal();

  const text = details?.task?.details?.text;
  const detailsId = details?.task?.details?._id;

  useEffect(() => {
    if (id) {
      dispatch(getDetailsThunk(id));
    }
  }, [dispatch, id]);

  const handleSubmit = (formData: Record<string, unknown>) => {
    dispatch(createDetailsThunk({ id, newDetails: formData })).then(() => {
      closeModal();
      if (id) {
        dispatch(getDetailsThunk(id));
      }
    });
  };

  return (
    <ContentLayout>
      {status === "failed" && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      {status === "loading" && <Spinner />}
      <div className={s.detailsWrapper}>
        <div className={s.header}>
          <h2>Details</h2>
          <AppButton variant="tertiary" size="small" onClick={openModal}>
            <FiPlus />
            Add Details
          </AppButton>
          <AddDetail
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
          />
        </div>
        <Detail items={details} text={text} taskId={id} detailsId={detailsId} />
      </div>
    </ContentLayout>
  );
};

export default Details;
