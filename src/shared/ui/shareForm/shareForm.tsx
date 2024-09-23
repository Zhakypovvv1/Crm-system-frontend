import { ChangeEvent, FormEvent, useState } from "react";
import s from "./shareForm.module.scss";
import AppButton from "../Button/Button";

interface FormField {
  name: string;
  type: string;
  placeholder: string;
}

interface FormDetails {
  fields: FormField[];
  buttonText: string;
}

interface MyFormComponent {
  type: string;
  config: Record<string, FormDetails>;
  handleSubmit: (formData: Record<string, unknown>) => void;
  disabled?: boolean;
  editConfig?: Record<string, string | undefined> | null;
}

const ShareForm: React.FC<MyFormComponent> = ({
  type,
  config,
  handleSubmit,
  disabled = false,
  editConfig,
}) => {
  const formDetails = config[type];
  const initialState = formDetails?.fields.reduce((acc, rec) => {
    acc[rec.name] = editConfig?.[rec.name] || "";
    return acc;
  }, {} as Record<string, string>);

  const [formData, setFormData] = useState(editConfig || initialState);

  if (!formDetails) {
    return <p>Invalid form type</p>;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
    e.preventDefault();
    handleSubmit(formData);
    console.log("Form submitted:", formData);
  };
  return (
    <div className={s.registerContainer}>
      <div className={s.formWrapper}>
        <form onSubmit={onSubmit}>
          {formDetails.fields?.map((el, index: number) => (
            <input
              key={index}
              name={el.name}
              type={el.type}
              placeholder={el.placeholder}
              value={formData[el.name] || ""}
              onChange={handleChange}
            />
          ))}
          <AppButton type="submit">{config[type].buttonText}</AppButton>
        </form>
      </div>
    </div>
  );
};

export default ShareForm;
