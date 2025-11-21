import React, {useEffect, useState} from 'react';
import {Sidebar} from "primereact/sidebar";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {useCardParams} from "~/components/hooks/card-params.hook";
import type {FormFieldConfig} from "~/components/model/formFieldConfig";

interface FormModalProps {
  formFields: FormFieldConfig[],
  visible: boolean;
  onHide: () => void;
  onSubmit: (values: Record<string, string>) => void;
}

export function FormModal({formFields, visible, onHide, onSubmit}: FormModalProps) {
  const cardParams = useCardParams();
  const [values, setValues] = useState<Record<string, string>>({});

  // Initialize or reset local form state when the modal becomes visible
  useEffect(() => {
    if (visible) {
      setValues({
        name: cardParams.name,
        job: cardParams.job,
        company: cardParams.company,
        companyWebsite: cardParams.companyWebsite,
        phone: cardParams.phone,
        email: cardParams.email,
        linkedin: cardParams.linkedin,
      });
    }
  }, [visible, cardParams.name, cardParams.job, cardParams.company, cardParams.companyWebsite, cardParams.phone, cardParams.email, cardParams.linkedin]);

  return (
    <Sidebar visible={visible} onHide={onHide} fullScreen>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(values); }}>
        <div className="grid grid-cols-2 gap-2">
          {formFields.map((field) => (
            <React.Fragment key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <InputText
                type={field.type || 'text'}
                name={field.name}
                id={field.name}
                value={values[field.name] ?? ''}
                placeholder={field.placeholder}
                onChange={(e) => setValues(v => ({...v, [field.name]: e.target.value}))}
              />
            </React.Fragment>
          ))}
        </div>
        <Button className="ml-auto" type="submit">Speichern</Button>
      </form>
    </Sidebar>
  );
}
