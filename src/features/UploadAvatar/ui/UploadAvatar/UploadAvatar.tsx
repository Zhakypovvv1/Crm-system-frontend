import { useState } from "react";
import s from "./UploadAvatar.module.scss";
import { Button, Upload, message, Avatar, UploadFile } from "antd";
import { updateAvatarThunk } from "../../../../shared/slicer/user/updateAvatarSlice";
import { UploadOutlined } from "@ant-design/icons";
import img from "../../../../shared/images/user.jpg";
import { useAppDispatch } from "../../../../shared/hooks/redux-hooks";

interface User {
  avatarUrl?: string | null;
}

interface UploadAvatarProps {
  user: User | null;
  fetchUserUI: () => void;
}

const UploadAvatar: React.FC<UploadAvatarProps> = ({ user, fetchUserUI }) => {
  const [avatarFile, setAvatarFile] = useState<UploadFile | null>(null);
  const [avatarKey, setAvatarKey] = useState<number>(Date.now());
  console.log(avatarFile);

  const dispatch = useAppDispatch();
  const handleAvatarChange = ({ file }: { file: UploadFile }) => {
    console.log("avatar change file:", file);
    setAvatarFile(file);
  };

  const handleUpload = () => {
    if (!avatarFile) {
      message.error("Выберите файл для загрузки");
      return;
    }
    console.log("Selected file:", avatarFile);

    const formData = new FormData();
    formData.append("avatar", avatarFile as any);

    console.log("FormData content:", formData.get("avatar"));

    dispatch(updateAvatarThunk(formData))
      .then(() => {
        message.success("Аватар обновлен");
        setAvatarKey(Date.now());
        fetchUserUI();
      })
      .catch((err) => {
        message.error("Ошибка обновления аватара");
      });
  };
  return (
    <>
      <Avatar
        className={s.image}
        size={100}
        src={user?.avatarUrl ? `http://localhost:5252/${user?.avatarUrl}` : img}
      />
      <Upload
        name="avatar"
        showUploadList={false}
        beforeUpload={() => false}
        onChange={handleAvatarChange}
      >
        <Button icon={<UploadOutlined />}>Загрузить новый аватар</Button>
      </Upload>
      <Button type="primary" onClick={handleUpload} disabled={!avatarFile}>
        Загрузить аватар
      </Button>
    </>
  );
};

export default UploadAvatar;
