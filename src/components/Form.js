import React, {useState,useRef} from 'react';
import "bootstrap-icons/icons/eye-fill.svg";
import "bootstrap-icons/icons/eye-slash-fill.svg";
import "../components/form.css"

function Form(props) {
    const initialValues = {
        username : "",
        email: "",
        password: "",
        cardNumber : "",
        cvv : "",
        cardHolder : "",
        agree : "",
        gender: ""
    };

    const[values,setValues] = useState(initialValues);

    // xatoliklar uchun state
    const[formErrors,setFormErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // card Logic

    const cardNumberRef = useRef(null);
    const cvvRef = useRef(null);
    const cardHolderRef = useRef(null);


    const changeHandler = (e) => {
        const {value,name} = e.target;

        if (name === "cardNumber" && value.length === 11) {
            cvvRef.current.focus();
        } else if(name === "cvv" && value.length === 3){
            cardHolderRef.current.focus();
        }

        setValues({...values,[name]: value})
    };

    const checkHandler = (e) => {
        const {name} = e.target;

        setValues({...values,[name]: e.target.checked})
    };

    // submit uchun funksiya

    const handleSumbit = (e) => {
        e.preventDefault();

        setFormErrors(validate(values));
    };

    // Validate uchun funksiya
    const validate = (values) => {
        const errors = {};
        const regex =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!values.username){
            errors.username = "Username kiritish shart!";
        }

        if (!values.email){
            errors.email = "Email kiritish kerak!";
        } else if (!regex.test(values.email)){
            errors.email = "Xatolik, email ni to'g'ri kiriting";
        }


        if (!values.password){
            errors.password = "Xatolik parolni kiriting!"
        } else if (values.password.length<4){
            errors.password = "Xatolik 4 ta belgidan kichik bo'lmasin"
        } else if (values.password.length>16){
            errors.password = "Xatolik,Parol 16 ta belgidan kam bo'lsin"
        }

        return errors;
    };



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-5 offset-3 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center mt-3">Form Validation</h3>
                            </div>

                            <form onSubmit={handleSumbit}>
                                <div className="card-body">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="User Name..."
                                        name="username"
                                        value={values.username}
                                        onChange={changeHandler}
                                    />

                                    <p>{formErrors.username}</p>

                                    <input
                                        type="email"
                                        className="form-control mt-3"
                                        placeholder="Enter your email..."
                                        name="email"
                                        value={values.email}
                                        onChange={changeHandler}
                                    />

                                    <p>{formErrors.email}</p>
                                    <div className="password">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control mt-3"
                                            placeholder="User your password..."
                                            name="password"
                                            value={values.password}
                                            onChange={changeHandler}
                                        />

                                        <span className="icon" onClick={togglePasswordVisibility}>
                                       {showPassword ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                                     </span>
                                    </div>
                                    <p>{formErrors.password}</p>

                                    <div className="mt-3">
                                        <label>I agree on bla bla</label>
                                        <input
                                            type="checkbox"
                                            className="form-check"
                                            name="agree"
                                            onChange={checkHandler}
                                        />

                                        {values.agree ? <p></p> : <p>You have to tick it</p>}
                                    </div>

                                    <div className="mt-3">
                                        <label>Choose gender:</label>
                                        {values.gender ? <p></p> : <p>You have to choose it</p>}
                                        <input
                                            type="radio"
                                            className="form-check"
                                            name="gender"
                                            onChange={checkHandler}
                                        />Male


                                        <input
                                            type="radio"
                                            className="form-check mt-3"
                                            name="gender"
                                            onChange={checkHandler}
                                        />Female

                                    </div>

                                    <div className="mt-3 input-group">
                                        <div className="w-75">
                                            <input
                                                type="number"
                                                className="form-control rounded-0"
                                                placeholder="Card Number"
                                                name="cardNumber"
                                                value={values.cardNumber}
                                                onChange={changeHandler}
                                                ref={cardNumberRef}
                                            />
                                        </div>

                                        <div className="w-25">
                                            <input
                                                type="number"
                                                className="form-control rounded-0"
                                                placeholder="CVV"
                                                name="cvv"
                                                value={values.cvv}
                                                onChange={changeHandler}
                                                ref={cvvRef}
                                            />
                                        </div>
                                        <div className="w-100">
                                            <input
                                                type="text"
                                                className="form-control mt-1"
                                                placeholder="Card Holder"
                                                name="cardHolder"
                                                value={values.cardHolder}
                                                onChange={changeHandler}
                                                ref={cardHolderRef}
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block mt-3">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Form;