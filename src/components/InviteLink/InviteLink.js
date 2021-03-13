
import './InviteLink.scss';
import { useState, useRef } from 'react';

/*
* ParticipantsForm
*/
function InviteLink({inviteUrl}) {

    // const [inviteUrl] = useState("https://www.bbc.com/sport/football")

    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    const copyToClipboard = (e) => {
        if(!copySuccess) {
            setTimeout(() => {
                setCopySuccess('');    
            }, 3000)
        }

        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        setCopySuccess('Copied!');    


    }

    return (
        <div className="invite-link-block">
            <label>Invite link</label>
            {/* <a href={inviteUrl} target="_blank">{inviteUrl}</a> */}
            <input className="form-input invite-link" ref={textAreaRef} value={inviteUrl} onChange={()=>{}}/>
            <button type="button" className="btn btn-sm btn-highlight" onClick={copyToClipboard}>copy link</button>
            <span> {copySuccess}</span>
        </div>
    )
}

export default InviteLink;