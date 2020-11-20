import GetKittyData from './GetKittyData';

// API call, get data, display on page
// onClick of button, PAI call again, get new data
// with Hooks

// can also use arrow function here
function KittyPage() {
    
    // const urlWithId = 'http://localhost:4000/api/kitty/5fb33db2d15e500a2d96266d';
    const urlAll = 'http://localhost:4000/api/kitty/';

    const [allKittys] = GetKittyData(urlAll);
    
    console.log('kittyPage') 
    console.log(allKittys)

    return (
        <div>
            <h1>Kitty page</h1>
            {allKittys && 
                <div className="kittys">
                    {allKittys.map(kittyData => {
                        return (
                            <div className="kitty" key={kittyData._id}>
                                <h3>{kittyData.name}</h3>
                                <p>{kittyData.buyInAmount}</p>
                                <ul style={{flexDirection: "column"}}>
                                    {kittyData.participants.map((participant, i) => <li key={i}>{participant}</li>)}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            }
        </div>
    )
}

export default KittyPage; 