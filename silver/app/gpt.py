import asyncio
from typing import AsyncIterable

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from langchain.callbacks import AsyncIteratorCallbackHandler
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
from pydantic import BaseModel

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    content: str

def apply_prompt_template(content: str) -> str:
    # Example template: You can customize this template as needed
    prompt_template = (
        "Respond in Markdown. Bold the titles, italics for the body. Use numbered lists "
        "You are a design thinking expert.\n\n"
        "Human: {content}\n"
        "AI:"
    )
    return prompt_template.format(content=content)

async def send_message(content: str) -> AsyncIterable[str]:
    callback = AsyncIteratorCallbackHandler()
    model = ChatOpenAI(
        streaming=True,
        verbose=True,
        callbacks=[callback],
        model="gpt-4-1106-preview"
    )

    # Apply the prompt template to the message content
    formatted_content = apply_prompt_template(content)

    task = asyncio.create_task(
        model.agenerate(messages=[[HumanMessage(content=formatted_content)]])
    )

    try:
        async for token in callback.aiter():
            yield token
    except Exception as e:
        print(f"Caught exception: {e}")
    finally:
        callback.done.set()

    await task


@app.post("/stream_chat/")
async def stream_chat(message: Message):
    generator = send_message(message.content)
    return StreamingResponse(generator, media_type="text/event-stream")