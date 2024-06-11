import { useEffect, useState } from "react";
import UploadImage from "../../components/uploadImage/uploadImage";
import { FormInput } from "../../components/form";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './index.css'
import { Grid } from "@mui/material";
import MutilSelectedFormParent from "../../components/mutilSelectedForm/mutilSelectedFormParent";
import { get } from "lodash";

export default function InfoBasicProduct({ defaultImages,images,setImages,industryValue,setIndustryValue,setValue,setImageSelected, setError, obj, init, attributeName, register, errors, clearErrors }) {
       const [industrySelected, setIndustrySelected] = useState([])

       const [open, setOpen] = useState(false);
       const handleClickOpen = () => {
              setOpen(true);
       };

       const handleClose = () => {
              if (industrySelected.length == 0) {
                     setError(`categoryId`, {
                            type: "manual",
                            message: 'Vui lòng chọn ngành hàng',
                        })
              } else {
                     setValue("categoryId", industrySelected[industrySelected.length - 1].id)
                     clearErrors("categoryId")
              }
              setOpen(false);
       };
       const handleDiscard = () => {
              setIndustrySelected([])
              handleClose()
       }
       return <>
              <div className="form_basic_wrapper">
                     <p className="header_form">Thông tin cơ bản</p>
                     <div className="image_box">
                            <p className="label_form">Hình ảnh sản phẩm</p>
                            <UploadImage defaultImages={defaultImages} images={images} setImages={setImages} setImageSelected={setImageSelected} setError={setError} clearErrors={clearErrors} register={register} errors={errors} name="productImages" setImagesForm={setImages} />
                     </div>
                     <p className="label_form">Thông tin sản phẩm</p>

                     <Grid container spacing={3}>
                            <Grid item xs={12}>
                                   <FormInput
                                          name="name"
                                          title="Tên sản phẩm"
                                          placeholder={"Nhập tên sản phẩm"}
                                          label={"Tên sản phẩm *"}
                                          validation={{ required: true }}
                                          register={register("name", {
                                                 required: "Tên sản phẩm là bắt buộc",
                                          })}
                                          errors={errors}
                                   />
                            </Grid>
                            <Grid item xs={12}>
                                   <FormInput
                                          name="description"
                                          placeholder={"Mô tả sản phẩm"}
                                          title={"Mô tả sản phẩm"}
                                          label={"Mô tả sản phẩm *"}
                                          validation={{ required: true }}
                                          row={4}
                                          register={register("description", {
                                                 required: "Mô tả sản phẩm không được để trống",
                                                 minLength: {
                                                        value: 100,
                                                        message: "Mô tả phải có ít nhất 100 ký tự"
                                                 }
                                          })}
                                          errors={errors}
                                   />
                            </Grid>
                            <Grid item xs={12}>
                                   <FormInput
                                          name="subTitle"
                                          placeholder={"Tiêu đề sản phẩm"}
                                          title={"Tiêu đề sản phẩm"}
                                          label={"Tiêu đề sản phẩm *"}
                                          validation={{ required: true }}
                                          row={4}
                                          register={register("subTitle", {
                                                 required: "Tiêu đề sản phẩm không được để trống",
                                                 minLength: {
                                                        value: 50,
                                                        message: "Mô tả phải có ít nhất 50 ký tự"
                                                 }
                                          })}
                                          errors={errors}
                                   />
                            </Grid>
                            <Grid item xs={12}>
                                   <FormInput
                                          name="discount"
                                          placeholder={"Phiếu giảm giá"}
                                          title={"Phiếu giảm giá"}
                                          label={"Phiếu giảm giá *"}
                                          validation={{ required: true }}
                                          row={4}
                                          register={register("discount", {
                                                 required: "Phiếu giảm giá không được để trống",
                                          })}
                                          errors={errors}
                                   />
                            </Grid>
                            <Grid item xs={12}>
                                   <p  className="label_form" >Ngành hàng</p>
                                   <TextField 
                                   fullWidth
                                   onClick={handleClickOpen}
                                   {...register("categoryId",{
                                          required:"Vui lòng chọn ngành hàng"
                                   })}
                                   sx={{display:'none'}}
                                   />
                                   <TextField fullWidth
                                          onClick={handleClickOpen}
                                          error={get(errors, "categoryId") != null}
                                          helperText={get(errors, "categoryId")?.message}
                                          InputProps={{
                                                 value: industryValue,
                                                 readOnly: true,
                                                 endAdornment: (
                                                        <InputAdornment position="end">
                                                               <ExpandMoreIcon />
                                                        </InputAdornment>
                                                 )
                                          }}
                                   >

                                   </TextField>
                                   <Dialog
                                          sx={{ overflow: 'hidden !important' }}
                                          maxWidth='lg'
                                          open={open}
                                          onClose={handleClose}
                                          PaperProps={{
                                                 component: 'form',
                                                 className: 'myDialogPaper',
                                                 onSubmit: (event) => {
                                                        event.preventDefault();
                                                        const formData = new FormData(event.currentTarget);
                                                        const formJson = Object.fromEntries(formData.entries());
                                                        const email = formJson.email;
                                                        console.log(email);
                                                        handleClose();
                                                 },
                                          }}
                                   >
                                          <DialogTitle>Chỉnh sửa ngành hàng</DialogTitle>
                                          <DialogContent sx={{ padding: "12px !important", minWidth: '600px', overflow: 'hidden !important' }}>
                                                 <MutilSelectedFormParent setIndustrySelected={setIndustrySelected} setValueSelecteted={setIndustryValue} obj={obj} init={init} attributeName={attributeName} />
                                          </DialogContent>
                                          <DialogActions>
                                                 <Button onClick={handleDiscard}>Huỷ</Button>
                                                 <Button disabled={industrySelected.length == 0} onClick={() => {
                                                        setIndustryValue((pre) => {
                                                               return pre.replace(",", "")
                                                        })
                                                        handleClose()
                                                 }}>Đồng ý</Button>
                                          </DialogActions>
                                   </Dialog>
                            </Grid>
                     </Grid>

              </div>
       </>
}