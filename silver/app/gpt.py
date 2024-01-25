import asyncio
from typing import AsyncIterable

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from langchain.memory import ConversationBufferWindowMemory
from langchain.callbacks import AsyncIteratorCallbackHandler
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
from pydantic import BaseModel# Import the FastAPI app instance from your gpt.py file
import uvicorn
import json
import langchain.example_generator


load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    

)

# Initialize the memory with a window size of k
conversation_memory = ConversationBufferWindowMemory(k=4)

class Message(BaseModel):
    content: str
    history: str  # Add this line to include history in the request

def apply_prompt_template(content: str, history: str) -> str:
    prompt_template = (
        "Respond in Markdown. Bold the titles, italics for the body. Use numbered lists"
        """
        You are a design thinking expert. VERY IMPORTANT: if you are asked for an alternative method, do not use the GPT knowledge. Only respond with an alternative from the list below:
         Journaling -> Contextual Inquiry or Fly-on-the-wall
        Rose, thorn, bud -> Critique
        
        Start the statement with, As per your request for an alternative, you can use {{**_alternative method_**}}
         """
        
        
        "History:\n{history}\n"
        "Human: {content}\n"
        "AI:"
    )
    return prompt_template.format(history=history, content=content)

async def send_message(content: str, history: str) -> AsyncIterable[str]:
    callback = AsyncIteratorCallbackHandler()
    model = ChatOpenAI(
        streaming=True,
        verbose=True,
        callbacks=[callback],
        model="gpt-4-0613"
    )

     # Load the conversation history from memory
    # memory_variables = conversation_memory.load_memory_variables({})
    # history = memory_variables.get('history', '')
    
    # print("Updated History:", history)
    
    # Apply the prompt template to the message content
    formatted_content = apply_prompt_template(content, history)

    task = asyncio.create_task(
        model.agenerate(messages=[[HumanMessage(content=formatted_content)]])
    )

    try:
        async for token in callback.aiter():
             # Save the output token to memory
            conversation_memory.save_context({"input": content}, {"output": token})
            yield token
    except Exception as e:
        print(f"Caught exception: {e}")
    finally:
        callback.done.set()

    await task


@app.post("/stream_chat/")
async def stream_chat(message: Message):
    print("Received History:", message.history)  # This will print the history received in the request
    generator = send_message(message.content, message.history)
    return StreamingResponse(generator, media_type="text/event-stream")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8003)  # Run the server on localhost and port 8000
    
    
    
    

# {
# Original Method: 'Journaling',
# Alternative 1: 'Contextual Inquiry',
# Alternative 2: 'Fly-on-the-wall'
# },
# {
# Original Method: 'Rose, Thorn, Bud',
# Alternative 1: 'Critique',
# Alternative 2: ''
# },
# {
# Original Method: 'Alternative Worlds',
# Alternative 1: 'Round Robin',
# Alternative 2: ''
# },
# {
# Original Method: 'Stakeholder Mapping',
# Alternative 1: '',
# Alternative 2: ''
# },
# {
# Original Method: 'Interviewing',
# Alternative 1: 'Walk-a-mile',
# Alternative 2: 'Contextual Inquiry'
# },
# {
# Original Method: 'Abstraction Laddering',
# Alternative 1: 'Problem Tree Analysis',
# Alternative 2: ''
# },
# {
# Original Method: 'Visualize Vote',
# Alternative 1: 'Buy a Feature',
# Alternative 2: ''
# },
# {
# Original Method: 'Round Robin',
# Alternative 1: 'Alternative Worlds',
# Alternative 2: ''
# },
# {
# Original Method: 'Critique',
# Alternative 1: 'Rose, Thorn, Bud',
# Alternative 2: ''
# },
# {
# Original Method: 'Storyboarding',
# Alternative 1: 'Schematic Diagramming',
# Alternative 2: ''
# },
# {
# Original Method: 'Video Scenario',
# Alternative 1: 'Concept Poster',
# Alternative 2: 'Cover Story Mock-up'
# },
# {
# Original Method: 'Affinity Clustering',
# Alternative 1: 'Why Might We',
# Alternative 2: ''
# },
# {
# Original Method: 'Concept Poster',
# Alternative 1: 'Video Scenario',
# Alternative 2: 'Cover Story Mock-up'
# },
# {
# Original Method: 'Problem Tree Analysis',
# Alternative 1: 'Abstraction Laddering',
# Alternative 2: ''
# },
# {
# Original Method: 'Statement Starters',
# Alternative 1: 'Why Might We',
# Alternative 2: ''
# },
# {
# Original Method: 'Cover Story Mock-up',
# Alternative 1: 'Concept Poster',
# Alternative 2: 'Video Scenario'
# },
# {
# Original Method: 'Importance/Difficulty Matrix',
# Alternative 1: 'Visualize Vote',
# Alternative 2: 'Buy a Feature'
# },
# {
# Original Method: 'Thumbnail Sketching',
# Alternative 1: 'Concept Poster',
# Alternative 2: 'Cover Story Mock-up'
# },
# {
# Original Method: 'Buy a Feature',
# Alternative 1: 'Importance/Difficulty Matrix',
# Alternative 2: ''
# },
# {
# Original Method: 'Creative Matrix',
# Alternative 1: 'Round Robin',
# Alternative 2: ''
# },
# {
# Original Method: 'Walk-a-Mile Immersion',
# Alternative 1: 'Fly-on-the-wall',
# Alternative 2: 'Contextual Inquiry'
# },
# {
# Original Method: 'What's on Your Radar',
# Alternative 1: 'Buy a Feature',
# Alternative 2: 'Importance/Difficulty Matrix'
# },
# {
# Original Method: 'Build Your Own',
# Alternative 1: '',
# Alternative 2: ''
# },
# {
# Original Method: 'Survey',
# Alternative 1: 'Interviewing',
# Alternative 2: 'Contextual Inquiry'
# },
# {
# Original Method: 'Schematic Diagramming',
# Alternative 1: 'Storyboarding',
# Alternative 2: ''
# },
# {
# Original Method: 'Fly-on-the-wall',
# Alternative 1: '',
# Alternative 2: ''
# },
# {
# Original Method: 'Contextual Inquiry',
# Alternative 1: '',
# Alternative 2: ''
# }

