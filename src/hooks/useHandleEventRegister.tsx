import { arrayUnion } from "firebase/firestore";
import React, { useContext } from "react";
import { auth } from "../config/firebase";
import paymongo from "../config/paymongo";
import { AuthContext } from "../context/AuthContext";
import useFirestore from "./useFirestore";
import useGetEvent from "./useGetEvent";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const useHandleEventRegister = (id: string) => {
  const { currentUser } = useContext(AuthContext);
  const { data: selected, loading, error } = useGetEvent(id);
  const { updateData: updateEnrolled } = useFirestore("profiles");
  const { updateData: updateParticipants } = useFirestore("events");
  const { addData } = useFirestore("event_enrolled");
  const { addData: addPayment } = useFirestore("transactions");

  const history = useHistory();

  function handleSignin() {
    // return (window.location.href = "/participant/signin");
    return history.push("/participant/signin");
  }

  const userId = auth.currentUser?.uid!;

  const handleRegister = async () => {
    const newData = {
      host_id: selected?.host_id,
      user_id: userId,
      event_id: selected?.id,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You want to register this event?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, register it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          heightAuto: false,
          position: "top-right",
          title: "Registering..",
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // await addData(newData);
        // console.log(newData);

        // await updateParticipants(selected?.id!, {
        //   participants: arrayUnion(userId),
        // });
        // await updateEnrolled(userId, {
        //   registered_events: arrayUnion(selected?.id),
        // });

        console.log("passed");

        history.push("/participant/events");
      }
    });
  };

  const payload = {
    data: {
      attributes: {
        send_email_receipt: true,
        show_description: true,
        show_line_items: true,
        // cancel_url: "http://localhost:8080/participant/",
        cancel_url: `${import.meta.env.VITE_APP_URL}`,
        line_items: [
          {
            currency: "PHP",
            images: [selected?.imageUrl],
            amount: selected?.event_fee! * 100,
            description: selected?.title,
            name: selected?.title,
            quantity: 1,
          },
        ],
        description: selected?.title,
        payment_method_types: ["gcash", "card", "paymaya", "grab_pay"],
        reference_number: "n45a4s",
        // success_url: `http://localhost:8080/participant/payments/${selected?.id}/success`,
        success_url: `${import.meta.env.VITE_APP_URL}/participant/payments/${
          selected?.id
        }/success`,
      },
    },
  };

  const handleCheckout = async () => {
    await paymongo
      .post(`/checkout_sessions`, payload)
      .then((res) => {
        const paymentDetails = {
          amount: selected?.event_fee!,
          currency: "PHP",
          user_id: auth.currentUser?.uid!,
          event_id: selected?.id!,
          checkout_id: res.data.data.id,
        };

        addPayment(paymentDetails);
        window.location.href = res.data.data.attributes.checkout_url;

        // updateEnrolled(userId, {
        //   registered_events: arrayUnion(selected?.id),
        // });
      })
      .catch((err) => {
        console.log("messeges: ", err.response.data.errors);
      });
  };
  return { handleRegister, handleSignin, handleCheckout, loading, error };
};

export default useHandleEventRegister;
