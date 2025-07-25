import Header from '@/component/header'

const Form = ()=>{
    return(
        <>
            <Header image={"/contact-bg.jpg"}
                    head={"Form Page"}
                    subhead={"Have questions? I have answers"}
                    meta={""}
                    isPost={false}/>
            <main className="mb-4">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <p>
                                Want to get in touch? Fill out the form below to send me a message and I will get back to
                                you as soon as possible!
                            </p>
                            <div className="my-5">
                                <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                                    <div className="form-floating">
                                        <input className="form-control" id="name" type="text"
                                               placeholder="Enter your name..." data-sb-validations="required"/>
                                        <label htmlFor="name">Name</label>
                                        <div className="invalid-feedback" data-sb-feedback="name:required">A name is
                                            required.
                                        </div>
                                    </div>
                                    <div className="form-floating">
                                        <input className="form-control" id="email" type="email"
                                               placeholder="Enter your email..." data-sb-validations="required,email"/>
                                        <label htmlFor="email">Email address</label>
                                        <div className="invalid-feedback" data-sb-feedback="email:required">An email is
                                            required.
                                        </div>
                                        <div className="invalid-feedback" data-sb-feedback="email:email">Email is not
                                            valid.
                                        </div>
                                    </div>
                                    <div className="form-floating">
                                        <input className="form-control" id="phone" type="tel"
                                               placeholder="Enter your phone number..." data-sb-validations="required"/>
                                        <label htmlFor="phone">Phone Number</label>
                                        <div className="invalid-feedback" data-sb-feedback="phone:required">A phone
                                            number is required.
                                        </div>
                                    </div>
                                    <div className="form-floating">
                                        <textarea className="form-control" id="message"
                                                  placeholder="Enter your message here..." style={{height: "12rem"}}
                                                  data-sb-validations="required"></textarea>
                                        <label htmlFor="message">Message</label>
                                        <div className="invalid-feedback" data-sb-feedback="message:required">A message
                                            is required.
                                        </div>
                                    </div>
                                    <br/>
                                    <button className="btn btn-primary text-uppercase disabled" id="submitButton" type="submit">
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default Form