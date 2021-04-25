import React from "react";
import {
	Button,
	Dialog,
	Typography,
	IconButton,
	Toolbar,
	List,
	ListItem,
	Slide,
	Divider,
	ListItemText,
	AppBar,
	ListSubheader,
	Paper,
} from "@material-ui/core";
import { Close, Add, Remove } from "@material-ui/icons";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const ProductModal = (props) => {
	let stockList = null;
	if (props.rawmaterials) {
		let finalArray = props.rawmaterials.filter(
			(item) =>
				!props.stocks.find(({ id }) => {
					return item["rawmaterial_id"] === id;
				})
    );
    console.log(props.stocks)
		console.log(finalArray);
		stockList = finalArray.map((rawmaterial, index) => {
			const i = props.selectedIndex;
			return (
				<React.Fragment key={rawmaterial["rawmaterial_id"]}>
					<Paper elevation={2}>
						<Divider />
						<ListItem button selected={i === index} dense>
							<ListItemText
								style={{ paddingLeft: "40px" }}
								primary={rawmaterial.name}
								secondary={rawmaterial.id}
							/>
							<IconButton
								onClick={() => props.onAddRawmaterial(rawmaterial, index)}
								color="primary"
								style={{ outline: "none" }}
							>
								<Add />
							</IconButton>
							<IconButton
								color="secondary"
								style={{ outline: "none" }}
								onClick={() =>
									props.onRemoveRawmaterial(rawmaterial["rawmaterial_id"])
								}
							>
								<Remove />
							</IconButton>
						</ListItem>
					</Paper>
				</React.Fragment>
			);
		});
	}

	let selectedList = null;
	if (props.setRawmaterial) {
		selectedList = props.setRawmaterial.map((rawmaterial, index) => (
			<React.Fragment key={index}>
				<Paper elevation={2}>
					<ListItem dense>
						<ListItemText
							style={{ paddingLeft: "40px" }}
							primary={rawmaterial.name}
							secondary={rawmaterial.id}
						/>
					</ListItem>
				</Paper>
			</React.Fragment>
		));
	}

	return (
		<Dialog
			fullScreen
			open={props.showModal}
			onClose={props.closeModal}
			TransitionComponent={Transition}
		>
			<AppBar style={{ position: "fixed", backgroundColor: "#2196f3" }}>
				<Toolbar>
					<IconButton
						style={{ outline: "none" }}
						edge="start"
						color="inherit"
						onClick={props.closeModal}
						aria-label="close"
					>
						<Close />
					</IconButton>
					<Typography variant="h6" style={{ flex: 1 }}>
						Set Product Raw Material
					</Typography>
					<Button
						autoFocus
						color="inherit"
						style={{ outline: "none" }}
						onClick={props.onSetRawmaterialDoneHanlder}
					>
						Done
					</Button>
				</Toolbar>
			</AppBar>
			<List style={{ marginTop: "65px" }}>{stockList}</List>
			<List
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Selected List Items
					</ListSubheader>
				}
			>
				{selectedList}
			</List>
		</Dialog>
	);
};

export default ProductModal;
