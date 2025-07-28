export function PaymentForm(){
    return(
        <div className="basic-info flex flex-col">
                    <div className="flex flex-col">
                        <label>Name On Card</label>
                        <input className="card-input"/>
                    </div>
                    <div className="flex flex-col">
                        <label>Card Number</label>
                        <input className="" placeholder="XXXX XXXX XXXX XXXX"/>
                    </div>
                    <div className="card-sub-info flex">
                        <div className="flex flex-col">
                            <label>Expire Date</label>
                            <input className="" placeholder="XXXX XXXX XXXX XXXX"/>
                        </div>
                        <div className="flex flex-col">
                            <label>CVV / CVC</label>
                            <input className="" placeholder="XXX"/>
                        </div>
                    </div>
                </div>
    )
}