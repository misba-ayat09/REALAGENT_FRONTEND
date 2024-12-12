import classes from './signUp.module.css';
import { TextInput, Button, PasswordInput, Autocomplete, Loader, Box, Select } from '@mantine/core';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import 'react-phone-input-international/lib/style.css';
import PhoneInput from 'react-phone-input-international';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { isAuthenticated, RegisterFormData, register } from '../../../store/features/authentication';
import { PATH_AUTH } from '../../../router/route';
import { AuthImg2, Logo } from '../../../assets';
import { NotificationParams, validate, validateAndNotify } from '../../../utils';
import { TimeZones } from '../../../utils/enums';

export default function Signup() {
  const [errors, setErrors] = useState<RegisterFormData>({} as RegisterFormData);
  const navigate = useNavigate();
  const timeoutRef = useRef<number>(-1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const IsAuthenticated = useAppSelector(isAuthenticated);
  const dispatch = useAppDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    phoneNumber: '',
    timezone: '',
  });

  useEffect(() => {
    if (IsAuthenticated) {
      navigate(PATH_AUTH.signIn);
    }
  }, [IsAuthenticated, navigate]);

  useEffect(() => {
    if (formData.password?.length === 0) {
      setErrors((prev) => {
        return {
          ...prev,
          password: '',
        };
      });
    }
  }, [formData.password]);

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';
    // Cleanup to enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'password') {
      const isValidPassword = validate.password(value);
      if (!isValidPassword) {
        setErrors((prev) => {
          return {
            ...prev,
            [name]: `use a stronger password !`,
          };
        });
      } else {
        setErrors((prev) => {
          return {
            ...prev,
            [name]: '',
          };
        });
      }
    }
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    if (name === 'password' && value !== '') {
      setFormData((prev) => {
        return {
          ...prev,
          confirmPassword: value,
        };
      });
    }
  };

  // const handlephoneNumber = (value: string | null) => {
  //   const formattedPhoneNumber = value ? (value.startsWith('+') ? value : `+${value}`) : '';
  //   setFormData((prev) => {
  //     return {
  //       ...prev,
  //       phoneNumber: formattedPhoneNumber.replace(/(\+\d{1,2})(\d+)/g, '$1 $2'),
  //     };
  //   });
  // };
  const handlephoneNumber = (value: string | null) => {
    const formattedPhoneNumber = value ? (value.startsWith('+') ? value : `+${value}`) : '';

    // Parse the phone number using libphonenumber-js
    const phoneNumber = parsePhoneNumberFromString(formattedPhoneNumber);

    if (phoneNumber && phoneNumber.isValid()) {
      // Phone number is valid
      setFormData((prev) => ({
        ...prev,
        phoneNumber: formattedPhoneNumber,
      }));
    } else {
      // Phone number is invalid, clear it from form data
      setFormData((prev) => ({
        ...prev,
        phoneNumber: '', // Clear invalid phone number
      }));
    }
  };

  const handleEmailChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setFormData((prev) => {
      return {
        ...prev,
        email: val,
        userName: val,
      };
    });
    setData([]);
    if (val?.trim()?.length === 0 || val?.includes('@')) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${val}@${provider}`));
      }, 1000);
    }
  };
  
  const handleTimezone: (value: string | null) => void = (selectedTimezone) => {
    setFormData((prev) => {
      return {
        ...prev,
        timezone: selectedTimezone || '',
      };
    });
  };

  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedPhoneNumber = parsePhoneNumberFromString(formData.phoneNumber);
    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
      toast.error('Please enter a valid phone number.');
      return; // Prevent form submission
    }

    // Proceed with other form data checks
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        toast.error(`Please fill the ${key} field`);
        return;
      }
    });
    const failedNotifications: NotificationParams[] = [];
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        toast.error(`Please fill the ${key} field`);
        return;
      }
    });

    validateAndNotify(
      validate.email,
      formData.email,
      {
        title: 'Invalid Email',
        message: 'Invalid Email Address',
      },
      failedNotifications,
    );

    validateAndNotify(
      validate.password,
      formData.password,
      {
        title: 'Use a stronger Password',
        message: 'Use a stronger Password',
      },
      failedNotifications,
    );

    if (failedNotifications?.length) {
      failedNotifications.forEach((notification) => {
        toast.error(notification.message);
      });
      return;
    }

    handleSubmit().catch((error) => {
      console.error(error);
    });
  };

  const handleSubmit = async () => {
    let errorOccurred = false;
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        toast.error(`Please fill the ${key} field`);
        errorOccurred = true;
      }
    });

    if (!errorOccurred) {
      try {
        await dispatch(register(formData));
        // Redirect to sign-in on successful registration
        navigate(PATH_AUTH.signIn);
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  };

  const handleNavSignIn = () => navigate(PATH_AUTH.signIn);

  return (
    <div style={{ overflowY: 'hidden' }}>
      <div className={classes.logoContainer}>
        <img src={Logo} alt="logo" className={classes.logo} />
      </div>
      <div className={classes.authcontainer}>
        <div className={classes.leftSide}>
          <div className={classes.authbox}>
            <form onSubmit={handleSubmitWrapper}>
              <div className={classes.inputContainer}>
                <div className={classes.inputGroup}>
                  <TextInput
                    classNames={{
                      input: classes.text_input,
                      label: classes.label,
                    }}
                    placeholder="First name"
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <TextInput
                    classNames={{
                      input: classes.text_input,
                      label: classes.label,
                    }}
                    placeholder="Last name"
                    label="Last Name"
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    value={formData.lastName}
                  />
                </div>
                <Autocomplete
                  classNames={{
                    input: classes.email_password_input,
                    label: classes.label,
                  }}
                  label="Email"
                  placeholder="Enter email address"
                  onChange={handleEmailChange}
                  value={formData.email}
                  data={data}
                  rightSection={loading ? <Loader size="1rem" /> : null}
                />
                <Select
                  classNames={{
                    input: classes.email_password_input,
                    label: classes.label,
                  }}
                  value={formData.timezone}
                  label="Select Time Zone"
                  placeholder={'Select Time Zone'}
                  data={Object.values(TimeZones)}
                  onChange={handleTimezone}
                  searchable
                />

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <label
                    style={{
                      fontSize: 'calc(16px * var(--scale-factor))',
                      color: '#292929',
                      fontWeight: 500,
                    }}>
                    Phone number
                  </label>
                  <PhoneInput
                    placeholder="Phone Number"
                    enableSearch
                    disableSearchIcon
                    country={'us'}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    value={formData.phoneNumber}
                    onChange={handlephoneNumber}
                    containerStyle={{
                      width: 'calc(400px * var(--scale-factor))',
                      height: 'calc(46px * var(--scale-factor))',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '10px',
                      marginTop: '10px',
                      borderColor: '#FDCA47',
                    }}
                    inputStyle={{
                      width: '100%',
                      fontWeight: 'bold',
                      height: 'calc(46px * var(--scale-factor))',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '10px',
                      backgroundColor: 'white',
                      borderColor: isFocused ? '#007bff' : '#6A6A6A',
                      opacity: isFocused ? 1 : 0.4,
                    }}
                    searchStyle={{
                      width: 'calc(165px * var(--scale-factor))',
                      height: 'calc(31px * var(--scale-factor))',
                      borderRadius: '10px',
                      backgroundColor: 'white',
                      padding: '10px',
                      margin: '0px',
                      placeSelf: 'center',
                      fontSize: 'calc(16 * var(--scale-factor))',
                      fontFamily: 'Roboto',
                    }}
                    dropdownStyle={{
                      width: 'calc(188px * var(--scale-factor))',
                      height: 'calc(182px * var(--scale-factor))',
                      border: 'none',
                      outline: 'none',
                      fontSize: 'calc(16 * var(--scale-factor))',
                      fontFamily: 'Roboto',
                      padding: '10x',
                      borderRadius: '5px',
                      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
                    }}
                    buttonStyle={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTopLeftRadius: '10px',
                      borderBottomLeftRadius: '10px',
                      backgroundColor: 'white',
                    }}
                  />
                </div>
                <div>
                  <PasswordInput
                    classNames={{
                      input: classes.email_password_input,
                      label: classes.label,
                    }}
                    placeholder="Enter password"
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
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
                  {errors.password && (
                    <ErrorMessageInput error={errors.password?.length > 0} message={errors.password} />
                  )}
                </div>
                <Button type="submit" className={classes.button}>
                  Sign Up
                </Button>
                <p className={classes.sign_para}>
                  Already have an account?{' '}
                  <a onClick={handleNavSignIn} className={classes.sign_a}>
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className={classes.imageContainer}>
          <img src={AuthImg2} alt="Signup" className={classes.image} />
        </div>
      </div>
    </div>
  );
}

type Props = HTMLAttributes<HTMLParagraphElement> & {
  error: boolean;
  message?: null | string;
  className?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ErrorMessageInput({ error, className, message, ...props }: Props) {
  return (
    <Box className={classes.hideError + ' ' + error && classes.showError} {...props}>
      <p>{message}</p>
    </Box>
  );
}
