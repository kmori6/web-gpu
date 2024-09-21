import { useState } from "react";

interface CudaInfo {
  is_available: boolean;
  cuda_version: string;
  num_gpus: number;
  device_name: { [key: string]: string }[];
}

export const CudaInfo = () => {
  const [cudaInfo, setCudaInfo] = useState<CudaInfo>({
    is_available: false,
    cuda_version: "",
    num_gpus: 0,
    device_name: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchCudaInfo = async () => {
    setLoading(true);
    setError("");
    try {
        const response = await fetch(`http://${import.meta.env.VITE_IP_ADDR}:${import.meta.env.VITE_PORT}/cuda`)
        if (!response.ok) {
        throw new Error("Failed to fetch CUDA information.");
      }
      const data: CudaInfo = await response.json();
      setCudaInfo(data);
    } catch (err) {
      setError("Failed to fetch CUDA information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "left", margin: "20px" }}>
      <h2>CUDA Information</h2>
      <button onClick={fetchCudaInfo} disabled={loading}>
        {loading ? "Loading..." : "Fetch CUDA Info"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <p>CUDA Available: {cudaInfo.is_available ? "Yes" : "No"}</p>
        <p>CUDA Version: {cudaInfo.cuda_version}</p>
        <p>Number of GPUs: {cudaInfo.num_gpus}</p>
        <h3>Device Names:</h3>
        <ul>
          {cudaInfo.device_name.map((device, index) => (
            <li key={index}>{Object.keys(device)[0]}: {Object.values(device)[0]}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
