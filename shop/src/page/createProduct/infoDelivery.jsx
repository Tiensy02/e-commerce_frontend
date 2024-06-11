import { Grid } from "@mui/material";
import { FormNumber } from "../../components/form";

export default function InfoDelivery({ register, errors }) {
    return (
        <div className="form_basic_wrapper">

            <p className="header_form">Thông tin giao hàng</p>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <FormNumber
                        title={"Trọng lượng"}
                        name={"productWeight"}
                        displayType="row"
                        register={register("productWeight", {
                            required: "Trọng lượng là bắt buộc",
                            min:{
                                value: 1,
                                message: "Trọng lượng phải lớn hơn 0"
                            }
                        })}
                        errors={errors}
                        moreInfo="gram" 
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormNumber
                        title={"Chiều cao"}
                        name={"productHeight"}
                        displayType="row"
                        register={register("productHeight", {
                            required: "Chiều cao là bắt buộc",
                            min:{
                                value: 1,
                                message: "Chiều cao phải lớn hơn 0"
                            }
                        })}
                        errors={errors}
                        moreInfo="cm"
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormNumber
                        title={"Chiều rộng"}
                        name={"productWidth"}
                        displayType="row"
                        register={register("productWidth", {
                            required: "Chiều rộng là bắt buộc",
                            min:{
                                value: 1,
                                message: "Chiều rộng phải lớn hơn 0"
                            }
                        })}
                        errors={errors}
                        moreInfo="cm"
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormNumber
                        title={"Chiều dài"}
                        name={"productLength"}
                        displayType="row"
                        register={register("productLength", {
                            required: "Chiều dài là bắt buộc",
                            min:{
                                value: 1,
                                message: "Chiều dài phải lớn hơn 0"
                            }
                        })}
                        errors={errors}
                        moreInfo="cm"
                    />
                </Grid>
            </Grid>

        </div>
    )
}