import './CreateAccount.css'
import { useState } from 'react';

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.target);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-up', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const user = await res.json();
      console.log('Registered', user);
    } catch (err) {
      alert(`Error registering user: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
<div className="modal" tabindex="-1">
  <div className="modal-dialog">
    <div className="modal-content">
      <form onSubmit={handleSubmit}>
      <div className="modal-header justify-content-center">
        <h5 className="modal-title">Account Creation</h5>
      </div>
      <div className="modal-body">
        <div className="mb-3">
          <label for="username" className="form-label">Username</label>
          <input required name="username" type="text" className="form-control" id="username"></input>
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">Password</label>
          <input required name="password" type="password" className="form-control" id="password" rows="3"></input>
        </div>
      </div>
      <div className="modal-footer justify-content-center">
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </div>
      </form>
    </div>
  </div>
</div>
  );
}
