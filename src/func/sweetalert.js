import React from "react";
import Swal from "sweetalert2";
function sweetalert({ title, time }) {
  let timerInterval;
  Swal.fire({
    title: { title },
    html: "I will close in <b></b> milliseconds.",
    timer: { time },
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
}

export default sweetalert;
