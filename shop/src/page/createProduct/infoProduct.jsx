import './index.css'
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import { FormInput, FormSelect } from '../../components/form';
export function InfoProduct({resgiter,erros}) {
    return (<div>
        <p className="header_form">Thông tin chi tiết</p>
        <Grid container spacing={3}>
        <Grid item xs={6}>
            <FormInput 
                name="productCode"
                title="Thương hiệu"
                placeholder={"Nhập Thương hiệu"}
                label={"Thương hiệu *"}
                validation={{ required: true }}
                register={resgiter("productCode", {
                    required: "Thương hiệu là bắt buộc",
                })}
                displayType='row'
                errors={erros}
            />
          </Grid>
          <Grid item xs={6}>
            <FormSelect 
            title="Xuất xứ"
            name="productOrigin"
            register={resgiter("productOrigin")}
            selectOptions={[{value:1,label:"tháng 1"},{value:2,label:"tháng 2"}]}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Form 3" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Form 4" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Form 5" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Form 6" fullWidth />
          </Grid>
        </Grid>
    </div>)
}