import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AlertModal from './pages/Components/AlertModal';

export default function Account() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignUpAlert, setShowSignUpAlert] = useState(false);
  const [showSignOutAlert, setShowSignOutAlert] = useState(false);
  const [showInvalidAccountAlert, setShowInvalidAccountAlert] = useState(false);
  const [showUsernameTakenAlert, setShowUsernameTakenAlert] = useState(false);

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
    } catch (err) {
      setShowInvalidAccountAlert(true);
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
      setShowSignUpAlert(true);
    } catch (err) {
      setShowUsernameTakenAlert(true);
    } finally {
      setIsLoading(false);
    }
  }

  function handleShowSignIn() {
    setShowSignIn(true);
  }

  function handleCloseSignIn() {
    setShowSignIn(false);
  }

  function handleShowSignUp() {
    setShowSignUp(true);
    setShowSignIn(false);
  }

  function handleCloseSignUp() {
    setShowSignUp(false);
  }

  function handleSignOut() {
    sessionStorage.removeItem('token');
    setShowSignOutAlert(true);
  }

  function handleCloseSignUpAlert() {
    setShowSignUpAlert(false);
  }

  function handleCloseSignOutAlert() {
    setShowSignOutAlert(false);
  }

  function handleShowInvalidAccountAlert() {
    setShowInvalidAccountAlert(true);
  }

  function handleCloseInvalidAccountAlert() {
    setShowInvalidAccountAlert(false);
  }

  function handleCloseUsernameTakenAlert() {
    setShowUsernameTakenAlert(false);
  }

  return (
    <>
      {sessionStorage.getItem('token') ? null : (
        <>
          <Modal show={showSignIn} onHide={handleCloseSignIn}>
            <form onSubmit={handleSignIn}>
              <Modal.Header closeButton>
                <Modal.Title>Account Login</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
                <p className="sign-up">
                  Don't have an account?
                  <button
                    type="button"
                    className="sign-up-redirect-button"
                    onClick={handleShowSignUp}>
                    Sign Up
                  </button>
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="submit"
                  className="sign-in-button"
                  onClick={handleCloseSignIn}>
                  Sign In
                </Button>
              </Modal.Footer>
            </form>
          </Modal>

          <Modal show={showSignUp} onHide={handleCloseSignUp}>
            <form onSubmit={handleSignUp}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
                    Create an Account
                  </h1>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="submit"
                  className="sign-up-button"
                  variant="primary"
                  onClick={handleCloseSignUp}>
                  Sign Up
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        </>
      )}
      <div className="user-dropdown">
        <i className="fa-solid fa-user" onClick={handleShowSignIn}></i>
        {sessionStorage.getItem('token') ? (
          <div className="user-dropdown-items">
            <Link to="/bookmarks" className="bookmarks-tab">
              Bookmarks
            </Link>
            <Link to="/animeBookmarks" className="bookmarks-tab">
              Anime Bookmarks
            </Link>
            <Link to="/mangaBookmarks" className="bookmarks-tab">
              Manga Bookmarks
            </Link>
            <Link to="/reviews" className="reviews-tab">
              Reviews
            </Link>
            <div className="sign-out-tab" onClick={handleSignOut}>
              Sign Out
            </div>
          </div>
        ) : null}
      </div>
      <AlertModal
        text="You have successfully made an account! Please sign in."
        show={showSignUpAlert}
        handleClose={handleCloseSignUpAlert}
      />
      <AlertModal
        text="Account has been signed out."
        show={showSignOutAlert}
        handleClose={handleCloseSignOutAlert}
      />
      <AlertModal
        text="Username or Password is incorrect."
        show={showInvalidAccountAlert}
        handleClose={handleCloseInvalidAccountAlert}
      />
      <AlertModal
        text="Username is already taken."
        show={showUsernameTakenAlert}
        handleClose={handleCloseUsernameTakenAlert}
      />
    </>
  );
}
