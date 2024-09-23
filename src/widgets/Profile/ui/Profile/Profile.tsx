import { useEffect, useCallback, useState } from "react";
import { fetchUserInfoThunk } from "../../../../shared/slicer/user/getUserInfoSlice";
import {
  Form,
  Typography,
  Row,
  Col,
  Dropdown,
  Space,
  Alert,
  MenuProps,
} from "antd";
import img from "../../../../shared/images/user.jpg";
import s from "./Profile.module.scss";
import ChangePassword from "../../../../features/ChangePassword/ui/ChangePassword/ChangePassword";
import useModal from "../../../../shared/hooks/useModal";
import Modal from "../../../../shared/ui/Modal/Modal";
import { BiLogOut } from "react-icons/bi";
import ChangeProfile from "../../../../features/ChangeProfile/ui/ChangeProfile/ChangeProfile";
import { clearToken } from "../../../../shared/slicer/token/tokenSlicer";
import UploadAvatar from "../../../../features/UploadAvatar/ui/UploadAvatar/UploadAvatar";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/redux-hooks";
import { RootState } from "../../../../app/Provider/store/store";

const { Title } = Typography;

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector(
    (state: RootState) => state.getUser
  );
  const [form] = Form.useForm();

  const { isModalOpen, openModal, closeModal } = useModal();
  const [isPasswordModal, setIsPasswordModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchUserInfoThunk());
  }, [dispatch]);

  const fetchUserUI = useCallback(() => {
    return dispatch(fetchUserInfoThunk());
  }, [dispatch]);

  const logOutAccount = () => dispatch(clearToken());

  const items: MenuProps["items"] = [
    {
      label: <a onClick={openModal}>Change profile</a>,
      key: "0",
    },
    {
      label: <a onClick={() => setIsPasswordModal(true)}>Change password</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a onClick={logOutAccount}>
          <BiLogOut /> Logout
        </a>
      ),
      key: "3",
    },
  ];

  return (
    <>
      {status === "failed" && (
        <Alert message={"Error"} description={error} type="error" showIcon />
      )}
      <Dropdown menu={{ items }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <img
            src={
              user?.avatarUrl ? `http://localhost:5252/${user?.avatarUrl}` : img
            }
            alt={img}
          />
        </a>
      </Dropdown>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Title level={2}>Профиль</Title>
        <Row className={s.profileContainer}>
          <Col span={12}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div className={s.flexWrap}>
                <div className={s.avatar}>
                  <UploadAvatar user={user} fetchUserUI={fetchUserUI} />
                </div>
                <ChangeProfile
                  fetchUserUI={fetchUserUI}
                  user={user}
                  form={form}
                />
              </div>
            </Space>
          </Col>
        </Row>
      </Modal>
      <Modal isOpen={isPasswordModal} onClose={() => setIsPasswordModal(false)}>
        <ChangePassword closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default Profile;
