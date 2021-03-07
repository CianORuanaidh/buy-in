import React from 'react';
import './KittyForm.scss';
import { createKitty, updateExisitingKitty } from '../../services/api/api.services';

/*
* form for creating a new Kitty
*/

const minimumParticipantCount =  1;

class KittyForm extends React.Component {
    constructor(props) {
        super(props);

        const { kitty } = props;

        this.state = {
            name: kitty ? kitty.name : { value : '', isValid: false },
            buyInAmount: kitty ? kitty.buyInAmount : { value : '', isValid: false },
            closeDate: kitty ? kitty.closeDate : { value : this.getDefaultDate(), isValid: false },
            closeTime: kitty ? kitty.closeTime : { value : this.getDefaultTime(), isValid: false },
            noClosingDate: kitty ? kitty.noClosingDate : { value: false, isValid: true },
            formSubmitted: false
            // participants: kitty ? kitty.participants : [this.newParticipant()],
        };

        // this.handleAddParticipant = this.handleAddParticipant.bind(this);
        // this.populateForm =  this.populateForm.bind(this);
        // this.updateForm =  this.updateForm.bind(this);
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleBuyInAmountChange = this.handleBuyInAmountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseTimeChange = this.handleCloseTimeChange.bind(this);
        this.handleCloseDateChange = this.handleCloseDateChange.bind(this);
        this.toggleNoClosingDate = this.toggleNoClosingDate.bind(this);
        

        console.log(this.getDefaultDate())
        console.log(this.getDefaultTime())
    }

    getDefaultDate() {
        var defaultDay = new Date();
        defaultDay.setHours(defaultDay.getHours() + 12)
        return defaultDay.toISOString().slice(0,10);
        // return defaultDay.toISOString().slice(14,19);
    }

    getDefaultTime() { 
        var defaultTime = new Date();
        defaultTime.setHours(defaultTime.getHours())
        return defaultTime.toISOString().slice(11,16);
    }
    
    componentDidMount(){
        // const starterParticipants = this.props.kitty ? [...this.props.kitty.participants] : [];
        // for (let i = 0; i < minimumParticipantCount; i++) {
            //     starterParticipants.push(this.newParticipant());
            // }
            // this.setState({ participants: starterParticipants });
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
        const closeToggleUpdate = { 
            ...closeToggle, 
            value: !closeToggle.value,
            isValid: true
        }
        this.setState({ noClosingDate: closeToggleUpdate});

        this.updateDateTimeValidState(!closeToggle.value);
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
        
        const { kitty } = this.props;
        console.log('new kitty')
        console.log(this.state)
        console.log('isNewKitty')
        console.log(!kitty)

        return;

        if (!kitty) {

            createKitty({ ...this.state })
                .then(resp => console.log("RESPONSE: ", resp))
                .catch(error => console.log('ERROR: ', error));
        
        } else {

            const { id } = this.props;

            const kittyDto = { 
                ...this.state,
                id: id
            }; 

            updateExisitingKitty(kittyDto)
                .then(resp => console.log("RESPONSE: ", resp))
                .catch(error => console.log("ERROR: ",  error));

        }
        
    }
    
    // newParticipant() {
    //     return({ name: '', email: '' });
    // }

    // newMockParticipant(name, email) {
    //     return({ name, email });
    // }

    // handleAddParticipant() {
    //     const participants = [
    //         ...this.state.participants,
    //         this.newParticipant()
    //     ]
    //     this.setState({ participants: participants });
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
    
    // removeParticipant(event, i) {
    //     const updatedParticipants = this.state.participants.filter((p, index) => index !== i);        
    //     this.setState({ participants: updatedParticipants });
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

    functionTest(a,b) {
        return a + b;
    }
    
    render() {
        return (  // submitted={`${formSubmitted}`}
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

                        <fieldset className="form-fieldset closing-time">
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
                        </fieldset>

                        {/* <div className="closing-label">
                            <label className="form-label" >Closing time</label>
                        </div> */}


                        <div className="input-group create-button">
                            <button className="btn" type="submit">Create</button>
                        </div>                    
                    </div>

                    {/* <div className="number-input">
                        <label className="form-label" htmlFor="buyInAmount">Invite by link</label>
                        <input className="form-input" id="buyInAmount" type="checkbox"/>
                    </div> */}

                    {/* <div className="number-input">
                        <label className="form-label" htmlFor="buyInAmount">is closed</label>
                        <input className="form-input" id="buyInAmount" type="checkbox"/>
                    </div> */}
    
                    {/* <div className="block block-2" style={{ marginBottom: 0 }}>
                        <div className="form-row">
                            <div className="input">
                                <label className="form-label" htmlFor="participent-name">Participant name</label>
                            </div>
                            <div className="input">
                                <label className="form-label" htmlFor="participent-email">Participant email</label>
                            </div>        
                        </div>
                    </div> */}

                    {/* <div className="block block-2">
                        {this.state.participants.map((participant, i) => {
                            return (
                                <div className="form-row" key={i}>
                                    <div className="input text-input">
                                        <label className="form-label visually-hidden" htmlFor="participent-name">Participant name</label>
                                        <input className="form-input" id="participent-name" type="text" value={participant.name} onChange={(e) => { this.handleParticipantNameChange(e, i, participant) }}/>
                                    </div>
                                    <div className="input text-input">
                                        <label className="form-label visually-hidden" htmlFor="participent-email">Participant email</label>
                                        <input className="form-input" id="participent-email" type="text" value={participant.email} onChange={(e) => { this.handleParticipantEmailChange(e, i, participant)}}/>
                                    </div>
                                    <div>
                                        <button disabled={i < minimumParticipantCount} className="btn" type="button" title="Remove participant" onClick={(e) => { this.removeParticipant(e, i)}}>x</button>
                                    </div>              
                                </div>
                            );
                        })}
                        <div className="form-row">
                            <button className="btn add-participant" type="button" onClick={this.handleAddParticipant}>Add another participant</button>
                        </div>
                    </div> */}
                    {/* <div className="form-controls-block">
                        <button className="btn" type="submit">Create</button>
                        <button 
                            className="btn" 
                            type="button"
                            style={{marginLeft: 20}} 
                            onClick={this.populateForm}>Populate form</button>
                        <button 
                            className="btn" 
                            type="button"
                            style={{marginLeft: 20}} 
                            onClick={this.updateForm}>UPDATE</button>

                    </div>                     */}
                </form>
            </div>
        );
    }
}

export default KittyForm;
