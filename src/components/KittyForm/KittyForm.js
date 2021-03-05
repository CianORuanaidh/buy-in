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
            name: kitty ? kitty.name : '',
            buyInAmount: kitty ? kitty.buyInAmount : '',
            participants: kitty ? kitty.participants : [this.newParticipant()],
        };

        this.handleAddParticipant = this.handleAddParticipant.bind(this);
        this.handleKittyNameChange = this.handleKittyNameChange.bind(this);
        this.handleKittyBuyInAmountChange = this.handleKittyBuyInAmountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.populateForm =  this.populateForm.bind(this);
        this.updateForm =  this.updateForm.bind(this);
    }

    componentDidMount(){
        const starterParticipants = this.props.kitty ? [...this.props.kitty.participants] : [];

        console.log(starterParticipants)
        for (let i = 0; i < minimumParticipantCount; i++) {
            starterParticipants.push(this.newParticipant());
        }

        this.setState({ participants: starterParticipants });
    }

    newParticipant() {
        return({ name: '', email: '' });
    }

    newMockParticipant(name, email) {
        return({ name, email });
    }

    handleAddParticipant() {
        const participants = [
            ...this.state.participants,
            this.newParticipant()
        ]
        
        this.setState({ participants: participants });

    }
    
    handleKittyNameChange(event) {
        this.setState({ name: event.target.value});
    }
    
    handleKittyBuyInAmountChange(event) {
        this.setState({ buyInAmount: event.target.value});
    }
    
    
    handleParticipantNameChange(event, i, participant) {
        
        const editedParticipant = { 
            ...this.state.participants[i],
            name: event.target.value
        };
        const updatedParticipants = this.state.participants.map((p, index) => { return index === i ? editedParticipant : p });
        
        this.setState({ participants: updatedParticipants })
    }
    
    handleParticipantEmailChange(event, i, participant) {
        
        // Todo add validation
        
        const editedParticipant = { 
            ...this.state.participants[i],
            email: event.target.value
        };
        const updatedParticipants = this.state.participants.map((p, index) => { return index === i ? editedParticipant : p });
        
        this.setState({ participants: updatedParticipants })
    }
    
    removeParticipant(event, i) {
        console.log(event, i)
        
        const updatedParticipants = this.state.participants.filter((p, index) => index !== i);
        
        this.setState({ participants: updatedParticipants });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        
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
    
    populateForm() {
        this.setState({
            name: 'Burgeroooo',
            buyInAmount: 15,
            participants: [
                this.newMockParticipant('Billy', 'bill.bob@gmail.com'),
                this.newMockParticipant('Willy', 'willy.wool@gmail.com')
            ]
        })
    }

    updateForm() {
        this.setState({
            name: 'Burgeroo Boo',
            buyInAmount: 5.5,
            participants: [
                this.newMockParticipant('Billy', 'bill.bob@gmail.com'),
                this.newMockParticipant('Silly Oh', 'sill.oh@gmail.com')
            ]
        })
    }

    functionTest(a,b) {
        return a + b;
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="kitty-form">

                    <div className="block block-1">
                        <div className="text-input">
                            <label className="form-label" htmlFor="kitty-name">Name</label>
                            <input className="form-input" id="kitty-name"type="text" value={this.state.name} onChange={this.handleKittyNameChange} placeholder="New Pot name"/>
                        </div>
        
                        <div className="number-input">
                            <label className="form-label" htmlFor="buyInAmount">Buy in amount</label>
                            <input className="form-input" id="buyInAmount" type="number" value={this.state.buyInAmount} onChange={this.handleKittyBuyInAmountChange}/>
                        </div>
                    </div>
    
                    <div className="block block-2" style={{ marginBottom: 0 }}>
                        <div className="form-row">
                            <div className="input">
                                <label className="form-label" htmlFor="participent-name">Participant name</label>
                            </div>
                            <div className="input">
                                <label className="form-label" htmlFor="participent-email">Participant email</label>
                            </div>        
                        </div>
                    </div>

                    <div className="block block-2">
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
                    </div>
                    <div className="form-controls">
                        <button className="btn" type="submit">Save</button>
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

                    </div>                    
                </form>
            </div>
        );
    }
}

export default KittyForm;
