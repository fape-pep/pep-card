import type {FormFieldConfig} from "~/components/model/formFieldConfig";
import {useUiActions} from "~/components/hooks/uiActions.hook";
import {FormModal} from "~/components/formModal";
import {ActionButtons} from "~/components/actionButtons";

export const FORM_FIELDS: FormFieldConfig[] = [
  {name: 'name', label: 'Name', type: 'text'},
  {name: 'job', label: 'Job Bezeichnung', type: 'text'},
  {name: 'company', label: 'Firma', type: 'text'},
  {
    name: 'companyWebsite',
    label: 'Firmenwebsite',
    type: 'text',
    placeholder: 'https://your-company.com/'
  },
  {name: 'phone', label: 'Telefonnummer', type: 'text'},
  {name: 'email', label: 'EMail', type: 'email'},
  {
    name: 'linkedin',
    label: 'LinkedIn',
    type: 'text',
    placeholder: 'https://www.linkedin.com/in/...'
  }
];

const ATTRIBUTION_ITEMS = [
  "Squared Christmas Gifts by Jarlan Perez [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/8eJfmMDsvso)",
  "Christmas Tree by Alex Safayan [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/fO1vTvI0QIc)",
  "Candy cane by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/eybaJ6A5xPj)"
];

export default function Ui() {
  const {
    overlayRef,
    modalVisible,
    setModalVisible,
    handleSubmit,
    copyToClipboard,
    handleInfoClick,
  } = useUiActions();


  return (
    <>
      <div className="card flex justify-content-center">
        <FormModal
          formFields={FORM_FIELDS}
          visible={modalVisible}
          onHide={() => setModalVisible(false)}
          onSubmit={handleSubmit}
        />
      </div>

      <ActionButtons
        attributionItems={ATTRIBUTION_ITEMS}
        onCreateClick={() => setModalVisible(true)}
        onCopyClick={copyToClipboard}
        onInfoClick={handleInfoClick}
        overlayRef={overlayRef}
      />
    </>

  )
}