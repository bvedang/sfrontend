import React from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide,
	TextField,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
const ProductAddBatch = (props) => {
	let formikObj = {};
	const getObj = (arrayofObj) => {
		if (arrayofObj) {
			for (let obj of arrayofObj) {
				formikObj[obj.name.toLowerCase()] = "";
			}
		}
	};
	const onSubmit = (values, onSubmitProps) => {
		props.submitAddBatch(props.productId, values);
		onSubmitProps.resetForm();
		props.cancelProductAddBatch();
	};
	getObj(props.stocks);
	const initialValues = {
		batchId: 0,
		...formikObj,
	};
	const textFields = (values) => {
		if (values) {
			const keys = Object.keys(values);
			return keys.map((name, index) => {
				return (
					<div key={index} className="form-group">
						<Field name={name}>
							{(props) => {
								const { field, form, meta } = props;
								return (
									<div>
										{name === "batchId" ? (
											<TextField
												{...field}
												variant="outlined"
												fullWidth
												required
												label={name}
												type="text"
											/>
										) : (
											<TextField
												{...field}
												variant="outlined"
												fullWidth
												required
												type="number"
												label={name}
											/>
										)}
									</div>
								);
							}}
						</Field>
					</div>
				);
			});
		}
	};

	console.log(formikObj);
	return (
		<Dialog
			open={props.addbatch}
			TransitionComponent={Transition}
			keepMounted
			fullWidth
			maxWidth="sm"
			onClose={props.cancelProductAddBatch}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
		>
			<Formik initialValues={initialValues} onSubmit={onSubmit}>
				<Form>
					<DialogTitle id="alert-dialog-slide-title">
						{"Add New Batch?"}
					</DialogTitle>
					<DialogContent>{textFields(initialValues)}</DialogContent>
					<DialogActions>
						<Button color="secondary" onClick={props.cancelProductAddBatch}>
							Cancel
						</Button>
						<Button type="submit" color="primary">
							Submit
						</Button>
					</DialogActions>
				</Form>
			</Formik>
		</Dialog>
	);
};

export default ProductAddBatch;
