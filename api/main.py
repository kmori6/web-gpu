import torch
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# https://fastapi.tiangolo.com/ja/tutorial/cors/
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/cuda")
async def read_cuda():
    return {
        "is_available": torch.cuda.is_available(),
        "cuda_version": torch.version.cuda,
        "num_gpus": torch.cuda.device_count(),
        "device_name": [{f"cuda:{i}": torch.cuda.get_device_name(i)} for i in range(torch.cuda.device_count())],
    }
