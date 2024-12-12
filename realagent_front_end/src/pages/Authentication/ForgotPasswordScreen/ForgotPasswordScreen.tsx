import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, Loader } from '@mantine/core';
import { toast } from 'sonner';

import { AuthImg, Logo } from '../../../assets';
import { EmailVerificationFormData, verifyEmail } from '../../../store/features/resetpassword/resetpasswordAPI';
import classes from '../Login/login.module.css';

const ForgotPasswordScreen: React.FC = () => {
  const [data, setData] = useState<EmailVerificationFormData>({ email: '' });
  const [loading, setLoading] = useState<boolean>(false);
  // const [isEmailSent, setIsEmailSent] = useState(false);

  const handleChange = (value: string) => {
    setData((prev) => ({
      ...prev,
      email: value,
    }));
  };

  // console.log(setLoading, isEmailSent);
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';
    // Cleanup to enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  const handleButtonClick = async () => {
    if (!validateEmail(data.email)) {
      toast.error('Please Enter Valid Email!');
      return;
    }
    try {
      setLoading(true);
      await verifyEmail(data);
      setLoading(false);
      // setIsEmailSent(true);
      toast.success('Email sent successfully!');
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message ?? 'Something went wrong!');
    }
  };


  return (
    <>
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
                    <h1 className="title">Reset Password</h1>
                    <p className="subtitle">We will send an email to reset your password</p>
                    <Autocomplete
                      classNames={{
                        input: classes.email_password_input,
                        label: classes.label,
                      }}
                      type="email"
                      value={data.email}
                      onChange={handleChange}
                      rightSection={loading ? <Loader size="1rem" /> : null}
                      label="Enter Email"
                      placeholder="Enter Your Registered Email Address"
                    />
                  </div>

                  <Button className={classes.button} type="submit" onClick={handleButtonClick}>
                    Submit
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

export default ForgotPasswordScreen;
