// Aurora Cleaning Ltd - Draft Landing Page
// Simple validation + mailto routing for the enquiry form.

(function () {
  const form = document.getElementById("quoteForm");
  const success = document.getElementById("formSuccess");
  const error = document.getElementById("formError");

  if (!form) return;

  function setHidden(el, hidden) {
    if (!el) return;
    el.hidden = hidden;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    setHidden(success, true);
    setHidden(error, true);

    const data = new FormData(form);
    const requiredFields = ["name", "email", "phone", "propertyType", "service", "message"];

    // Basic validation
    for (const key of requiredFields) {
      const value = String(data.get(key) || "").trim();
      if (!value) {
        setHidden(error, false);
        return;
      }
    }

    const email = String(data.get("email") || "").trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      setHidden(error, false);
      return;
    }

    const subject = encodeURIComponent("Quote Enquiry - Aurora Cleaning Ltd");
    const bodyLines = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Property type: ${data.get("propertyType")}`,
      `Service required: ${data.get("service")}`,
      "",
      "Message:",
      String(data.get("message") || "")
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));

    // Open mail client (works well for a simple draft landing page)
    window.location.href = `mailto:info@auroracleaning.co.uk?subject=${subject}&body=${body}`;

    // Show confirmation
    setHidden(success, false);
    form.reset();
  });
})();
