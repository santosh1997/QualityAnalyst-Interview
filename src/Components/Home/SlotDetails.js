import React from 'react';

class SlotDetails extends React.Component{
	
	constructor(props){
		super(props)
		this.state = {error: true, message: ""}
	}

	saveSlot = () => {
		if(this.refs.firstName.value === "" || this.refs.lastName.value === "" || this.refs.phoneNumber.value === ""){
			this.setState({error: true, message: "Fill in all the inputs"})
		}
		else{
			let details = {"firstName": this.refs.firstName.value , "lastName": this.refs.lastName.value, "phoneNumber": this.refs.phoneNumber.value }
			let slot_data = JSON.parse(localStorage.getItem(this.props.data.id))
			let data = {id: slot_data.id, isBooked: true, name: slot_data.name, details: details}
			localStorage.setItem(this.props.data.id , JSON.stringify(data) )
			window.history.back()
		}
	}

	render(){
		return(
			<div className="col-50 margin-auto" >
				<div className="heading ver-margin ver-padding">Booking Confimation</div>
				<div className="large faded-text ver-margin">
					<span>Time </span>
					<b>{this.props.data.name}</b>
				</div>
				<div className="box-shadow hor-ver-padding col-80 margin-auto ">
					<div className="x-large ver-margin align-center bold">User Details</div>
					<div className="col-90 ver-padding margin-auto">
						<div className="col-100 align-left">
							<div className="col-45 inline margin-right">
								<div className="small faded-text">First name</div>
								<input ref = "firstName" className="margin-right col-100" placeholder = "First Name" defaultValue = { (this.props.data.details.firstName !== undefined) ? this.props.data.details.firstName : "" } />
							</div>
							<div className="col-45 inline">
								<div className="small faded-text">Last name</div>
									<input ref = "lastName" className="col-100" placeholder = "Last Name" defaultValue = { (this.props.data.details.lastName !== undefined) ? this.props.data.details.lastName : "" } />
							</div>
						</div>
						<div className="col-45 ver-margin">
							<div className="small faded-text align-left">Phone Number</div>
							<input ref = "phoneNumber" className="col-100" placeholder = "Phone Number" defaultValue = { (this.props.data.details.phoneNumber !== undefined) ? this.props.data.details.phoneNumber : "" }/>
							</div>
					</div>
					<div className="align-center">
						<div className= {this.state.error ? "ver-margin error medium bold align-center" : ""} >{this.state.message}</div>
						<button className = "neutral-btn margin-right"  onClick = {() => window.history.back()}>Cancel</button>
						<button className = "confirm-btn " onClick = {() => this.saveSlot()} >Save</button>
					</div>
				</div>
			</div>
		) 
	}
}

export default SlotDetails;