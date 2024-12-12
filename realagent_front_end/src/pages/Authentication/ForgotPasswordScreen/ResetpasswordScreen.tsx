import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, PasswordInput } from '@mantine/core';
import { toast } from 'sonner';
import './ForgotpasswordScreen.css';
import { AuthImg, Logo } from '../../../assets';
import classes from '../Login/login.module.css';
import { JwtValidator } from '../../../utils/JwtValidator';
import { resetPassword, ResetPasswordFormData } from '../../../store/features/resetpassword/resetpasswordAPI';
import { validate } from '../../../utils';

const ResetpasswordScreen: React.FC = () => {
  const navigate = useNavigate();

  const [isHovered, setHovered] = useState(false);
  // const [resetFailedPasswordModalOpened, setResetFailedPasswordModalOpened] = useState(false);
  // const [resetPasswordModalOpened, setResetPasswordModalOpened] = useState(false);
  const [_isPasswordReset, setIsPasswordReset] = useState(false);
  const [data, setData] = useState<ResetPasswordFormData>({
    token: '',
    password: '',
    confirmPassword: '',
  });

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const validateToken = () => {
      const verificationToken = searchParams.get('tk1');

      const isValidToken = JwtValidator.getInstance().validateToken(verificationToken);

      if (!isValidToken) {
        navigate('/', { replace: true });
      } else {
        setData((prev) => ({
          ...prev,
          token: verificationToken ?? '',
        }));
      }
    };
    validateToken();
  }, [navigate, searchParams]);
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';
    // Cleanup to enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleButtonClick = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission

    if (!validate.password(data.password) || !validate.password(data.confirmPassword)) {
      toast.error(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character!',
      );
      return;
    }

    if (data.confirmPassword !== data.password) {
      toast.error('Passwords do not match!', {});
      return;
    }

    try {
      await resetPassword(data);
      setIsPasswordReset(true);
      toast.success('Password has been reset successfully!');

      // Navigate after showing the success message and modal
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000); // Adjust the timeout duration as needed
    } catch (error: any) {
      setIsPasswordReset(false);
      // setResetPasswordModalOpened(false);
      // setResetFailedPasswordModalOpened(true);
      toast.error(error?.response?.data?.error?.message ?? 'Something went wrong!');
    }
  };

  return (
    <>
      {/* {isPasswordReset ? (
        <ResetpasswordModal modalOpened={resetPasswordModalOpened} setModalOpened={setResetPasswordModalOpened} />
      ) : (
        <>
          <ResetpasswordModalFailed
            modalOpened={resetFailedPasswordModalOpened}
            setModalOpened={setResetFailedPasswordModalOpened}
          /> */}

      <div className={classes.logoContainer}>
        <img src={Logo} alt="logo" className={classes.logo} />
      </div>
      <div className={classes.container}>
        <div className={classes.leftSide}>
          <div className={classes.authcontainer}>
            <div className={classes.authbox}>
              <form onSubmit={handleButtonClick}>
                <div className={classes.inputContainer}>
                  <div className={classes.inputGroup_email_password}>
                    <h1 className="title">Create New Password</h1>
                    <p className="subtitle">Choose a strong and secure password to protect your account.</p>
                    <PasswordInput
                      name="password"
                      label="New Password"
                      placeholder="Enter Your New Password"
                      value={data.password}
                      onChange={handleInputChange}
                      classNames={{
                        input: classes.email_password_input,
                        label: classes.label,
                        innerInput: classes.inner_input,
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
                    <PasswordInput
                      name="confirmPassword"
                      label="Confirm New Password"
                      placeholder="Re-enter Your Password"
                      value={data.confirmPassword}
                      onChange={handleInputChange}
                      classNames={{
                        input: classes.email_password_input,
                        label: classes.label,
                        innerInput: classes.inner_input,
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

                  <Button className={classes.button} type="submit">
                    Confirm New Password{' '}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={classes.rightSide}>
          <img src={AuthImg} alt="Right Side Image" className={classes.image} />
        </div>
      </div>
    </>
  );
};
// </>
//   );
// };

export default ResetpasswordScreen;
