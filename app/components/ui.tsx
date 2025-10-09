import {Sidebar} from "primereact/sidebar";
import {useSearchParams} from 'react-router';
import {Button} from "primereact/button";
import {useRef, useState} from "react";
import {InputText} from "primereact/inputtext";
import {OverlayPanel} from "primereact/overlaypanel";

export default function Ui() {
  const op = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [visible, setVisible] = useState(false);
  const name = searchParams.get('name') || '';
  const job = searchParams.get('job') || '';
  const company = searchParams.get('company') || '';
  const companyWebsite = searchParams.get('companyWebsite') || '';
  const phone = searchParams.get('phone') || '';
  const email = searchParams.get('email') || '';
  const linkedin = searchParams.get('linkedin') || '';

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setVisible(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, name: string) {
    const params = searchParams;
    params.set(name, e.target.value);
    setSearchParams(params);
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(window.location.href);
  }

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    // @ts-ignore
    op.current.toggle(e);
  }

  return (
    <>
      <div className="card flex justify-content-center">
        <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="grid grid-cols-2 gap-2">
              <label htmlFor="name">Name</label>
              <InputText type="text" name="name" id="name" value={name} onChange={e => handleChange(e, 'name')}/>

              <label htmlFor="job">Job Title</label>
              <InputText type="text" name="job" id="job" value={job} onChange={e => handleChange(e, 'job')}/>

              <label htmlFor="company">Company</label>
              <InputText type="text" name="company" id="company" value={company}
                         onChange={e => handleChange(e, 'company')}/>

              <label htmlFor="companyWebsite">Company Website</label>
              <InputText type="text" name="companyWebsite" id="companyWebsite" value={companyWebsite}
                         placeholder="https://your-company.com/"
                         onChange={e => handleChange(e, 'companyWebsite')}/>

              <label htmlFor="phone">Phone</label>
              <InputText type="text" name="phone" id="phone" value={phone} onChange={e => handleChange(e, 'phone')}/>

              <label htmlFor="email">EMail</label>
              <InputText type="email" name="email" id="email" value={email} onChange={e => handleChange(e, 'email')}/>

              <label htmlFor="linkedin">LinkedIn</label>
              <InputText type="text" name="linkedin" id="linkedin" placeholder="https://www.linkedin.com/in/..."
                         value={linkedin} onChange={e => handleChange(e, 'linkedin')}/>
            </div>

            <Button className="ml-auto" type="submit">Submit</Button>
          </form>
        </Sidebar>
      </div>
      <Button style={{position: "absolute"}} className="top-5 right-5 pulse" severity={'warning'}
              onClick={() => setVisible(true)}>Create your own</Button>
      <Button style={{position: "absolute"}} className="bottom-5 right-5" onClick={() => copyToClipboard()}>Copy
        Business Card to Clipboard</Button>
      <Button style={{position: "absolute"}} className="bottom-5 left-5" icon="pi pi-info-circle" rounded
              severity="info" onClick={handleClick}/>
      <OverlayPanel ref={op} showCloseIcon>
        <ul>
          <li>Squared Christmas Gifts by Jarlan Perez [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/8eJfmMDsvso)</li>
          <li>Christmas Tree by Alex Safayan [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/fO1vTvI0QIc)</li>
          <li>Candy cane by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/eybaJ6A5xPj)</li>
        </ul>
      </OverlayPanel>
    </>
  )
}