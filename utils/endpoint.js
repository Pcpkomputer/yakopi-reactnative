let mode = "production";

export let endpoint = (mode==="development") ? "http://192.168.43.80:8000/api":"http://api.sispro-yakopi.org/api";