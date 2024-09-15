import React from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import useFirestore from "./useFirestore";

const useHandleRequests = (selected: any) => {
  const {
    updateData: updateRequest,
    error: requestError,
    loading: requestLoading,
  } = useFirestore("requests");
  const {
    updateData: upadateEvent,
    error: eventError,
    loading: eventLoading,
  } = useFirestore("events");
  const history = useHistory();
  console.log(selected);

  const handleAccept = async (onDidDismissal: () => void) => {
    Swal.fire({
      icon: "question",
      heightAuto: false,
      title: "Are you sure?",
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          heightAuto: false,
          position: "top-right",
          title: "Accepting..",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(async () => {
          await updateRequest(selected.id, {
            status: "confirmed",
          }).then(async () => {
            await upadateEvent(selected.event_id, {
              status: "confirmed",
              is_confirmed: true,
            }).then(() => {
              if (requestError === null) {
                Swal.fire({
                  title: "Success!",
                  text: "Request updated successfully",
                  icon: "success",
                  confirmButtonText: "OK",
                  heightAuto: false,
                }).then(() => {
                  onDidDismissal();
                });
              } else {
                Swal.fire({
                  title: "An Error Occurred",
                  heightAuto: false,
                  icon: "error",
                });
              }
            });
          });
        });
      }
    });
  };

  // Reject the Request
  const handleReject = async (onDidDismissal: () => void) => {
    Swal.fire({
      icon: "question",
      heightAuto: false,
      title: "Are you sure?",
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          heightAuto: false,
          position: "top-right",
          title: "Accepting..",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(async () => {
          await updateRequest(selected.id, {
            status: "rejected",
          }).then(async () => {
            await upadateEvent(selected.event_id, {
              status: "rejected",
            }).then(() => {
              if (requestError === null) {
                Swal.fire({
                  title: "Success!",
                  text: "Request updated successfully",
                  icon: "success",
                  confirmButtonText: "OK",
                  heightAuto: false,
                }).then(() => {
                  onDidDismissal();
                });
              } else {
                Swal.fire({
                  title: "An Error Occurred",
                  heightAuto: false,
                  icon: "error",
                });
              }
            });
          });
        });
      }
    });
  };

  return { handleAccept, handleReject };
};

export default useHandleRequests;
