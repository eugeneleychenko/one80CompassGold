#start script
#./start_servers.sh

#!/bin/bash

# Start match.py
uvicorn match:app --host 0.0.0.0 --port 8002 &

# Start gpt.py
uvicorn gpt:app --host 0.0.0.0 --port 8003 &

# Wait for both processes to finish
wait