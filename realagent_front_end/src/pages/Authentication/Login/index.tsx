import classes from './login.module.css';
import { Button, PasswordInput, Autocomplete } from '@mantine/core';
import { useEffect, useState } from 'react';
import 'react-phone-input-international/lib/style.css';
import 'react-phone-input-international';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store';
import { LoginFormData, login } from '../../../store/features/authentication';
import { PATH_AUTH } from '../../../router/route';
import { AuthImg2, Logo } from '../../../assets';
import { toast } from 'sonner';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authenticationStatus = useAppSelector((state) => state.authentication.status);
  const [isHovered, setHovered] = useState(false);
  const [data, setData] = useState<string[]>([]);

  // Form and Error States
  const [formData, setFormData] = useState<LoginFormData>({
    emailOrUsername: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailOrUsernameChange = (val: string) => {
    setFormData((prev) => ({ ...prev, emailOrUsername: val }));
    setData([]);
  };

  // Validation logic and show toast
  const validateForm = (): boolean => {
    let formValid = true;

    if (!formData.emailOrUsername) {
      toast.error('Email or Username is required');
      formValid = false;
    } else if (
      !/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.emailOrUsername) &&
      !/^[a-zA-Z0-9_]+$/.test(formData.emailOrUsername)
    ) {
      toast.error('Enter a valid email or username');
      formValid = false;
    }

    if (!formData.password) {
      toast.error('Password is required');
      formValid = false;
    } else if (formData?.password?.length < 6) {
      toast.error('Password must be at least 6 characters');
      formValid = false;
    }

    return formValid;
  };

  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit().catch((error) => {
        console.error(error);
        toast.error('Login failed. Please try again.');
      });
    }
  };

  const handleSubmit = async () => {
    await dispatch(login(formData));
  };

  const handleNavSignUp = () => navigate(PATH_AUTH.signUp);
  const handleNavForgotPassword = () => navigate(PATH_AUTH.forgotPassword);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <div className={classes.logoContainer}>
        <img src={Logo} alt="logo" className={classes.logo} />
      </div>
      <div className={classes.container}>
        <div className={classes.leftSide}>
          <div className={classes.authcontainer}>
            <div className={classes.authbox}>
              <form onSubmit={handleSubmitWrapper}>
                <div className={classes.inputContainer}>
                  <div className={classes.inputGroup_email_password}>
                    <Autocomplete
                      classNames={{
                        input: classes.email_password_input,
                        label: classes.label,
                      }}
                      type="text" // Supports email or username
                      value={formData.emailOrUsername}
                      data={data}
                      onChange={handleEmailOrUsernameChange}
                      label="Enter Email"
                      placeholder="Enter Your Email"
                    />
                    <PasswordInput
                      name="password"
                      label="Enter Password"
                      placeholder="Enter Your Password"
                      value={formData.password}
                      onChange={handleChange}
                      classNames={{
                        input: classes.email_password_input,
                        label: classes.label,
                      }}
                      visibilityToggleButtonProps={{
                        style: {
                          color: '#007BFF',
                          backgroundColor: isHovered ? 'rgba(252, 121, 99, 0.1)' : 'transparent',
                          transition: 'background-color 0.3s ease',
                        },
                        onMouseEnter: () => setHovered(true),
                        onMouseLeave: () => setHovered(false),
                      }}
                    />
                  </div>
                  <span className={classes.forgot_pasword} onClick={handleNavForgotPassword}>
                    Forgot Password?
                  </span>
                  <Button className={classes.button} type="submit" loading={authenticationStatus === 'loading'}>
                    Login
                  </Button>
                  <div style={{ marginTop: '5px' }}>
                    <p className={classes.sign_para}>
                      Don’t have an account?&nbsp;
                      <a className={classes.sign_a} onClick={handleNavSignUp}>
                        Sign Up
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={classes.rightSide}>
          <img src={AuthImg2} alt="Right Side Image" className={classes.image} />
        </div>
      </div>
    </>
  );
}
