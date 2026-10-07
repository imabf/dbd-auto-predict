// ---- CONFIG: fill these in (both are public values, safe to commit) ----
// formEndpoint: your Formspree form URL, e.g. "https://formspree.io/f/abcdwxyz"
// goatcounter:  your GoatCounter code, e.g. "autopredict" (-> autopredict.goatcounter.com)
const CONFIG = {
  formEndpoint: "https://formspree.io/f/myekknvn",
  goatcounter: "imabf"
};
// -------------------------------------------------------------------------

(function () {
  "use strict";

  if (CONFIG.goatcounter) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://gc.zgo.at/count.js";
    s.setAttribute("data-goatcounter", "https://" + CONFIG.goatcounter + ".goatcounter.com/count");
    document.head.appendChild(s);
  }

  function track(path, title) {
    try {
      if (window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({ path: path, title: title, event: true });
      }
    } catch (e) { /* analytics must never break the form */ }
  }

  function wire(form, statusEl, eventName, okMsg) {
    var btn = form.querySelector("button[type=submit]");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      statusEl.className = "status";
      statusEl.textContent = "";

      var email = form.elements.email;
      if (!email.value || !email.checkValidity()) {
        statusEl.className = "status err";
        statusEl.textContent = "Please enter a valid email.";
        email.focus();
        return;
      }
      if (form.elements._gotcha && form.elements._gotcha.value) { return; } // bot
      if (!CONFIG.formEndpoint) {
        statusEl.className = "status err";
        statusEl.textContent = "The form isn't connected yet. Please try again later.";
        return;
      }

      var data = new FormData(form);
      if (eventName === "waitlist-delete-request") {
        data.append("_subject", "DELETION REQUEST");
        data.append("request", "delete");
      }
      btn.disabled = true;
      fetch(CONFIG.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      }).then(function (r) {
        if (!r.ok) { throw new Error("bad status " + r.status); }
        statusEl.className = "status ok";
        statusEl.textContent = okMsg;
        track(eventName, eventName);
        form.reset();
      }).catch(function () {
        statusEl.className = "status err";
        statusEl.textContent = "Something went wrong. Please try again in a moment.";
      }).then(function () { btn.disabled = false; });
    });
  }

  wire(
    document.getElementById("waitlist"),
    document.getElementById("status"),
    "waitlist-signup",
    "You're on the list. We'll only email you about this project."
  );
  wire(
    document.getElementById("delete-form"),
    document.getElementById("del-status"),
    "waitlist-delete-request",
    "Request received. We'll delete your data."
  );
})();
