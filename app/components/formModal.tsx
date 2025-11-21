import React from 'react';
import {Sidebar} from "primereact/sidebar";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {useCardParams} from "~/components/hooks/card-params.hook";
import type {FormFieldConfig} from "~/components/model/formFieldConfig";

interface FormModalProps {
  formFields: FormFieldConfig[],
  visible: boolean;
  onHide: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}

export function FormModal({formFields, visible, onHide, onSubmit, onChange}: FormModalProps) {
  const cardParams = useCardParams();

  return (
    <Sidebar visible={visible} onHide={onHide} fullScreen>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-2">
          {formFields.map((field) => (
            <React.Fragment key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <InputText
                type={field.type || 'text'}
                name={field.name}
                id={field.name}
                value={cardParams[field.name as keyof typeof cardParams]}
                placeholder={field.placeholder}
                onChange={(e) => onChange(e, field.name)}
              />
            </React.Fragment>
          ))}
        </div>
        <Button className="ml-auto" type="submit">Speichern</Button>
      </form>
    </Sidebar>
  );
}
