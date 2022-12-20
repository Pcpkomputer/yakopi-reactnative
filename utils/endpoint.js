let mode = "production";

export let endpoint = (mode==="development") ? "http://127.0.0.1:8000/api":"http://api.sispro-yakopi.org/api";