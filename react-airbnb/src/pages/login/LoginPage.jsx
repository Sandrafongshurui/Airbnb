import LoginForm from "../../components/login/login-form/LoginForm";
import "../../components/modal/Modal.css";

const LoginPage = () => {
  return (
    <div className="login-page-div">
      <div className="login-modal-body">
        <LoginForm />
      </div>
    </div>
  );
};
export default LoginPage;
