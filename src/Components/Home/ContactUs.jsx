import  { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
// import AOS from "aos";
// import "aos/dist/aos.css";
// AOS.init();

// npm i @emailjs/browser

const ContactUS = () => {
  const {user} = useAuth();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_vwr0nkq",
        "template_09991ke",
        form.current,
        "hzuxgdjmF1d_QQv-r"
      )
      .then(
        (result) => {
            toast.success("Message Sent Successfully");
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
            toast.error("Message Not Sent");
          console.log(error.text);
        }
      );
  };

  return (
    <StyledContactForm className="max-w-5xl mx-auto mt-40 mb-20" id="contact">
    {/* <div data-aos="fade-left"> */}
    <h1  className="text-center font-bold text-4xl text-gray-600 underline mb-10"> Contact with Us </h1>
     <section className="flex flex-col md:flex-row gap-10">
     {/* <img src="https://i.postimg.cc/PxTYMZ6C/silky-contacting-support-specialist-via-online-call.png" alt="" /> */}
     <form className="px-10" ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input required type="text" name="user_name" />
        <label>Email</label>
        <input required type="email" name="user_email" />
        <label>Message</label>
        <textarea required name="message" />
        {
          user?.email ? <input type="submit" value="Send" /> : <input type="submit" value="Send" disabled />
        }
      </form>
     </section>
    {/* </div> */}
    </StyledContactForm>
  );
};

export default ContactUS;

// Styles
const StyledContactForm = styled.div`


  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgb(37, 99, 235);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgb(37, 99, 235);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: #4B5563;
      color: white;
      border: none;
    }

    input[type="submit"]:hover {
      background: #4B5563;
      color: white;
    }
  }
`;

