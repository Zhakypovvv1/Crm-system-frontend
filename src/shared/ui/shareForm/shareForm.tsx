import { ChangeEvent, FormEvent, useState } from "react";
import s from "./shareForm.module.scss";
import { Button, Form, Input, Select } from "antd";

interface FormField {
  name: string;
  type: string;
  placeholder: string;
  options?: { value: string; name: string }[];
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFinish = () => {
    handleSubmit(formData);
    console.log("Form submitted:", formData);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={s.registerContainer}>
      <div className={s.formWrapper}>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          {formDetails.fields?.map((el, index: number) => (
            <div key={index}>
              {el.type === "select" ? (
                <Select
                  style={{ width: "100%" }}
                  placeholder={el.placeholder}
                  value={formData[el.name]}
                  onChange={(value) => handleSelectChange(el.name, value)}
                >
                  {el.options?.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.name}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <Form.Item
                  name={el.name}
                  rules={[
                    { required: true, message: `Please input your ${el.name}` },
                  ]}
                >
                  <Input
                    name={el.name}
                    type={el.type}
                    placeholder={el.placeholder}
                    value={formData[el.name] || ""}
                    onChange={handleChange}
                    disabled={disabled}
                  />
                </Form.Item>
              )}
            </div>
          ))}
          <Button htmlType="submit" style={{ marginTop: "10px" }}>
            {config[type].buttonText}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ShareForm;
