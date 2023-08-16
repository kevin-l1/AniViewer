import { useState } from 'react';
import './Account.css';

export default function Account() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn(event) {
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
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = await res.json();
      sessionStorage.setItem('token', token);
      console.log('Signed In', user, '; received token:', token);
    } catch (err) {
      alert(`Error signing in: Username or Password is incorrect`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignUp(event) {
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
      alert(`Error registering user: Username is already taken`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {sessionStorage.getItem('token') ? null : (
        <>
          <div
            class="modal fade"
            id="signInModal"
            aria-hidden="true"
            aria-labelledby="signInModal"
            tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <form onSubmit={handleSignIn}>
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalToggleLabel">
                      Account Login
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label for="username" className="form-label">
                        Username
                      </label>
                      <input
                        required
                        name="username"
                        type="text"
                        className="form-control"
                        id="username"></input>
                    </div>
                    <div className="mb-3">
                      <label for="password" className="form-label">
                        Password
                      </label>
                      <input
                        required
                        name="password"
                        type="password"
                        className="form-control"
                        id="password"
                        rows="3"></input>
                    </div>
                    <button
                      type="button"
                      data-bs-target="#signUpModal"
                      data-bs-toggle="modal">
                      Sign Up
                    </button>
                    <div class="modal-footer">
                      <button
                        type="submit"
                        data-bs-dismiss="modal"
                        className="btn btn-primary">
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            class="modal fade"
            id="signUpModal"
            aria-hidden="true"
            aria-labelledby="signUpModal"
            tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <form onSubmit={handleSignUp}>
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
                      Modal 2
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div className="mb-3">
                      <label for="username" className="form-label">
                        Username
                      </label>
                      <input
                        required
                        name="username"
                        type="text"
                        className="form-control"
                        id="username"></input>
                    </div>
                    <div className="mb-3">
                      <label for="password" className="form-label">
                        Password
                      </label>
                      <input
                        required
                        name="password"
                        type="password"
                        className="form-control"
                        id="password"
                        rows="3"></input>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary">
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      <i
        className="fa-solid fa-user"
        data-bs-toggle={!sessionStorage.getItem('token') ? 'modal' : null}
        data-bs-target={
          !sessionStorage.getItem('token') ? '#signInModal' : null
        }></i>
    </>
  );
}

//  <i
//       className="fa-solid fa-user"
//       data-bs-toggle="modal"
//       data-bs-target="#signInModal"></i>

//     <div id="signInModal" className="modal align-center" tabindex="-1">
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <form onSubmit={handleSubmit}>
//             <div className="modal-header justify-content-center">
//               <h5 className="modal-title">Login</h5>
//             </div>
//             <div className="modal-body">
//               <div className="mb-3">
//                 <label for="username" className="form-label">
//                   Username
//                 </label>
//                 <input
//                   required
//                   name="username"
//                   type="text"
//                   className="form-control"
//                   id="username"></input>
//               </div>
//               <div className="mb-3">
//                 <label for="password" className="form-label">
//                   Password
//                 </label>
//                 <input
//                   required
//                   name="password"
//                   type="password"
//                   className="form-control"
//                   id="password"
//                   rows="3"></input>
//               </div>
//               <button type="button" onClick={handleSignUp}>
//                 Sign Up
//               </button>
//             </div>
//             <div className="modal-footer justify-content-center">
//               <button
//                 type="submit"
//                 data-bs-dismiss="modal"
//                 className="btn btn-primary">
//                 Sign In
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>