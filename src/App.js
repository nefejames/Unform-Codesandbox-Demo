import React, { useRef } from "react";
import { Form } from "@unform/web";
import * as Yup from "yup";
import Input from "./Input";
import "./styles.scss";
import Radio from "./Radio";
import Checkbox from "./Checkbox";
import Select from "./Select";

const radioOptions = [
  { value: "option 1", label: "One" },
  { value: "option 2", label: "Two" },
];

const selectOptions = [
  { value: "", label: "Select a color" },
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
];

const schema = Yup.object().shape({
  email: Yup.string().email().required("REEEEEEEEEEE"),
});

const validationSchema = Yup.object().shape({
  select: Yup.string().required("Color is required!"),
  email: Yup.string().email().required("Email is required"),
  checkbox: Yup.bool().oneOf([true], "Checkbox is required"),
  radio: Yup.string().required("Radio is required!"),
});

const App = () => {
  const formRef = useRef();

  async function handleSubmit(data) {
    try {
      await validationSchema.validate(data, {
        abortEarly: false,
      });
      // Validation passed - do something with data
      alert(JSON.stringify(data));
    } catch (err) {
      const errors = {};
      // Validation failed - do show error
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      formRef.current.setErrors(errors);
    }
  }

  return (
    <div className="container">
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className="form-row">
          <Input name="email" label="Email" type="email" />
        </div>
        <div className="form-row">
          <Select
            name="select"
            label="Select a color to continue"
            options={selectOptions}
          >
            {selectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="form-row">
          <Checkbox name="checkbox" label="Accept terms and conditions" />
        </div>
        <div>
          <Radio name="radio" options={radioOptions} />
        </div>

        <button className="button" type="submit">
          Sign in
        </button>
      </Form>
    </div>
  );
};
export default App;
