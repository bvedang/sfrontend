import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	Tooltip,
} from "@material-ui/core";
import { Edit, Delete, AddCircle, ArrowForward } from "@material-ui/icons";
import ProductAddBatch from "../ProductAddBatch/ProductAddBatch";

const ProductTable = (props) => {
	const tableHeading = (stocks) => {
		if (stocks) {
			return stocks.map((stock) => (
				<TableCell key={stock.id}>{stock.name}</TableCell>
			));
		}
		return null;
	};

	const tableBody = (productBatches) => {
		if (productBatches) {
			return productBatches.map((batches, index) => (
				<TableRow key={index}>
					<TableCell>{batches[index].batchId}</TableCell>
					{batches.map((batch) => (
						<TableCell key={batch.rawmaterial}>{batch.quantity}</TableCell>
					))}
					<TableCell align="right">
						<Tooltip title="Add Detail">
							<IconButton style={{ color: "black", outline: "none" }}>
								<ArrowForward />
							</IconButton>
						</Tooltip>
						<IconButton style={{ color: "black", outline: "none" }}>
							<Edit />
						</IconButton>
						<IconButton style={{ color: "black", outline: "none" }}>
							<Delete />
						</IconButton>
					</TableCell>
				</TableRow>
			));
		}
		return null;
	};
	console.log(props.addbatch);
	return (
		<div className="col">
			<ProductAddBatch
				addbatch={props.addbatch}
				cancelProductAddBatch={props.cancelProductAddBatch}
				stocks={props.stocks}
				submitAddBatch={props.submitAddBatch}
				productId={props.productId}
			/>
			<TableContainer component={Paper}>
				<div style={{ float: "right", margin: "10px" }}>
					<IconButton
						style={{ color: "black", outline: "none" }}
						onClick={props.addProductAddBatch}
					>
						<AddCircle fontSize="large" />
					</IconButton>
				</div>
				<Table aria-label="Product Table">
					<TableHead>
						<TableRow>
							<TableCell>Batch No:</TableCell>
							{tableHeading(props.stocks)}
							<TableCell align="right">Options</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{tableBody(props.productBatches)}</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default ProductTable;
