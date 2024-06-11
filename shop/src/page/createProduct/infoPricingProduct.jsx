import { Grid } from "@mui/material";
import { FormInput, FormNumber } from "../../components/form";
export default function InfoPricingProduct({register, errors}) {
    return <div className="form_basic_wrapper">
    <p className="header_form">Thông tin bán hàng</p>   
    <Grid className="d-flex justify-content-between" container spacing={3}>
        
            <Grid item xs={5}>
            <FormInput
                name="price"
                title="Giá sản phẩm"
                displayType="row"
                placeholder={"Nhập giá sản phẩm"}
                label={"Giá sản phẩm *"}
                validation={{ required: true }}
                register={register("price", {
                    required: "Giá sản phẩm là bắt buộc",
                    validate: value => !isNaN(value) || "Giá phải là một số"
             })}
             errors={errors}
            />
            </Grid>
            <Grid item xs={5}>
            <FormInput
                name="stock"
                title="Kho hàng"
                displayType="row"
                placeholder={"Nhập Kho hàng"}
                label={"Kho hàng *"}
                validation={{ required: true }}
                register={register("stock", {
                    required: "Kho hàng là bắt buộc",
                    validate: value => !isNaN(value) || "Kho hàng phải là một số"
             })}
             errors={errors}
            />
            </Grid>
        </Grid>
    </div>
}