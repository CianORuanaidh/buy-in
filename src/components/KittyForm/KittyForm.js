import React from 'react';
import './KittyForm.scss';
import { createKitty, updateExisitingKitty } from '../../services/api/api.services';
import ParticipantsForm from '../ParticipantsForm/ParticipantsForm';
import InviteLink from '../InviteLink/InviteLink';

import { withRouter } from "react-router-dom";

/*
* form for creating a new Kitty
*/
class KittyForm extends React.Component {
    constructor(props) {
        super(props);

        const { kitty } = props;

        console.log('HERE')
        console.log(kitty)

        this.state = {
            name: kitty ? { value : kitty.name, isValid: true } : { value : '', isValid: false },
            buyInAmount: kitty ? { value : kitty.buyInAmount, isValid: true } : { value : '', isValid: false },
            closeDate: kitty ? { value : kitty.closeDate, isValid: true } : { value : '', isValid: false },
            closeTime: kitty ? { value : kitty.closeTime, isValid: true } : { value : '', isValid: false },
            noClosingDate: kitty ? { value : kitty.noClosingDate, isValid: true } : { value: false, isValid: true },
            formSubmitted: false,
            participants: kitty ? kitty.participants : [this.newParticipant()],
            isClosed: kitty ? kitty.isClosed : false,
            inviteUrl: kitty ? kitty.inviteUrl : '_invite_link',
            id: kitty ? kitty._id : null
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleBuyInAmountChange = this.handleBuyInAmountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseTimeChange = this.handleCloseTimeChange.bind(this);
        this.handleCloseDateChange = this.handleCloseDateChange.bind(this);
        this.toggleNoClosingDate = this.toggleNoClosingDate.bind(this);

    }

    componentDidMount() {
        console.log('PAGE')
        console.log(this)
    }

    getDefaultDate() {
        var defaultDay = new Date();
        defaultDay.setHours(defaultDay.getHours() + 12)
        return defaultDay.toISOString().slice(0,10);
    }

    getDefaultTime() { 
        var defaultTime = new Date();
        defaultTime.setHours(defaultTime.getHours())
        return defaultTime.toISOString().slice(11,16);
    }
    
    validateRequired(value) {
        return !!value;
    }

    dateTimeValidation(value) {
        const required = this.state.noClosingDate;
        if (!required) {
            return true;
        }
        return !!value;
    }

    updateDateTimeValidState(required) {
        const closeTime = this.state.closeTime;
        const closeDate = this.state.closeDate;
        const updatedCloseTime = { 
            ...closeTime, 
            isValid: required ? !!closeTime.value : true,
        };
        const updatedCloseDate = { 
            ...closeDate, 
            isValid: required ? !!closeDate.value : true,
        };
        this.setState({ closeDate: updatedCloseDate});
        this.setState({ closeTime: updatedCloseTime});
    }

    toggleNoClosingDate(e) {
        const closeToggle = this.state.noClosingDate;
        this.updateDateTimeValidState(closeToggle.value);
        const closeToggleUpdate = { 
            ...closeToggle, 
            value: !closeToggle.value,
            isValid: true
        }
        this.setState({ noClosingDate: closeToggleUpdate});
    }

    handleCloseDateChange(e) {
        const closeDate = this.state.closeDate;
        const updatedCloseDate = { 
            ...closeDate, 
            value: e.target.value,
            isValid: this.dateTimeValidation(e.target.value)
        }
        this.setState({ closeDate: updatedCloseDate});
    }

    handleCloseTimeChange(e) {
        const closeTime = this.state.closeTime;
        const updatedCloseTime = { 
            ...closeTime, 
            value: e.target.value,
            isValid: this.dateTimeValidation(e.target.value)
        }
        this.setState({ closeTime: updatedCloseTime});
    }

    handleNameChange = (e) => {
        const name = this.state.name;
        const updatedName = { 
            ...name, 
            value: e.target.value,
            isValid: this.validateRequired(e.target.value)
        }
        this.setState({ name: updatedName});
    }
 
    handleBuyInAmountChange = (e) => {
        const buyInAmount = this.state.buyInAmount;
        const updatedAmount = { 
            ...buyInAmount, 
            value: e.target.value,
            isValid: this.validateRequired(e.target.value)
        }
        this.setState({ buyInAmount: updatedAmount});
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ formSubmitted: true });
        
        const kitty = { ...this.state };

        const isFormValid = kitty.name.isValid && kitty.buyInAmount.isValid;

        if(!isFormValid) {
            return;
        }

        const { id: updateKittyId } = this.props;

        if (!updateKittyId) {

            const closeDateArr = kitty.closeDate.value.split('-');
            const closeTimeArr = kitty.closeTime.value.split(':');
            const closeDateTime = !kitty.noClosingDate.value ? new Date(...closeDateArr, ...closeTimeArr) : null;

            const newKittyDto = { name: kitty.name.value, buyInAmount: kitty.buyInAmount.value,
                closeDateTime: closeDateTime, noClosingDate: kitty.noClosingDate.value };
                
            createKitty(newKittyDto)
                .then(resp => {
                    this.updateKittyData(resp.data);
                    this.props.history.push(`/kitty/${resp.data._id}`);
                })
                .catch(error => console.log('ERROR: ', error));
        
        } else {

            const kittyDto = { ...this.state, id: updateKittyId }; 

            updateExisitingKitty(kittyDto)
                .then(resp => console.log("RESPONSE: ", resp))
                .catch(error => console.log("ERROR: ",  error));

        }
        
    }

    handleCloseGame = (e) => {        
        this.setState((state) => {
            const { isClosed } = state;
            return ({ isClosed: !isClosed })
        });
    }

    updateKittyData(newKittyDto) {
        const state = { ...this.state };
        const id = newKittyDto._id;

        this.setState({ 
            ...state,
            id,
        })
    }
    
    newParticipant() {
        return({ name: '', email: '' });
    }

    onHandleAddParticipant(event) {
        const participants = [
            ...this.state.participants,
            this.newParticipant()
        ]
        this.setState({ participants: participants });
    }

    removeParticipant(i) {        
        const updatedParticipants = this.state.participants.filter((p, index) => index !== i);        
        this.setState({ participants: updatedParticipants });
    }

    handleParticipantNameChange({value, i}) {
        const editedParticipant = { 
            ...this.state.participants[i],
            name: value
        };
        const updatedParticipants = this.state.participants.map((p, index) => { return index === i ? editedParticipant : p });        
        this.setState({ participants: updatedParticipants });
    }

    handleParticipantEmailChange({value, i}) {
        const editedParticipant = { 
            ...this.state.participants[i],
            email: value
        };
        const updatedParticipants = this.state.participants.map((p, index) => { return index === i ? editedParticipant : p });        
        this.setState({ participants: updatedParticipants })
    }

    functionTest(a,b) {
        return a + b;
    }
    
    render() {
        return (
            <div className="new-kitty-form-container">
                <form onSubmit={this.handleSubmit} submitted={`${this.state.formSubmitted}`}>

                    <div className="form-block">
                        <div className="input-group name text-input">
                            <label className="form-label" htmlFor="kitty-name">Name</label>
                            <input className="form-input" id="kitty-name"type="text" value={this.state.name.value} isvalid={`${this.state.name.isValid}`} onChange={this.handleNameChange} placeholder="New Pot name"/>
                        </div>
                        <div className="input-group amount number-input">
                            <label className="form-label" htmlFor="buyInAmount">Buy in amount</label>
                            <input className="form-input" id="buyInAmount" type="number" value={this.state.buyInAmount.value} isvalid={`${this.state.buyInAmount.isValid}`} onChange={this.handleBuyInAmountChange}/>
                        </div>

                        {/* <fieldset className="form-fieldset closing-time">
                            <legend className="form-label">Closing time</legend>
                            <div className="input-group date date-input">
                                <label className="form-label visually-hidden" htmlFor="buyInAmount">Closing date</label>
                                <input className="form-input" id="buyInAmount" type="date" value={this.state.closeDate.value} isvalid={`${this.state.closeDate.isValid}`} onChange={this.handleCloseDateChange}/>
                            </div>
                            <div className="input-group time time-input">
                                <label className="form-label visually-hidden" htmlFor="buyInAmount">Closing time</label>
                                <input className="form-input" id="buyInAmount" type="time" value={this.state.closeTime.value} isvalid={`${this.state.closeTime.isValid}`} onChange={this.handleCloseTimeChange}/>
                            </div> 
                            <div className="input-group checkbox">
                                <label>
                                    <input type="checkbox" value={this.state.noClosingDate.value}  onChange={this.toggleNoClosingDate} /> No closing time
                                </label>
                            </div>                       
                        </fieldset> */}

                    </div>

                    <div className="input-group control-buttons">
                        { !this.state.id ?
                        <button className="btn" type="submit">Create</button>
                        :
                        <button className="btn" type="submit">Save</button>
                        }
                    </div>    

                    {this.state.id && 
                        <div>
                            {/* <div className="input-group checkbox">
                                <label>
                                    <input type="checkbox" checked={this.isClosed} value={this.state.noClosingDate.value}  onChange={this.handleCloseGame} /> Close game
                                </label>
                            </div> */}

                            <InviteLink inviteUrl={this.state.inviteUrl}/>

                            <ParticipantsForm 
                                participants={this.state.participants} 
                                onHandleAddParticipant={(e) => this.onHandleAddParticipant(e)}
                                onRemoveParticipant={(e) => this.removeParticipant(e)}
                                onHandleParticipantEmailChange={(e) => this.handleParticipantEmailChange(e)}
                                onHandleParticipantNameChange={(e) => this.handleParticipantNameChange(e)}
                                ></ParticipantsForm>
                        </div>
                    }
                </form>
            </div>
        );
    }
}

export default withRouter(KittyForm);
{

// {/*<button 
//         className="btn" 
//         type="button"
//         style={{marginLeft: 20}} 
//         onClick={this.updateForm}>UPDATE</button>
        
//     </div>*/}

// this.populateForm =  this.populateForm.bind(this);
// this.updateForm =  this.updateForm.bind(this);


// newMockParticipant(name, email) {
//     return({ name, email });
// }

// handleParticipantNameChange(event, i, participant) {
//     const editedParticipant = { 
//         ...this.state.participants[i],
//         name: event.target.value
//     };
//     const updatedParticipants = this.state.participants.map((p, index) => { return index === i ? editedParticipant : p });        
//     this.setState({ participants: updatedParticipants });
// }

// handleParticipantEmailChange(event, i, participant) {
//     // Todo add validation
//     const editedParticipant = { 
//         ...this.state.participants[i],
//         email: event.target.value
//     };
//     const updatedParticipants = this.state.participants.map((p, index) => { return index === i ? editedParticipant : p });        
//     this.setState({ participants: updatedParticipants })
// }

    
// populateForm() {
//     this.setState({
//         name: 'Burgeroooo',
//         buyInAmount: 15,
//         participants: [
//             this.newMockParticipant('Billy', 'bill.bob@gmail.com'),
//             this.newMockParticipant('Willy', 'willy.wool@gmail.com')
//         ]
//     })
// }

// updateForm() {
//     this.setState({
//         name: 'Burgeroo Boo',
//         buyInAmount: 5.5,
//         participants: [
//             this.newMockParticipant('Billy', 'bill.bob@gmail.com'),
//             this.newMockParticipant('Silly Oh', 'sill.oh@gmail.com')
//         ]
//     })
// }

}
