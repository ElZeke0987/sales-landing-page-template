export function ShippingForm(){
    return(
        <div className="basic-info flex flex-col">
                    <div className="section flex flex-col">
                        <h2>Contact</h2>
                        <div className="flex flex-col">
                            <label>Email</label>
                            <input className="card-input"/>
                        </div>
                    </div>
                    <div className="section top-brd flex flex-col">
                        <h2>Delivery Information</h2>
                        <div className="sub-info flex">
                            <div className="flex flex-col">
                                <label>First Name</label>
                                <input className="" />
                            </div>
                            <div className="flex flex-col">
                                <label>Last Name</label>
                                <input className="" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label>Email</label>
                            
                        </div>
                    </div>

                    
                </div>
    )
}