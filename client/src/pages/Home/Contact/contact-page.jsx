import React, { useState } from 'react';
import '../../../css/home/contactPage/contact-page.css';
import axios from 'axios';
import validation from '../../../utils/validation';
import ToastMessage from '../../../components/CompoChild/Toast/toast';

function ContactPage() {
    const [inputs, setInputs] = useState({
        fullName: '',
        email: '',
        message: '',
    });
    // Toast
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState({});

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    //send mess
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validation(inputs);
        if (validationErrors.email !== '') {
            setError({ ...error, email: validationErrors.email });
            return;
        } else {
            try {
                const res = await axios.post('/api/contacts/post', {
                    fullName: inputs.fullName,
                    email: inputs.email,
                    message: inputs.message,
                });
                console.log(res.data);
                setMessage('Gửi thành công thành công');
                setVariant('success');
                setShowToast(true);
                setInputs({
                    fullName: '',
                    email: '',
                    message: '',
                });
                setTimeout(() => setShowToast(false), 1000);
                // alert('Gui thanh cong');
                // window.location.reload(true);
            } catch (err) {
                console.log(err);

                setError({ ...error, message: err.response.data.errors });
            }
        }
    };
    console.log(error);
    return (
        <>
            {showToast && (
                <ToastMessage
                    autohide
                    toast={showToast}
                    setShowToast={setShowToast}
                    message={message}
                    variant={variant}
                />
            )}
            <main>
                <div className="hero-area">
                    <div className="slider-bg2 slider-height2 d-flex align-items-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-xxl-12">
                                    <div className="hero-caption2 text-center">
                                        <h2>Liên hệ với chúng tôi</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="contact spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="contact-widget">
                                    <div className="contact-widget_item">
                                        <div className="contact-widget_item__icon">
                                            <i className="fa-solid fa-location-dot text-white"></i>
                                        </div>
                                        <div className="contact-widget_item__text">
                                            <h5>Địa chỉ</h5>
                                            <p>264 Đội Cấn, Phường Ngọc Hà, Quận Ba Đình, Tp.Hà Nội</p>
                                        </div>
                                    </div>
                                    <div className="contact-widget_item">
                                        <div className="contact-widget_item__icon">
                                            <i className="fa-solid fa-headphones text-white"></i>
                                        </div>
                                        <div className="contact-widget_item__text">
                                            <h5>Hot-line</h5>
                                            <p>1900 636 736</p>
                                        </div>
                                    </div>
                                    <div className="contact-widget_item">
                                        <div className="contact-widget_item__icon">
                                            <i className="fa-solid fa-envelope text-white"></i>
                                        </div>
                                        <div className="contact-widget_item__text">
                                            <h5>Email</h5>
                                            <p>support@ocxanh.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="contact-form">
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            value={inputs.fullName}
                                            type="text"
                                            placeholder="Họ tên"
                                            name="fullName"
                                            onChange={handleChange}
                                        />
                                        <input
                                            value={inputs.email}
                                            type="text"
                                            placeholder="Email"
                                            name="email"
                                            onChange={handleChange}
                                        />
                                        <textarea
                                            value={inputs.message}
                                            placeholder="Lời nhắn..."
                                            defaultValue={''}
                                            name="message"
                                            onChange={handleChange}
                                        />
                                        <p className="text-danger text-start">{error && error.email}</p>
                                        <button type="submit" className="btn site-btn">
                                            Gửi tin
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="contact-map">
                                    <iframe
                                        title="map"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d986.3644148174534!2d105.79760508459631!3d21.032019815806866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad43e82f0773%3A0xc6e291828f72a42f!2sVictor%20Hanoi%20Hotel!5e0!3m2!1svi!2s!4v1683904264948!5m2!1svi!2s"
                                        width={600}
                                        height={450}
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default ContactPage;
