import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link,useHistory  } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormInput, FormSelect } from '../../../components/form';
import { fetchJSONNoToken, fetchText } from '../../../heppler/api';
import { AUTHEN_API } from '../../../components/constain/api';
import { setLoggedInUser, setLoggedIn } from '../../../heppler/authUtils';
import './index.css'
import { postDataEncrypt } from '../../../heppler/crypto/keyUtils';
import { useEffect } from 'react';
import { generateKey, getPublicKey, encryptDataRSA, postSecretKey } from '../../../heppler/crypto/keyUtils';
import { toast } from 'react-toastify';
import { LoadingComponent } from '../../../components/Loadding';
export default function AuthenComponent(props) {
  const history = useHistory();
  const { reset, register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  const { reset: resetLogin, register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin }, setValue: setValueLogin, getValues: getValueLogin } = useForm();
  const [isInvalidUser, setIsInvalidUser] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(props.location.state.isLogin || false);
  const [isLoadingEmail, setIsLoadingEmail] = React.useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("publicKey") == null) {
      getPublicKey().then(res => {
        sessionStorage.setItem("publicKey", res)

        if (sessionStorage.getItem("secretKey") == null) {

          const secretKey = generateKey();

          const secretKeyString = JSON.stringify(secretKey)
          encryptDataRSA(secretKeyString, res).then(encryptData => {
            postSecretKey(encryptData).then(res => {
              sessionStorage.setItem("secretKey", secretKeyString)
            })

          })
        }

      }).catch(err => {
        console.log(err);
        alert("Đang truy cập không an toàn ! Reload lại trang")
      })
    }
  }, [])


  const handleClickShowPassword = () => setShowPassword((show) => !show);


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSignUp = async (data) => {
    const userRegister = {
      username: data.username,
      password: data.password,
      email: data.email
    }
    const verifyUrl = `http://localhost:8088/api/v1/verify`; 
    const option = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userRegister)
    }
    setIsLoadingEmail(true)
    fetchText(verifyUrl,option).then((value)=> {
      // console.log(value);
      setIsLoadingEmail(false)
      history.push('/authen/email', { email: data.email, userId:value });
    }).catch((err)=> {
      toast.error(err)
    })
 


    // postDataEncrypt(userRegister, AUTHEN_API.REGISTER).then(res => {
    //   console.log(res);

    // }).catch(err => {
    //   console.log(err);

    // })
    // setIsLogin(!isLogin);
    // reset();
    // toast.success("Đăng ký thành công")


  };
  const onLogin = async (data) => {
    const userLogin = {
      username: data.username,
      password: data.password
    }
    const option = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userLogin)
    }
    try {

      // const res = await fetchJSONNoToken(AUTHEN_API.LOGIN, option);
      const res = await postDataEncrypt(userLogin, AUTHEN_API.LOGIN);

      const loggedIn = {
        access_token: res.accessToken,
        expires_in: res.expiresIn,
        refresh_token: res.refreshToken,
        create_time: res.createTime
      }
      setLoggedInUser(res);
      setLoggedIn(loggedIn);
      setIsInvalidUser(false);
      location.href = "/home";

    } catch (err) {
      console.log(err);
      console.log("loi roi")
      setIsInvalidUser(true);
    }

  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className='authen' >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing:'border-box',
          borderRadius:'10px',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? "Sign in" : "Sign up"}
        </Typography>
        {isInvalidUser && <p className='invalid-user'>Thông tin tài khoản hoặc mật khẩu không chính xác</p>}
        <form style={{margin:12}} onSubmit={isLogin ? handleSubmitLogin(onLogin) : handleSubmit(onSignUp)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormInput
                placeholder={"Nhập tên đăng nhập"}
                title="Username"
                name="username"
                label={"Username *"}
                validation={{ required: true }}
                register={isLogin ? registerLogin("username", {
                  required: "Vui lòng nhập tên đăng nhập",
                }) : register("username", {
                  required: "Vui lòng nhập tên đăng nhập",
                })}
                errors={isLogin ? errorsLogin : errors}
              >
              </FormInput>
            </Grid>

            {!isLogin && <Grid item xs={12}>
              <FormInput
                title="Email"
                name="email"
                label={"Email *"}
                validation={{ required: true }}
                register={register("email", {
                  required: "Vui lòng nhập email",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Email không hợp lệ"
                  }
                })}
                errors={errors}
              >
              </FormInput>
            </Grid>}
            <Grid item xs={12}>
              <FormInput
                title="Password"
                name="password"
                label={"Password *"}
                validation={{ required: true }}
                register={isLogin ? registerLogin("password", {
                  required: "Vui lòng nhập mật khẩu",
                }) : register("password", {
                  required: "Vui lòng nhập mật khẩu",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải dài hơn 6 ký tự"
                  }
                })}
                errors={isLogin ? errorsLogin : errors}
                isPassword={true}
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}

              />
            </Grid>
            {!isLogin && <Grid item xs={12}>
              <FormControlLabel
                {...register("allowExtraEmails", {
                  required: "Vui lòng xem xét điều khoản"
                })}
                control={<Checkbox color="primary" />}
                label={
                  <span>
                    Đồng ý <Link to="/conditions">điều khoản</Link>
                  </span>
                }
              />
              {errors.allowExtraEmails && <p style={
                {
                  color: "red",
                  margin: 0
                }
              }>{errors.allowExtraEmails.message}</p>}
            </Grid>}

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLogin ? "Sign in" : "Sign up"}
          </Button>
        </form >
        <Grid container justifyContent="flex-end">
          <Grid item>
            <a style={{ cursor: 'pointer' }} onClick={() => {
              setIsLogin(!isLogin);
              reset();
              resetLogin();
            }}>
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign in"}
            </a>
          </Grid>
        </Grid>
      </Box>
      </div>
      {isLoadingEmail && <LoadingComponent></LoadingComponent>}
    </Container>
  );
}