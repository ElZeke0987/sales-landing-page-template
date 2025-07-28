
import { usePersonalInfoStore } from "../../personalInfoStore";

export function ShippingForm(){
    const {
        email, setEmail,
        firstName, setFirstName,
        lastName, setLastName,
        phone, setPhone,
        address, setAddress,
        city, setCity,
        state, setState,
        zip, setZip,
        country, setCountry,
        getShippingPrice
    } = usePersonalInfoStore();
    return(
        <div className="basic-info flex flex-col">
                    <div className="section flex flex-col">
                        <h2>Contact</h2>
                        <div className="flex flex-col">
                            <label>Email</label>
                            <input className="card-input" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="section top-brd flex flex-col">
                        <h2>Delivery Information</h2>
                        <div className="sub-info flex">
                            <div className="flex flex-col">
                                <label>First Name</label>
                                <input className="" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                            </div>
                            <div className="flex flex-col">
                                <label>Last Name</label>
                                <input className="" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label>Phone</label>
                            <input className="" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                        </div>
                        <div className="flex flex-col">
                            <label>Address</label>
                            <input className="" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                        </div>
                        <div className="flex flex-col">
                            <label>City</label>
                            <input className="" value={city} onChange={(e)=>setCity(e.target.value)}/>
                        </div>
                        <div className="flex flex-col">
                            <label>State</label>
                            <input className="" value={state} onChange={(e)=>setState(e.target.value)}/>
                        </div>
                        <div className="flex flex-col">
                            <label>Zip</label>
                            <input className="" value={zip} onChange={(e)=>setZip(e.target.value)}/>
                        </div>
                        <div className="flex flex-col">
                            <label>Country</label>
                            <input className="" value={country} onChange={(e)=>setCountry(e.target.value)}/>
                        </div>
                    </div>

                    
                </div>
    )
}